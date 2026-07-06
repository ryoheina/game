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

          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            const onlineThreshold = new Date(Date.now() - 120_000).toISOString();

            // Try to fetch data, but handle missing tables gracefully
            let sessions: any[] = [];
            let downloads: any[] = [];
            let notifications: any[] = [];

            try {
              const sessionsRes = await supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false });
              sessions = sessionsRes.data || [];
            } catch (e) {
              console.warn("Sessions table not found or error:", e);
            }

            try {
              const downloadsRes = await supabaseAdmin.from("downloads").select("*").order("started_at", { ascending: false }).limit(100);
              downloads = downloadsRes.data || [];
            } catch (e) {
              console.warn("Downloads table not found or error:", e);
            }

            try {
              const notificationsRes = await supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
              notifications = notificationsRes.data || [];
            } catch (e) {
              console.warn("Notifications table not found or error:", e);
            }

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
                console.warn("Failed to update offline notifications", e);
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
                console.warn("Failed to mark notifications as delivered", e);
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
          } catch (dbError) {
            console.error("Database connection error:", dbError);
            // Return empty data if database tables don't exist yet
            return new Response(
              JSON.stringify({
                sessions: [],
                downloads: [],
                notifications: [],
                info: "Database tables not yet initialized. Please run Supabase migrations.",
              }),
              {
                status: 200,
                headers: { "content-type": "application/json" },
              },
            );
          }
        } catch (error) {
          console.error("Dashboard endpoint error:", error);
          return new Response(
            JSON.stringify({ error: "Failed to fetch dashboard data", sessions: [], downloads: [], notifications: [] }),
            {
              status: 200,
              headers: { "content-type": "application/json" },
            },
          );
        }
      },
    },
  },
});
