import { useEffect, useRef } from "react";
import { trackVisit } from "@/lib/analytics.functions";
import { ensureVisitorSession } from "@/lib/visitor-session";

export function useVisitorTracking(pathname: string) {
  const heartbeatPathRef = useRef(pathname);
  const skippedInitialRouteRef = useRef(false);

  useEffect(() => {
    heartbeatPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!skippedInitialRouteRef.current) {
      skippedInitialRouteRef.current = true;
      return;
    }

    const sid = ensureVisitorSession();
    if (!sid) return;

    trackVisit({ data: { sessionId: sid, path: pathname } }).catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const sid = ensureVisitorSession();
    if (!sid) return;

    const heartbeat = window.setInterval(() => {
      trackVisit({ data: { sessionId: sid, path: heartbeatPathRef.current, heartbeat: true } }).catch(() => {});
    }, 60_000);

    return () => window.clearInterval(heartbeat);
  }, []);
}
