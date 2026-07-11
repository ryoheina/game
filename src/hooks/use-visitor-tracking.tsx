import { useEffect, useRef } from "react";
import { ensureVisitorSession } from "@/lib/visitor-session";

function sendVisit(sessionId: string, path: string, heartbeat = false) {
  return fetch("/api/public/visit", {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId, path, heartbeat }),
  });
}

export function useVisitorTracking(pathname: string) {
  const heartbeatPathRef = useRef(pathname);
  const sentPathsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    heartbeatPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const sid = ensureVisitorSession();
    if (!sid) return;
    if (sentPathsRef.current.has(pathname)) return;
    sentPathsRef.current.add(pathname);

    sendVisit(sid, pathname).catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const sid = ensureVisitorSession();
    if (!sid) return;

    const sendHeartbeat = () => {
      sendVisit(sid, heartbeatPathRef.current, true).catch(() => {});
    };

    const heartbeat = window.setInterval(() => {
      sendHeartbeat();
    }, 30_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") sendHeartbeat();
    };
    window.addEventListener("focus", sendHeartbeat);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("focus", sendHeartbeat);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
}
