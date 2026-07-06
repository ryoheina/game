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
        if (!isAdminAuthorized(request)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const onlineThreshold = new Date(Date.now() - 120_000).toISOString();

        const [{ data: sessions }, { data: downloads }, { data: notifications }] = await Promise.all([
          supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false }),
          supabaseAdmin.from("downloads").select("*").order("started_at", { ascending: false }).limit(100),
          supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50),
        ]);

        const onlineSessions = (sessions || []).map((session) => ({
          ...session,
          status: computeStatus(session.last_active),
          last_active_time: session.last_active,
          first_visit_time: session.first_visit,
        }));

        const enhancedDownloads = (downloads || []).map((download) => ({
          ...download,
          status: download.completed ? "completed" : "in_progress",
        }));

        const pendingOffline = (sessions || []).filter(
          (session) => session.last_active < onlineThreshold && !session.notified_left,
        );

        if (pendingOffline.length) {
          await supabaseAdmin.from("notifications").insert(
            pendingOffline.map((session) => ({
              type: "visitor_left",
              title: "Visitor Left",
              body: `${session.ip ?? "unknown"} — ${session.device ?? session.os ?? "Unknown device"}`,
              payload: { session_id: session.session_id },
            })),
          );
          await supabaseAdmin.from("sessions").update({ notified_left: true }).in(
            "session_id",
            pendingOffline.map((session) => session.session_id),
          );
        }

        const undeliveredNotifications = (notifications || []).filter((notification) => !notification.delivered);
        if (undeliveredNotifications.length) {
          await supabaseAdmin.from("notifications").update({ delivered: true }).in(
            "id",
            undeliveredNotifications.map((notification) => notification.id),
          );
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
      },
    },
  },
});
