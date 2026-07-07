import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type NotificationRow = any;

export default function useAdminNotifications(initial: NotificationRow[] = []) {
  const [notifications, setNotifications] = useState<NotificationRow[]>(initial);
  const mountedRef = useRef(true);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    mountedRef.current = true;
    async function start() {
      setNotifications(initial);
      try {
        const chan = supabase.channel("public:notifications");
        chan.on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "notifications" },
          (payload) => {
            if (!mountedRef.current) return;
            setNotifications((prev) => [payload.new, ...prev]);
            // Desktop notification
            try {
              if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                const title = payload.new.title || "New Notification";
                const body = payload.new.body || "";
                const n = new Notification(title, { body });
                n.onclick = () => {
                  try { window.focus(); } catch (e) {}
                };
              }
            } catch (e) {
              // ignore
            }
          },
        );
        channelRef.current = await chan.subscribe();
      } catch (e) {
        // subscribe failed; fallback to polling below
        channelRef.current = null;
      }

      // polling fallback
      const iv = setInterval(async () => {
        if (channelRef.current) return; // if subscribed, skip polling
        try {
          const res = await fetch("/api/admin/dashboard", { credentials: "include" });
          if (!res.ok) return;
          const data = await res.json();
          if (!mountedRef.current) return;
          setNotifications(data.notifications || []);
        } catch (e) {
          // ignore
        }
      }, 3000);

      return () => {
        mountedRef.current = false;
        clearInterval(iv);
        try { if (channelRef.current && typeof channelRef.current.unsubscribe === "function") channelRef.current.unsubscribe(); } catch (e) {}
      };
    }

    const stop = start();
    return () => { mountedRef.current = false; };
  }, []);

  const markRead = async (id: string) => {
    try {
      const res = await fetch("/api/admin/mark-notification-read", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (e) {}
  };

  const remove = async (id: string) => {
    try {
      const res = await fetch("/api/admin/delete-notification", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (e) {}
  };

  const clearAll = async () => {
    try {
      const res = await fetch("/api/admin/clear-notifications", { method: "POST", credentials: "include" });
      if (res.ok) setNotifications([]);
    } catch (e) {}
  };

  return { notifications, setNotifications, markRead, remove, clearAll };
}

