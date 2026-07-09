import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/nav";
import { MouseGlow, Particles } from "@/components/fx";
import {
  Hero, Story, Characters, CharacterModal, World, Battle,
  BattleToFeaturesBreak, Features, Technology, Download, Contact, Footer,
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
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const sid = ensureSession();
    if (!sid) return;
    trackVisit({ data: { sessionId: sid, path: window.location.pathname } }).catch(() => {});
    const heartbeat = setInterval(() => {
      trackVisit({ data: { sessionId: sid, path: window.location.pathname, heartbeat: true } }).catch(() => {});
    }, 60_000);
    return () => clearInterval(heartbeat);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "";
    }, prefersReducedMotion ? 650 : 3600);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = useCallback(async () => {
    setDownloadStatus("loading");
    const sid = ensureSession();
    const fileName = "3D Game.rar";
    const url = `/api/public/download?sid=${encodeURIComponent(sid)}&file=${encodeURIComponent(fileName)}`;

    try {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

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
      <AnimatePresence>{showIntro && <ZerevokIntro />}</AnimatePresence>
      <MouseGlow />
      <Nav />
      <main>
        <Hero onDownload={handleDownload} />
        <Story />
        <Characters onOpen={setOpenChar} />
        <World />
        <Battle />
        <BattleToFeaturesBreak />
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

function ZerevokIntro() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[200] isolate flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.82), rgba(23,4,4,0.7) 48%, rgba(0,0,0,0.95)), linear-gradient(90deg, rgba(85,7,7,0.22), transparent 32%, transparent 68%, rgba(85,7,7,0.22))",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#4b0505]/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-[#160303]/85 to-transparent" />
      <Particles count={42} color="ember" className="z-[1]" />
      <motion.div
        className="relative z-[2] h-[min(76svh,720px)] w-[min(88vw,680px)]"
        initial={{ opacity: 0, scale: 1.22, y: 28, filter: "brightness(0.3) blur(18px)" }}
        animate={{
          opacity: [0, 1, 1, 0.92],
          scale: [1.22, 1.03, 1],
          y: [28, 0, -8],
          filter: [
            "brightness(0.3) blur(18px)",
            "brightness(0.9) blur(2px)",
            "brightness(1.05) blur(0px)",
          ],
        }}
        transition={{ duration: 2.6, times: [0, 0.42, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/ZEREVOK.png"
          alt=""
          className="h-full w-full object-contain object-center opacity-95"
          draggable={false}
          style={{
            filter:
              "drop-shadow(0 0 24px rgba(255,54,34,0.44)) drop-shadow(0 28px 80px rgba(0,0,0,0.9))",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-[3] bg-white mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.16, 0, 0.28, 0] }}
        transition={{ duration: 2.7, times: [0, 0.28, 0.34, 0.76, 1] }}
      />
      <div className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_0_160px_rgba(0,0,0,0.95)]" />
    </motion.div>
  );
}
