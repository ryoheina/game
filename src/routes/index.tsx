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
    }, prefersReducedMotion ? 650 : 5200);
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
      <AnimatePresence>{showIntro && <MonsterIntro />}</AnimatePresence>
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

function MonsterIntro() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[200] isolate flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(18px)" }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(160, 13, 13, 0.32), transparent 18%), radial-gradient(circle at 50% 52%, rgba(80, 0, 0, 0.28), transparent 34%), linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(10,0,0,0.96) 46%, rgba(0,0,0,1) 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0.42, 0.6, 0.18, 0] }}
        transition={{ duration: 4.8, times: [0, 0.2, 0.46, 0.68, 0.86, 1], ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(255,44,25,0.28), transparent 23%), radial-gradient(circle at 38% 58%, rgba(120,0,0,0.32), transparent 28%), radial-gradient(circle at 62% 58%, rgba(120,0,0,0.32), transparent 28%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute inset-0 z-[2]"
        initial={{ opacity: 0, scale: 1.25 }}
        animate={{ opacity: [0, 0.32, 0.5, 0.18, 0], scale: [1.25, 1.08, 1.03, 1.18, 1.3] }}
        transition={{ duration: 5, times: [0, 0.22, 0.58, 0.82, 1], ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundImage:
            "conic-gradient(from 130deg at 50% 50%, transparent, rgba(35,0,0,0.95), rgba(255,36,20,0.16), rgba(0,0,0,0.95), transparent)",
          filter: "blur(34px)",
        }}
      />
      <div className="absolute inset-x-0 top-0 z-[3] h-1/3 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-gradient-to-t from-black via-[#110000]/90 to-transparent" />
      <Particles count={58} color="ember" className="z-[4]" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute z-[4] h-[70svh] w-[24vw] min-w-44 rounded-full bg-black/80 blur-3xl"
          initial={{
            opacity: 0,
            rotate: i === 1 ? -28 : i === 2 ? 28 : 0,
            scaleY: 0.65,
            x: i === 1 ? "-34vw" : i === 2 ? "34vw" : 0,
            y: "18svh",
          }}
          animate={{
            opacity: [0, 0.55, 0.78, 0.36, 0],
            scaleY: [0.65, 1.1, 1.36, 1.55, 1.8],
            x: i === 1 ? ["-34vw", "-20vw", "-9vw", "-26vw", "-42vw"] : i === 2 ? ["34vw", "20vw", "9vw", "26vw", "42vw"] : [0, 0, 0, 0, 0],
            y: ["18svh", "4svh", "-4svh", "-12svh", "-22svh"],
          }}
          transition={{ duration: 5.05, times: [0, 0.24, 0.56, 0.82, 1], ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="relative z-[5] h-[min(96svh,960px)] w-[min(116vw,1040px)]"
        initial={{ opacity: 0, scale: 0.52, y: 18, filter: "brightness(0) contrast(1.45) blur(22px)" }}
        animate={{
          opacity: [0, 0.18, 1, 1, 0.96, 0],
          scale: [0.48, 0.66, 1.03, 1.86, 1.92, 2.22],
          x: [0, -3, 4, -14, 9, 0],
          y: [22, 8, 0, -28, -22, -6],
          filter: [
            "brightness(0) contrast(1.45) blur(22px)",
            "brightness(0.32) contrast(1.55) blur(12px)",
            "brightness(0.9) contrast(1.35) blur(1px)",
            "brightness(1.24) contrast(1.5) blur(0px)",
            "brightness(1.05) contrast(1.8) blur(3px)",
            "brightness(0.2) contrast(2) blur(26px)",
          ],
        }}
        transition={{ duration: 4.9, times: [0, 0.22, 0.48, 0.66, 0.78, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/face.png"
          alt=""
          className="h-full w-full object-contain object-center opacity-95"
          draggable={false}
          style={{
            filter:
              "drop-shadow(0 0 20px rgba(255,0,0,0.7)) drop-shadow(0 0 76px rgba(120,0,0,0.85)) drop-shadow(0 38px 110px rgba(0,0,0,1))",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute z-[6] h-[min(11svh,88px)] w-[min(42vw,390px)] rounded-full bg-[#ff1f12] blur-2xl"
        initial={{ opacity: 0, scaleX: 0.25, scaleY: 0.16, y: -24 }}
        animate={{
          opacity: [0, 0, 0.94, 1, 0.5, 0],
          scaleX: [0.25, 0.36, 0.86, 1.22, 1.5, 1.9],
          scaleY: [0.16, 0.18, 0.25, 0.3, 0.18, 0.08],
          y: [-24, -24, -28, -78, -84, -96],
        }}
        transition={{ duration: 4.85, times: [0, 0.2, 0.42, 0.66, 0.82, 1], ease: "easeInOut" }}
        style={{ mixBlendMode: "screen" }}
      />
      <motion.div
        className="absolute z-[6] h-[min(15svh,118px)] w-[min(30vw,300px)] rounded-full bg-[#d4110a] blur-3xl"
        initial={{ opacity: 0, scale: 0.22, y: 118 }}
        animate={{ opacity: [0, 0, 0.48, 0.72, 0.26, 0], scale: [0.22, 0.42, 0.86, 1.32, 1.62, 2], y: [118, 114, 108, 72, 68, 78] }}
        transition={{ duration: 4.85, times: [0, 0.28, 0.52, 0.68, 0.84, 1], ease: "easeInOut" }}
        style={{ mixBlendMode: "screen" }}
      />
      <motion.div
        className="absolute inset-0 z-[7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.42, 0, 0.22, 0] }}
        transition={{ duration: 4.85, times: [0, 0.5, 0.64, 0.7, 0.78, 1] }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <motion.div
        className="absolute inset-0 z-[8] bg-white mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.14, 0, 0.2, 0] }}
        transition={{ duration: 4.85, times: [0, 0.46, 0.65, 0.7, 0.78, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[9] bg-black"
        initial={{ opacity: 0.82 }}
        animate={{ opacity: [0.82, 0.64, 0.26, 0.1, 0.48, 0.92] }}
        transition={{ duration: 4.85, times: [0, 0.22, 0.5, 0.68, 0.88, 1], ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, black 72%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, black 72%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[10] shadow-[inset_0_0_190px_rgba(0,0,0,1)]" />
    </motion.div>
  );
}
