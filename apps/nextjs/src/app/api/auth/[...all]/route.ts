import { NextResponse } from "next/server";

const handler = () =>
  NextResponse.json(
    {
      error:
        "Better Auth routes have been removed. Use Clerk endpoints and components instead.",
    },
    { status: 410 },
  );

export const GET = handler;
export const POST = handler;
