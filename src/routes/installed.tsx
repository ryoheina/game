import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ensureVisitorSession } from "@/lib/visitor-session";

export const Route = createFileRoute("/installed")({
  head: () => ({
    meta: [
      { title: "Legends of Eternity" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Installed,
});

function Installed() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incomingSid = params.get("sid");
    const validIncomingSid = incomingSid && incomingSid.length >= 8 && incomingSid.length <= 64 ? incomingSid : null;
    if (validIncomingSid) {
      try {
        window.localStorage.setItem("loe_sid", validIncomingSid);
      } catch {}
    }

    const sessionId = validIncomingSid || ensureVisitorSession();
    if (!sessionId) return;

    fetch("/api/public/installed", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId,
        file: params.get("file") || "LegendsofEternity.exe",
      }),
    }).catch(() => {});
  }, []);

  return (
    <main className="grid min-h-dvh place-items-center overflow-hidden bg-black">
      <video
        className="max-h-dvh max-w-full object-contain"
        src="/background2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </main>
  );
}
