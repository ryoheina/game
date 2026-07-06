import { createFileRoute } from "@tanstack/react-router";
import { isAdminAuthorized } from "@/lib/admin-auth";

function computeStatus(lastActive: string) {
  const last = new Date(lastActive).getTime();
  if (Number.isNaN(last)) return "offline";
  return Date.now() - last <= 120_000 ? "online" : "offline";
}

export const Route = createFileRoute("/api/admin/dashboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          if (!isAdminAuthorized(request)) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
              status: 401,
              headers: { "content-type": "application/json" },
            });
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const onlineThreshold = new Date(Date.now() - 120_000).toISOString();

          const [sessionsRes, downloadsRes, notificationsRes] = await Promise.all([
            supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false }).catch(e => ({ data: null, error: e })),
            supabaseAdmin.from("downloads").select("*").order("started_at", { ascending: false }).limit(100).catch(e => ({ data: null, error: e })),
            supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50).catch(e => ({ data: null, error: e })),
          ]);

          const sessions = sessionsRes.data || [];
          const downloads = downloadsRes.data || [];
          const notifications = notificationsRes.data || [];

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

          const pendingOffline = sessions.filter(
            (session: any) => session.last_active < onlineThreshold && !session.notified_left,
          );

          if (pendingOffline.length > 0) {
            try {
              await supabaseAdmin.from("notifications").insert(
                pendingOffline.map((session: any) => ({
                  type: "visitor_left",
                  title: "Visitor Left",
                  body: `${session.ip ?? "unknown"} — ${session.device ?? session.os ?? "Unknown device"}`,
                  payload: { session_id: session.session_id },
                })),
              );
              await supabaseAdmin.from("sessions").update({ notified_left: true }).in(
                "session_id",
                pendingOffline.map((session: any) => session.session_id),
              );
            } catch (e) {
              console.error("Failed to update offline notifications", e);
            }
          }

          const undeliveredNotifications = notifications.filter((notification: any) => !notification.delivered);
          if (undeliveredNotifications.length > 0) {
            try {
              await supabaseAdmin.from("notifications").update({ delivered: true }).in(
                "id",
                undeliveredNotifications.map((notification: any) => notification.id),
              );
            } catch (e) {
              console.error("Failed to mark notifications as delivered", e);
            }
          }

          return new Response(
            JSON.stringify({
              sessions: onlineSessions,
              downloads: enhancedDownloads,
              notifications: undeliveredNotifications,
            }),
            {
              status: 200,
              headers: { "content-type": "application/json" },
            },
          );
        } catch (error) {
          console.error("Dashboard endpoint error:", error);
          return new Response(
            JSON.stringify({ error: "Failed to fetch dashboard data", details: error instanceof Error ? error.message : String(error) }),
            {
              status: 500,
              headers: { "content-type": "application/json" },
            },
          );
        }
      },
    },
  },
});
