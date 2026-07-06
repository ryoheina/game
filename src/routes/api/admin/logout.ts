import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "set-cookie": "studio-admin-token=deleted; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
          },
        });
      },
    },
  },
});
