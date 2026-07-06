import { createFileRoute } from "@tanstack/react-router";
import { isAdminAuthorized } from "@/lib/admin-auth";

function computeStatus(lastActive: string) {
  const last = new Date(lastActive).getTime();
  if (Number.isNaN(last)) return "offline";
  return Date.now() - last <= 120_000 ? "online" : "offline";
}

// Default response structure
const emptyDashboardResponse = {
  success: true,
  sessions: [],
  downloads: [],
  notifications: [],
  message: "No data available",
};

const errorResponse = (message: string, details?: string) => ({
  success: false,
  error: message,
  details: details || undefined,
  sessions: [],
  downloads: [],
  notifications: [],
});

export const Route = createFileRoute("/api/admin/dashboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const responseHeaders = { "content-type": "application/json" };

        // ===== STEP 1: AUTH CHECK =====
        try {
          if (!isAdminAuthorized(request)) {
            console.warn("[Dashboard] Unauthorized access attempt");
            return new Response(JSON.stringify(errorResponse("Unauthorized")), {
              status: 401,
              headers: responseHeaders,
            });
          }
        } catch (authError) {
          const message = authError instanceof Error ? authError.message : String(authError);
          console.error("[Dashboard] Auth check failed:", message);
          return new Response(JSON.stringify(errorResponse("Authentication failed", message)), {
            status: 500,
            headers: responseHeaders,
          });
        }

        // ===== STEP 2: IMPORT SUPABASE CLIENT =====
        let supabaseAdmin;
        try {
          const imported = await import("@/integrations/supabase/client.server");
          supabaseAdmin = imported.supabaseAdmin;
          
          if (!supabaseAdmin) {
            throw new Error("Supabase admin client is undefined");
          }
        } catch (importError) {
          const message = importError instanceof Error ? importError.message : String(importError);
          console.error("[Dashboard] Failed to import Supabase client:", message);
          return new Response(JSON.stringify(errorResponse("Database client unavailable", message)), {
            status: 500,
            headers: responseHeaders,
          });
        }

        // ===== STEP 3: PREPARE DATA CONTAINERS =====
        let sessions: any[] = [];
        let downloads: any[] = [];
        let notifications: any[] = [];
        const onlineThreshold = new Date(Date.now() - 120_000).toISOString();

        // ===== STEP 4: FETCH SESSIONS =====
        try {
          console.log("[Dashboard] Fetching sessions...");
          const res = await supabaseAdmin
            .from("sessions")
            .select("*")
            .order("last_active", { ascending: false });

          if (res.error) {
            console.warn("[Dashboard] Sessions query error:", res.error.message);
          } else if (res.data) {
            sessions = res.data;
            console.log(`[Dashboard] Fetched ${sessions.length} sessions`);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[Dashboard] Sessions query exception:", message);
        }

        // ===== STEP 5: FETCH DOWNLOADS =====
        try {
          console.log("[Dashboard] Fetching downloads...");
          const res = await supabaseAdmin
            .from("downloads")
            .select("*")
            .order("started_at", { ascending: false })
            .limit(100);

          if (res.error) {
            console.warn("[Dashboard] Downloads query error:", res.error.message);
          } else if (res.data) {
            downloads = res.data;
            console.log(`[Dashboard] Fetched ${downloads.length} downloads`);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[Dashboard] Downloads query exception:", message);
        }

        // ===== STEP 6: FETCH NOTIFICATIONS =====
        try {
          console.log("[Dashboard] Fetching notifications...");
          const res = await supabaseAdmin
            .from("notifications")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(50);

          if (res.error) {
            console.warn("[Dashboard] Notifications query error:", res.error.message);
          } else if (res.data) {
            notifications = res.data;
            console.log(`[Dashboard] Fetched ${notifications.length} notifications`);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[Dashboard] Notifications query exception:", message);
        }

        // ===== STEP 7: PROCESS SESSIONS =====
        let onlineSessions = [];
        try {
          onlineSessions = sessions.map((session: any) => ({
            ...session,
            status: computeStatus(session.last_active),
            last_active_time: session.last_active,
            first_visit_time: session.first_visit,
          }));
          console.log(`[Dashboard] Processed ${onlineSessions.length} sessions with status`);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[Dashboard] Session processing error:", message);
          onlineSessions = sessions; // fallback
        }

        // ===== STEP 8: PROCESS DOWNLOADS =====
        let enhancedDownloads = [];
        try {
          enhancedDownloads = downloads.map((download: any) => ({
            ...download,
            status: download.completed ? "completed" : "in_progress",
          }));
          console.log(`[Dashboard] Processed ${enhancedDownloads.length} downloads with status`);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[Dashboard] Download processing error:", message);
          enhancedDownloads = downloads; // fallback
        }

        // ===== STEP 9: UPDATE OFFLINE NOTIFICATIONS =====
        try {
          const pendingOffline = sessions.filter(
            (session: any) => session.last_active < onlineThreshold && !session.notified_left,
          );

          if (pendingOffline.length > 0) {
            console.log(`[Dashboard] Creating notifications for ${pendingOffline.length} offline visitors`);
            await supabaseAdmin.from("notifications").insert(
              pendingOffline.map((session: any) => ({
                type: "visitor_left",
                title: "Visitor Left",
                body: `${session.ip ?? "unknown"} — ${session.device ?? session.os ?? "Unknown device"}`,
                payload: { session_id: session.session_id },
              })),
            );

            await supabaseAdmin
              .from("sessions")
              .update({ notified_left: true })
              .in(
                "session_id",
                pendingOffline.map((session: any) => session.session_id),
              );
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.warn("[Dashboard] Failed to update offline notifications:", message);
          // Don't fail the entire request for this
        }

        // ===== STEP 10: MARK NOTIFICATIONS AS DELIVERED =====
        let undeliveredNotifications = [];
        try {
          undeliveredNotifications = notifications.filter((notification: any) => !notification.delivered);

          if (undeliveredNotifications.length > 0) {
            console.log(`[Dashboard] Marking ${undeliveredNotifications.length} notifications as delivered`);
            await supabaseAdmin
              .from("notifications")
              .update({ delivered: true })
              .in(
                "id",
                undeliveredNotifications.map((notification: any) => notification.id),
              );
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.warn("[Dashboard] Failed to mark notifications as delivered:", message);
          // Don't fail the entire request for this
        }

        // ===== STEP 11: BUILD RESPONSE =====
        try {
          const response = {
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

          console.log("[Dashboard] Response built successfully");
          return new Response(JSON.stringify(response), {
            status: 200,
            headers: responseHeaders,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("[Dashboard] Response building failed:", message);
          return new Response(JSON.stringify(errorResponse("Failed to build response", message)), {
            status: 200,
            headers: responseHeaders,
          });
        }
      },
    },
  },
});
