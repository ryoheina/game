import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type NotificationEvent = {
  type: "visitor" | "download";
  id: string;
  title: string;
  body: string;
  timestamp: number;
};

export type DesktopNotificationState = {
  permission: "granted" | "denied" | "default" | "loading";
  notificationCount: number;
  lastError: string | null;
};

/**
 * Enhanced desktop notification hook with Realtime subscription + polling fallback.
 * Captures full event details (IP, country, device, browser, filename).
 * Stores notifications in Supabase notifications table.
 * Shows rich browser desktop notifications automatically.
 * Prevents duplicates by tracking shown notification IDs.
 */
export function useDesktopNotifications() {
  const [notificationState, setNotificationState] = useState<DesktopNotificationState>({
    permission: "default",
    notificationCount: 0,
    lastError: null,
  });

  const shownNotificationIdsRef = useRef<Set<string>>(new Set());
  const lastDataSnapshot = useRef<{ sessions: any[]; downloads: any[] }>({ sessions: [], downloads: [] });
  const realtimeChannelRef = useRef<any>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Helper function to log notifications to Supabase and show desktop notification
  async function showNotification(
    type: "visitor" | "download",
    sessionData: {
      session_id: string;
      ip?: string;
      country?: string;
      device?: string;
      browser?: string;
      file_name?: string;
    }
  ) {
    const notifId = `${type}-${sessionData.session_id}`;

    // Check if already shown
    if (shownNotificationIdsRef.current.has(notifId)) {
      return;
    }

    shownNotificationIdsRef.current.add(notifId);

    try {
      // Build rich notification content
      let title: string;
      let body: string;

      if (type === "visitor") {
        title = "New Visitor";
        body = [
          `Session: ${sessionData.session_id.slice(0, 8)}`,
          `IP: ${sessionData.ip || "unknown"}`,
          `Country: ${sessionData.country || "unknown"}`,
          `Device: ${sessionData.device || "unknown"}`,
          `Browser: ${sessionData.browser || "unknown"}`,
        ].join("\n");

        console.log("[Desktop Notifications] New visitor detected:", {
          session_id: sessionData.session_id,
          ip: sessionData.ip,
          country: sessionData.country,
        });
      } else {
        title = "New Download";
        body = [
          `File: ${sessionData.file_name || "unknown"}`,
          `Session: ${sessionData.session_id.slice(0, 8)}`,
          `IP: ${sessionData.ip || "unknown"}`,
          `Country: ${sessionData.country || "unknown"}`,
          `Time: ${new Date().toLocaleTimeString()}`,
        ].join("\n");

        console.log("[Desktop Notifications] New download detected:", {
          file_name: sessionData.file_name,
          session_id: sessionData.session_id,
          ip: sessionData.ip,
        });
      }

      // Store in notifications table
      try {
        const storeRes = await fetch("/api/admin/log-notification", {
          method: "POST",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            type,
            session_id: sessionData.session_id,
            ip_address: sessionData.ip,
            country: sessionData.country,
            device: sessionData.device,
            browser: sessionData.browser,
            filename: sessionData.file_name,
            title,
            body,
          }),
        });

        if (!storeRes.ok) {
          const errText = await storeRes.text().catch(() => "");
          console.error("[Desktop Notifications] Notification insert failed:", storeRes.status, errText);
          setNotificationState((prev) => ({
            ...prev,
            lastError: `Failed to store notification: ${storeRes.status}`,
          }));
        }
      } catch (err) {
        console.error("[Desktop Notifications] Notification insert failed:", err);
        setNotificationState((prev) => ({
          ...prev,
          lastError: `Failed to store notification: ${String(err)}`,
        }));
      }

      // Show browser desktop notification if permission granted
      if (Notification && Notification.permission === "granted") {
        try {
          const notif = new Notification(title, {
            body,
            icon: "/favicon.ico",
            tag: notifId,
            badge: "/favicon.ico",
          });

          console.log(`[Desktop Notifications] Browser notification sent (${type}):`, { title, body });

          notif.onclick = () => {
            try {
              window.focus();
              window.location.href = "/admin";
            } catch (e) {
              console.error("[Desktop Notifications] Focus failed:", e);
            }
          };

          setNotificationState((prev) => ({
            ...prev,
            notificationCount: prev.notificationCount + 1,
          }));
        } catch (err) {
          console.error("[Desktop Notifications] Browser notification failed:", err);
          setNotificationState((prev) => ({
            ...prev,
            lastError: `Browser notification failed: ${String(err)}`,
          }));
        }
      }
    } catch (err) {
      console.error("[Desktop Notifications] Unexpected error in showNotification:", err);
    }
  }
  useEffect(() => {
    mountedRef.current = true;

    if (typeof Notification === "undefined") {
      console.warn("[Desktop Notifications] Browser does not support Notifications API");
      setNotificationState((prev) => ({
        ...prev,
        permission: "denied",
        lastError: "Browser does not support notifications",
      }));
      return;
    }

    const currentPermission = Notification.permission;
    setNotificationState((prev) => ({ ...prev, permission: currentPermission as any }));
    console.log("[Desktop Notifications] Notification permission:", currentPermission);

    if (currentPermission === "default") {
      console.log("[Desktop Notifications] Requesting notification permission...");
      setNotificationState((prev) => ({ ...prev, permission: "loading" }));

      Notification.requestPermission()
        .then((permission) => {
          if (!mountedRef.current) return;
          console.log("[Desktop Notifications] Notification permission:", permission);
          setNotificationState((prev) => ({
            ...prev,
            permission: permission as any,
            lastError: permission === "denied" ? "Notifications denied by user" : null,
          }));
        })
        .catch((err) => {
          if (!mountedRef.current) return;
          console.error("[Desktop Notifications] Permission request failed:", err);
          setNotificationState((prev) => ({
            ...prev,
            permission: "denied",
            lastError: `Permission error: ${String(err)}`,
          }));
        });
    } else if (currentPermission === "denied") {
      setNotificationState((prev) => ({
        ...prev,
        lastError: "Notifications denied by user or browser policy",
      }));
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Set up Realtime and polling subscriptions
  useEffect(() => {
    if (!mountedRef.current || notificationState.permission !== "granted") return;

    let isRealtimeConnected = false;
    let shouldPoll = true;

    // Subscribe to new visitor sessions (inserts)
    async function setupRealtimeSubscriptions() {
      try {
        // Subscribe to sessions
        const sessionsChan = supabase.channel("desktop-notif:sessions");
        sessionsChan.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "sessions" },
          (payload) => {
            if (!mountedRef.current) return;
            console.log("[Desktop Notifications] Realtime connected");
            isRealtimeConnected = true;
            shouldPoll = false;

            const newSession = payload.new;
            showNotification("visitor", {
              session_id: newSession.session_id,
              ip: newSession.ip,
              country: newSession.country,
              device: newSession.device,
              browser: newSession.browser,
            });
          }
        );

        await sessionsChan.subscribe();
        console.log("[Desktop Notifications] Subscribed to sessions Realtime channel");

        // Subscribe to downloads
        const downloadsChan = supabase.channel("desktop-notif:downloads");
        downloadsChan.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "downloads" },
          (payload) => {
            if (!mountedRef.current) return;

            const newDownload = payload.new;
            // Only notify if download is completed
            if (newDownload.completed) {
              showNotification("download", {
                session_id: newDownload.session_id,
                ip: newDownload.ip,
                country: newDownload.country,
                device: newDownload.device,
                browser: newDownload.browser,
                file_name: newDownload.file_name,
              });
            }
          }
        );

        await downloadsChan.subscribe();
        console.log("[Desktop Notifications] Subscribed to downloads Realtime channel");

        realtimeChannelRef.current = { sessionsChan, downloadsChan };
      } catch (err) {
        console.warn("[Desktop Notifications] Realtime subscription failed, falling back to polling:", err);
        isRealtimeConnected = false;
        shouldPoll = true;
      }
    }

    // Poll fallback to detect new rows every 2.5 seconds
    async function pollDashboard() {
      if (!shouldPoll || !mountedRef.current) return;

      try {
        const res = await fetch("/api/admin/dashboard", { credentials: "include" });
        if (!res.ok || res.status === 401) return;

        const data = await res.json();
        if (!mountedRef.current) return;

        const currentSessions = data.sessions || [];
        const currentDownloads = data.downloads || [];

        // Check for new sessions
        const lastSessionIds = new Set(lastDataSnapshot.current.sessions.map((s: any) => s.session_id));
        currentSessions.forEach((session: any) => {
          if (!lastSessionIds.has(session.session_id)) {
            showNotification("visitor", {
              session_id: session.session_id,
              ip: session.ip,
              country: session.country,
              device: session.device,
              browser: session.browser,
            });
          }
        });

        // Check for new downloads
        const lastDownloadIds = new Set(lastDataSnapshot.current.downloads.map((d: any) => d.id));
        currentDownloads.forEach((download: any) => {
          if (!lastDownloadIds.has(download.id) && download.completed) {
            showNotification("download", {
              session_id: download.session_id,
              ip: download.ip,
              country: download.country,
              device: download.device,
              browser: download.browser,
              file_name: download.file_name,
            });
          }
        });

        lastDataSnapshot.current = { sessions: currentSessions, downloads: currentDownloads };
      } catch (err) {
        console.error("[Desktop Notifications] Polling error:", err);
      }
    }

    // Start subscriptions and polling
    setupRealtimeSubscriptions();

    // Polling interval (2.5 seconds)
    pollingIntervalRef.current = setInterval(() => {
      if (shouldPoll) {
        pollDashboard();
      }
    }, 2500);

    return () => {
      mountedRef.current = false;
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      try {
        if (realtimeChannelRef.current?.sessionsChan) {
          realtimeChannelRef.current.sessionsChan.unsubscribe();
        }
        if (realtimeChannelRef.current?.downloadsChan) {
          realtimeChannelRef.current.downloadsChan.unsubscribe();
        }
      } catch (e) {
        // ignore
      }
    };
  }, [notificationState.permission]);

  return notificationState;
}
