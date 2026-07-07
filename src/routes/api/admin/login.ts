import { createFileRoute } from "@tanstack/react-router";
import { createAdminAuthCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.STUDIO_ADMIN_PASSWORD;

function getEnvPresence() {
  return {
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD || process.env.STUDIO_ADMIN_PASSWORD),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.SUPABASE_PUBLISHABLE_KEY),
  };
}

function logAdminRouteFailure(error: unknown, context: Record<string, unknown> = {}) {
  const payload = {
    route: "/api/admin/login",
    env: getEnvPresence(),
    nodeEnv: process.env.NODE_ENV ?? "undefined",
    vercelEnv: process.env.VERCEL_ENV ?? "undefined",
    ...context,
  };

  if (error instanceof Error) {
    console.error("[Admin login] Runtime exception", {
      ...payload,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    console.error(error);
    return;
  }

  console.error("[Admin login] Runtime exception", {
    ...payload,
    error,
  });
}

function createErrorPayload(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const payload: { success: false; error: string; stack?: string } = { success: false, error: message };
  if (process.env.NODE_ENV === "development" && error instanceof Error && error.stack) {
    payload.stack = error.stack;
  }
  return payload;
}

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.error("[Admin login] Request started", {
          route: "/api/admin/login",
          env: getEnvPresence(),
          nodeEnv: process.env.NODE_ENV ?? "undefined",
          vercelEnv: process.env.VERCEL_ENV ?? "undefined",
        });

        try {
          const body = await request.json().catch(() => null);
          const password = body?.password;

          if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
            return new Response(JSON.stringify({ success: false, error: "Invalid password." }), {
              status: 401,
              headers: { "content-type": "application/json" },
            });
          }

          const cookie = await createAdminAuthCookie();

          return new Response(JSON.stringify({ success: true, ok: true }), {
            status: 200,
            headers: {
              "content-type": "application/json",
              "set-cookie": cookie,
            },
          });
        } catch (error) {
          logAdminRouteFailure(error, { stage: "handler" });
          return new Response(JSON.stringify(createErrorPayload(error)), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
