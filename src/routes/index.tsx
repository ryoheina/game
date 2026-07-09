import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/nav";
import { MouseGlow } from "@/components/fx";
import {
  Hero, Story, Characters, CharacterModal, World, Battle,
  Features, Technology, Download, Contact, Footer,
} from "@/components/sections";
import { submitContact, trackVisit } from "@/lib/analytics.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Legends of Eternity — A next-gen 3D multiplayer fantasy RPG" },
      { name: "description", content: "Enter the world of Legends of Eternity. Forge alliances, wield forbidden magic, and stand against eternal darkness in a next-generation 3D multiplayer fantasy RPG." },
      { property: "og:title", content: "Legends of Eternity" },
      { property: "og:description", content: "A next-generation 3D multiplayer fantasy RPG." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function ensureSession() {
  if (typeof window === "undefined") return "";
  const k = "loe_sid";
  let sid = localStorage.getItem(k);
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem(k, sid);
  }
  return sid;
}

function Home() {
  const navigate = useNavigate();
  const [openChar, setOpenChar] = useState<Parameters<typeof CharacterModal>[0]["c"]>(null);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const sid = ensureSession();
    if (!sid) return;
    trackVisit({ data: { sessionId: sid, path: window.location.pathname } }).catch(() => {});
    const heartbeat = setInterval(() => {
      trackVisit({ data: { sessionId: sid, path: window.location.pathname, heartbeat: true } }).catch(() => {});
    }, 60_000);
    return () => clearInterval(heartbeat);
  }, []);

  const handleDownload = useCallback(async () => {
    setDownloadStatus("loading");
    const sid = ensureSession();
    const fileName = "3D Game.rar";
    const url = `/api/public/download?sid=${encodeURIComponent(sid)}&file=${encodeURIComponent(fileName)}`;

    try {
      const res = await fetch(url, { credentials: "same-origin" });
      if (!res.ok) {
        setDownloadStatus("idle");
        return;
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(objectUrl);

      setDownloadStatus("done");
      window.setTimeout(() => setDownloadStatus("idle"), 3000);
    } catch {
      setDownloadStatus("idle");
    }
  }, []);

  const handleContact = useCallback(async (d: { name: string; email: string; message: string }) => {
    await submitContact({ data: d });
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <MouseGlow />
      <Nav />
      <main>
        <Hero onDownload={handleDownload} />
        <Story />
        <Characters onOpen={setOpenChar} />
        <World />
        <Battle />
        <Features />
        <Technology />
        <Download onDownload={handleDownload} status={downloadStatus} />
        <Contact onSubmit={handleContact} />
      </main>
      <Footer />
      <AnimatePresence>{openChar && <CharacterModal c={openChar} onClose={() => setOpenChar(null)} />}</AnimatePresence>
    </div>
  );
}
