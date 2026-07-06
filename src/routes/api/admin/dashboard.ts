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
        // Always return valid JSON, even on errors
        try {
          if (!isAdminAuthorized(request)) {
            return new Response(JSON.stringify({ error: "Unauthorized", sessions: [], downloads: [], notifications: [] }), {
              status: 401,
              headers: { "content-type": "application/json" },
            });
          }
        } catch (authError) {
          console.error("Auth check error:", authError);
          return new Response(JSON.stringify({ error: "Auth error", sessions: [], downloads: [], notifications: [] }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        // Default response
        const defaultResponse = {
          sessions: [],
          downloads: [],
          notifications: [],
        };

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const onlineThreshold = new Date(Date.now() - 120_000).toISOString();

          let sessions: any[] = [];
          let downloads: any[] = [];
          let notifications: any[] = [];

          // Fetch sessions
          try {
            const res = await supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false });
            if (res.data) sessions = res.data;
          } catch (e) {
            console.warn("Sessions query failed:", e instanceof Error ? e.message : e);
          }

          // Fetch downloads
          try {
            const res = await supabaseAdmin.from("downloads").select("*").order("started_at", { ascending: false }).limit(100);
            if (res.data) downloads = res.data;
          } catch (e) {
            console.warn("Downloads query failed:", e instanceof Error ? e.message : e);
          }

          // Fetch notifications
          try {
            const res = await supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
            if (res.data) notifications = res.data;
          } catch (e) {
            console.warn("Notifications query failed:", e instanceof Error ? e.message : e);
          }

          // Process sessions
          const onlineSessions = sessions.map((session: any) => ({
            ...session,
            status: computeStatus(session.last_active),
            last_active_time: session.last_active,
            first_visit_time: session.first_visit,
          }));

          // Process downloads
          const enhancedDownloads = downloads.map((download: any) => ({
            ...download,
            status: download.completed ? "completed" : "in_progress",
          }));

          // Mark offline visitors
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
              console.warn("Failed to update offline notifications:", e instanceof Error ? e.message : e);
            }
          }

          // Mark notifications as delivered
          const undeliveredNotifications = notifications.filter((notification: any) => !notification.delivered);
          if (undeliveredNotifications.length > 0) {
            try {
              await supabaseAdmin.from("notifications").update({ delivered: true }).in(
                "id",
                undeliveredNotifications.map((notification: any) => notification.id),
              );
            } catch (e) {
              console.warn("Failed to mark notifications as delivered:", e instanceof Error ? e.message : e);
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
          console.error("Dashboard error:", error instanceof Error ? error.message : error);
          // Return default response on any error
          return new Response(JSON.stringify(defaultResponse), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
