import { createFileRoute } from "@tanstack/react-router";

const handler = () =>
  new Response(
    JSON.stringify({
      error:
        "Better Auth routes have been removed. Use Clerk endpoints and components instead.",
    }),
    {
      status: 410,
      headers: {
        "content-type": "application/json",
      },
    },
  );

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: () => handler(),
      POST: () => handler(),
    },
  },
});
