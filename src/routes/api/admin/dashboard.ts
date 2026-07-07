import { createFileRoute } from "@tanstack/react-router";
import { isAdminAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

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
    route: "/api/admin/dashboard",
    env: getEnvPresence(),
    nodeEnv: process.env.NODE_ENV ?? "undefined",
    vercelEnv: process.env.VERCEL_ENV ?? "undefined",
    ...context,
  };

  if (error instanceof Error) {
    console.error("[Admin dashboard] Runtime exception", {
      ...payload,
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    console.error(error);
    return;
  }

  console.error("[Admin dashboard] Runtime exception", {
    ...payload,
    error,
  });
}

function computeStatus(lastActive: string) {
  const last = new Date(lastActive).getTime();
  if (Number.isNaN(last)) return "offline";
  return Date.now() - last <= 120_000 ? "online" : "offline";
}

type DashboardSuccessResponse = {
  success: true;
  sessions: any[];
  downloads: any[];
  notifications: any[];
  stats: {
    total_sessions: number;
    online_sessions: number;
    total_downloads: number;
    pending_notifications: number;
  };
};

type DashboardFailureResponse = {
  success: false;
  error: string;
  stack?: string;
  step?: string;
  details?: string;
  table?: string;
  column?: string;
};

const requiredEnvVars = ["ADMIN_PASSWORD", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;

type DashboardEnvInfo = {
  SUPABASE_URL: boolean;
  SUPABASE_SERVICE_ROLE_KEY: boolean;
  SUPABASE_PUBLISHABLE_KEY: boolean;
  ADMIN_PASSWORD: boolean;
  NODE_ENV: string;
  VERCEL: string;
  VERCEL_ENV: string;
  runtime: string;
  cwd: string;
  errors: Array<{ step: string; message: string; stack?: string; missing?: string[] }>;
  missing?: string[];
};

function logEnvStatus() {
  const status = requiredEnvVars
    .map((name) => `${name}=${process.env[name] ? "set" : "missing"}`)
    .join(", ");
  console.log(`[Dashboard] Required env vars: ${status}`);
}

function buildEnvInfo(errors: DashboardEnvInfo["errors"], missing?: string[]): DashboardEnvInfo {
  const runtime = typeof process !== "undefined" && process.release?.name ? `${process.release.name} ${process.version}` : "unknown";
  const cwd = typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : "unknown";

  return {
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.SUPABASE_PUBLISHABLE_KEY),
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD || process.env.STUDIO_ADMIN_PASSWORD),
    NODE_ENV: process.env.NODE_ENV ?? "undefined",
    VERCEL: process.env.VERCEL ?? "undefined",
    VERCEL_ENV: process.env.VERCEL_ENV ?? "undefined",
    runtime,
    cwd,
    errors,
    missing,
  };
}

function createFailureResponse(message: string, step: string, error?: unknown, details?: string, table?: string, column?: string): DashboardFailureResponse {
  const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : message;
  const stack = process.env.NODE_ENV === "development" && error instanceof Error && error.stack ? error.stack : undefined;
  return {
    success: false,
    error: errorMessage,
    ...(stack ? { stack } : {}),
    step,
    details,
    table,
    column,
  };
}

function parsePostgresError(errorMessage: string) {
  const tableMatch = /relation "([^"]+)" does not exist/.exec(errorMessage) || /table "([^"]+)" does not exist/.exec(errorMessage);
  const columnMatch = /column "([^"]+)" does not exist/.exec(errorMessage);
  return {
    table: tableMatch?.[1],
    column: columnMatch?.[1],
  };
}

function extractErrorLocation(stack?: string) {
  if (!stack) return "unknown location";
  const lines = stack.split("\n").slice(1);
  const firstFrame = lines.find((line) => line.includes("src/")) || lines[0];
  return firstFrame ? firstFrame.trim() : "unknown location";
}

async function verifyDatabaseConnectivity(supabaseAdmin: any) {
  console.log("[Dashboard] Verifying database connectivity using sessions table...");
  const res = await supabaseAdmin.from("sessions").select("session_id").limit(1);
  if (res.error) {
    const parsed = parsePostgresError(res.error.message);
    console.error("[Dashboard] Database connectivity check failed:", res.error.message);
    return {
      ok: false,
      error: res.error,
      table: parsed.table,
      column: parsed.column,
      details: res.error.message,
    };
  }
  console.log("[Dashboard] Database connectivity verified");
  return { ok: true };
}

export const Route = createFileRoute("/api/admin/dashboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const responseHeaders = { "content-type": "application/json" };
        logEnvStatus();
        console.error("[Admin dashboard] Request started", {
          route: "/api/admin/dashboard",
          env: getEnvPresence(),
          nodeEnv: process.env.NODE_ENV ?? "undefined",
          vercelEnv: process.env.VERCEL_ENV ?? "undefined",
          requestUrl: request.url,
        });

        try {
          // ===== STEP 1: VALIDATE REQUIRED ENVIRONMENT =====
          const missingEnv = requiredEnvVars.filter((name) => !process.env[name]);
          if (missingEnv.length > 0) {
            const message = `Missing required environment variables: ${missingEnv.join(", ")}`;
            console.error("[Dashboard]", message);
            logAdminRouteFailure(new Error(message), { stage: "validate_env", missingEnv });
            return new Response(JSON.stringify(createFailureResponse(message, "validate_env", new Error(message))), {
              status: 500,
              headers: responseHeaders,
            });
          }

          // ===== STEP 2: AUTHORIZATION =====
          try {
            if (!(await isAdminAuthorized(request))) {
              console.warn("[Dashboard] Unauthorized access attempt");
              return new Response(JSON.stringify(createFailureResponse("Unauthorized", "authorize", undefined, "Admin auth failed")), {
                status: 401,
                headers: responseHeaders,
              });
            }
          } catch (authError) {
            const message = authError instanceof Error ? authError.message : String(authError);
            const location = extractErrorLocation(authError instanceof Error ? authError.stack : undefined);
            console.error("[Dashboard] Authorization failed:", message, location);
            logAdminRouteFailure(authError, { stage: "authorize", message, location });
            return new Response(JSON.stringify(createFailureResponse("Authentication failed", "authorize", authError, message)), {
              status: 401,
              headers: responseHeaders,
            });
          }

          // ===== STEP 3: LOAD DATABASE CLIENT =====
          let supabaseAdmin: any;
          try {
            console.log("[Dashboard] Importing Supabase admin client");
            const imported = await import("@/integrations/supabase/client.server");
            supabaseAdmin = imported.supabaseAdmin;
            if (!supabaseAdmin) {
              throw new Error("Supabase admin client import returned undefined");
            }
          } catch (importError) {
            const message = importError instanceof Error ? importError.message : String(importError);
            const stack = importError instanceof Error ? importError.stack || message : String(importError);
            console.error("[Dashboard] Supabase client import failed:", message, stack);
            logAdminRouteFailure(importError, { stage: "load_client", message, stack });
            return new Response(JSON.stringify(createFailureResponse("Database client unavailable", "load_client", importError, message)), {
              status: 500,
              headers: responseHeaders,
            });
          }

          // ===== STEP 4: CHECK DATABASE CONNECTIVITY =====
          const connectivity = await verifyDatabaseConnectivity(supabaseAdmin);
          if (!connectivity.ok) {
            const message = connectivity.details || "Database connectivity check failed";
            logAdminRouteFailure(connectivity.error, { stage: "database_connectivity", message, table: connectivity.table, column: connectivity.column });
            return new Response(JSON.stringify(createFailureResponse(message, "database_connectivity", connectivity.error, connectivity.details, connectivity.table, connectivity.column)), {
              status: 500,
              headers: responseHeaders,
            });
          }

          // ===== STEP 5: FETCH DATA =====
          console.log("[Dashboard] Executing sessions query");
          const sessionsRes = await supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false });
          if (sessionsRes.error) {
            const parsed = parsePostgresError(sessionsRes.error.message);
            console.error("[Dashboard] Sessions query failed:", sessionsRes.error.message);
            logAdminRouteFailure(sessionsRes.error, { stage: "query_sessions", table: parsed.table, column: parsed.column, message: sessionsRes.error.message });
            return new Response(JSON.stringify(createFailureResponse("Sessions query failed", "query_sessions", sessionsRes.error, sessionsRes.error.message, parsed.table, parsed.column)), {
              status: 500,
              headers: responseHeaders,
            });
          }
          const sessions: any[] = sessionsRes.data ?? [];
          console.log(`[Dashboard] Sessions fetched: ${sessions.length}`);

          console.log("[Dashboard] Executing downloads query");
          const downloadsRes = await supabaseAdmin.from("downloads").select("*").order("started_at", { ascending: false }).limit(100);
          if (downloadsRes.error) {
            const parsed = parsePostgresError(downloadsRes.error.message);
            console.error("[Dashboard] Downloads query failed:", downloadsRes.error.message);
            logAdminRouteFailure(downloadsRes.error, { stage: "query_downloads", table: parsed.table, column: parsed.column, message: downloadsRes.error.message });
            return new Response(JSON.stringify(createFailureResponse("Downloads query failed", "query_downloads", downloadsRes.error, downloadsRes.error.message, parsed.table, parsed.column)), {
              status: 500,
              headers: responseHeaders,
            });
          }
          const downloads: any[] = downloadsRes.data ?? [];
          console.log(`[Dashboard] Downloads fetched: ${downloads.length}`);

          console.log("[Dashboard] Executing notifications query");
          const notificationsRes = await supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
          if (notificationsRes.error) {
            const parsed = parsePostgresError(notificationsRes.error.message);
            console.error("[Dashboard] Notifications query failed:", notificationsRes.error.message);
            logAdminRouteFailure(notificationsRes.error, { stage: "query_notifications", table: parsed.table, column: parsed.column, message: notificationsRes.error.message });
            return new Response(JSON.stringify(createFailureResponse("Notifications query failed", "query_notifications", notificationsRes.error, notificationsRes.error.message, parsed.table, parsed.column)), {
              status: 500,
              headers: responseHeaders,
            });
          }
          const notifications: any[] = notificationsRes.data ?? [];
          console.log(`[Dashboard] Notifications fetched: ${notifications.length}`);

          // ===== STEP 6: PROCESS RESULTS =====
          const onlineSessions = sessions.map((session: any) => ({
            ...session,
            status: computeStatus(session.last_active),
            last_active_time: session.last_active,
            first_visit_time: session.first_visit,
          }));
          const enhancedDownloads = downloads.map((download: any) => ({
            ...download,
            status: download.completed ? "completed" : "in_progress",
          }));
          const undeliveredNotifications = notifications.filter((notification: any) => !notification.delivered);

          // ===== STEP 7: OPTIONAL BACKGROUND UPDATES =====
          try {
            const pendingOffline = sessions.filter((session: any) => session.last_active < new Date(Date.now() - 120_000).toISOString() && !session.notified_left);
            if (pendingOffline.length > 0) {
              console.log(`[Dashboard] Creating ${pendingOffline.length} offline notification(s)`);
              await supabaseAdmin.from("notifications").insert(
                pendingOffline.map((session: any) => ({
                  type: "visitor_left",
                  title: "Visitor Left",
                  body: `${session.ip ?? "unknown"} — ${session.device ?? session.os ?? "Unknown device"}`,
                  payload: { session_id: session.session_id },
                })),
              );
              await supabaseAdmin.from("sessions").update({ notified_left: true }).in("session_id", pendingOffline.map((session: any) => session.session_id));
            }
          } catch (backgroundError) {
            console.warn("[Dashboard] Background update failed:", backgroundError instanceof Error ? backgroundError.message : String(backgroundError));
          }

          try {
            if (undeliveredNotifications.length > 0) {
              console.log(`[Dashboard] Marking ${undeliveredNotifications.length} notification(s) as delivered`);
              await supabaseAdmin.from("notifications").update({ delivered: true }).in("id", undeliveredNotifications.map((notification: any) => notification.id));
            }
          } catch (deliveryError) {
            console.warn("[Dashboard] Notification delivery update failed:", deliveryError instanceof Error ? deliveryError.message : String(deliveryError));
          }

          const response: DashboardSuccessResponse = {
            success: true,
            sessions: onlineSessions,
            downloads: enhancedDownloads,
            notifications: undeliveredNotifications,
            stats: {
              total_sessions: onlineSessions.length,
              online_sessions: onlineSessions.filter((s: any) => s.status === "online").length,
              total_downloads: enhancedDownloads.length,
              pending_notifications: undeliveredNotifications.length,
            },
          };

          console.log("[Dashboard] Dashboard handler completed successfully");
          return new Response(JSON.stringify(response), {
            status: 200,
            headers: responseHeaders,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const stack = error instanceof Error ? error.stack || message : String(error);
          const location = extractErrorLocation(error instanceof Error ? error.stack : undefined);
          console.error("[Dashboard] Unhandled exception:", message, location, stack);
          logAdminRouteFailure(error, { stage: "unhandled_exception", message, location });
          return new Response(JSON.stringify(createFailureResponse(message, "unhandled_exception", error, `Unhandled exception at ${location}`)), {
            status: 500,
            headers: responseHeaders,
          });
        }
      },
    },
  },
});
