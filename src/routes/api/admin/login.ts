import { createFileRoute } from "@tanstack/react-router";
import { createAdminAuthCookie } from "@/lib/admin-auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.STUDIO_ADMIN_PASSWORD;

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const password = body?.password;

        if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
          return new Response(JSON.stringify({ error: "Invalid password." }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "set-cookie": createAdminAuthCookie(),
          },
        });
      },
    },
  },
});
