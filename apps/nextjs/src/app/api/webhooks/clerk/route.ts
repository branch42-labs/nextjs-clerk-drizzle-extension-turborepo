import type { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/backend/webhooks";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { user } from "@acme/db/schema";

import { env } from "~/env";

function getEmailFromEvent(event: WebhookEvent) {
  if (event.type !== "user.created" && event.type !== "user.updated") {
    return null;
  }

  const primaryEmail =
    event.data.email_addresses.find(
      (emailAddress) => emailAddress.id === event.data.primary_email_address_id,
    ) ?? event.data.email_addresses[0];

  return primaryEmail ?? null;
}

function getDate(value: number | null | undefined) {
  return typeof value === "number" ? new Date(value) : new Date();
}

function getDisplayName(event: WebhookEvent) {
  if (event.type !== "user.created" && event.type !== "user.updated") {
    return "Unknown";
  }

  const fullName = [event.data.first_name, event.data.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    fullName ||
    event.data.username ||
    getEmailFromEvent(event)?.email_address ||
    "Unknown"
  );
}

async function upsertClerkUser(event: WebhookEvent) {
  if (event.type !== "user.created" && event.type !== "user.updated") {
    return;
  }

  const primaryEmail = getEmailFromEvent(event);
  if (!primaryEmail?.email_address) {
    throw new Error("Clerk user event is missing a primary email address");
  }

  const createdAt = getDate(event.data.created_at);
  const updatedAt = getDate(event.data.updated_at);

  await db
    .insert(user)
    .values({
      id: event.data.id,
      email: primaryEmail.email_address,
      emailVerified: primaryEmail.verification.status === "verified",
      name: getDisplayName(event),
      image: event.data.image_url,
      createdAt,
      updatedAt,
    })
    .onConflictDoUpdate({
      target: user.id,
      set: {
        email: primaryEmail.email_address,
        emailVerified: primaryEmail.verification.status === "verified",
        image: event.data.image_url,
        name: getDisplayName(event),
        updatedAt,
      },
    });
}

async function deleteClerkUser(event: WebhookEvent) {
  if (event.type !== "user.deleted" || !event.data.id) {
    return;
  }

  await db.delete(user).where(eq(user.id, event.data.id));
}

export async function POST(request: Request) {
  if (!env.CLERK_WEBHOOK_SIGNING_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SIGNING_SECRET");
    return NextResponse.json(
      { error: "Webhook signing secret is not configured" },
      { status: 500 },
    );
  }

  let event: WebhookEvent;

  try {
    event = (await verifyWebhook(request, {
      signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
    })) as WebhookEvent;
  } catch (error) {
    console.error("Failed to verify Clerk webhook", error);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  try {
    if (event.type === "user.created" || event.type === "user.updated") {
      await upsertClerkUser(event);
    }

    if (event.type === "user.deleted") {
      await deleteClerkUser(event);
    }
  } catch (error) {
    console.error("Failed to process Clerk webhook", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
