import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/nav";
import { MouseGlow, Particles } from "@/components/fx";
import {
  Hero, Story, Characters, CharacterModal, World, Battle,
  BattleToFeaturesBreak, Technology, Download, Contact, FinalVideo, Footer,
} from "@/components/sections";
import type { DownloadProgressState } from "@/components/sections";
import { submitContact } from "@/lib/analytics.functions";
import { ensureVisitorSession } from "@/lib/visitor-session";

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

function Home() {
  const navigate = useNavigate();
  const [openChar, setOpenChar] = useState<Parameters<typeof CharacterModal>[0]["c"]>(null);
  const [downloadStatus, setDownloadStatus] = useState<DownloadProgressState>({ phase: "idle" });
  const [showIntro, setShowIntro] = useState(true);
  const [siteImpact, setSiteImpact] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      setShowIntro(false);
      if (prefersReducedMotion) {
        document.body.style.overflow = "";
        return;
      }
      setSiteImpact(true);
      window.setTimeout(() => {
        setSiteImpact(false);
        document.body.style.overflow = "";
      }, 1250);
    }, prefersReducedMotion ? 350 : 2600);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = useCallback(async () => {
    setDownloadStatus({ phase: "loading", loadedBytes: 0, totalBytes: 0, percent: 0, elapsedSeconds: 0 });
    const sid = ensureVisitorSession();
    const fileName = "LegendsofEternity.exe";
    const url = `/api/public/download?sid=${encodeURIComponent(sid)}&file=${encodeURIComponent(fileName)}`;
    const startedAt = performance.now();
    let downloadId: string | null = null;
    let lastProgressReportAt = 0;

    const reportProgress = async (
      loadedBytes: number,
      totalBytes: number,
      percent: number,
      elapsedSeconds: number,
      completed = false,
    ) => {
      try {
        const res = await fetch("/api/public/download-progress", {
          method: "POST",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            downloadId,
            sessionId: sid,
            fileName,
            downloadedBytes: loadedBytes,
            totalBytes,
            percent,
            elapsedSeconds,
            completed,
          }),
        });
        const body = await res.json().catch(() => null);
        if (body?.downloadId) downloadId = body.downloadId;
      } catch (error) {
        console.warn("Download progress report failed", error);
      }
    };

    try {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) throw new Error("Download failed");

      downloadId = response.headers.get("x-download-id");
      const totalBytes = Number(response.headers.get("content-length") || "0");
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];
      let loadedBytes = 0;
      await reportProgress(0, totalBytes, 0, 0);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!value) continue;
          chunks.push(value);
          loadedBytes += value.length;
          const elapsedSeconds = Math.max(0, (performance.now() - startedAt) / 1000);
          const percent = totalBytes > 0 ? Math.min(99, Math.round((loadedBytes / totalBytes) * 100)) : 0;
          setDownloadStatus({ phase: "loading", loadedBytes, totalBytes, percent, elapsedSeconds });
          const now = performance.now();
          if (now - lastProgressReportAt >= 1000) {
            lastProgressReportAt = now;
            void reportProgress(loadedBytes, totalBytes, percent, elapsedSeconds);
          }
        }
      } else {
        const blob = await response.blob();
        chunks.push(new Uint8Array(await blob.arrayBuffer()));
        loadedBytes = blob.size;
      }

      const blob = new Blob(chunks, {
        type: response.headers.get("content-type") || "application/vnd.microsoft.portable-executable",
      });
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);

      await reportProgress(
        loadedBytes || blob.size,
        totalBytes || blob.size,
        100,
        Math.max(0, (performance.now() - startedAt) / 1000),
        true,
      );

      setDownloadStatus({
        phase: "complete",
        loadedBytes: loadedBytes || blob.size,
        totalBytes: totalBytes || blob.size,
        percent: 100,
        elapsedSeconds: Math.max(0, (performance.now() - startedAt) / 1000),
      });
    } catch (error) {
      console.error("Download failed", error);
      setDownloadStatus({ phase: "error" });
    }
  }, []);

  const handleContact = useCallback(async (d: { name: string; email: string; message: string }) => {
    await submitContact({ data: d });
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatePresence>{showIntro && <MonsterIntro />}</AnimatePresence>
      <motion.div
        className="min-h-screen origin-center transform-gpu"
        animate={
          siteImpact
            ? {
                scale: [1, 1.12, 0.965, 1.015, 1],
                filter: [
                  "brightness(0.72) contrast(1.25)",
                  "brightness(1.18) contrast(1.1)",
                  "brightness(0.9) contrast(1.22)",
                  "brightness(1.03) contrast(1)",
                  "brightness(1) contrast(1)",
                ],
              }
            : { scale: 1, filter: "brightness(1) contrast(1)" }
        }
        transition={{ duration: 1.15, times: [0, 0.18, 0.42, 0.72, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <MouseGlow />
        <Nav />
        <main>
          <Hero />
          <Story />
          <Characters onOpen={setOpenChar} />
          <World />
          <Battle />
          <BattleToFeaturesBreak />
          <Technology />
          <Contact onSubmit={handleContact} />
          <FinalVideo />
          <Download onDownload={handleDownload} status={downloadStatus} />
        </main>
        <Footer />
      </motion.div>
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
      exit={{ opacity: 0, filter: "blur(24px)" }}
      transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
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
        animate={{ opacity: [0, 0.12, 0.34, 0.62, 0.72, 0.22, 0] }}
        transition={{ duration: 7.35, times: [0, 0.16, 0.38, 0.58, 0.72, 0.9, 1], ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(255,44,25,0.28), transparent 23%), radial-gradient(circle at 38% 58%, rgba(120,0,0,0.32), transparent 28%), radial-gradient(circle at 62% 58%, rgba(120,0,0,0.32), transparent 28%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute inset-0 z-[2]"
        initial={{ opacity: 0, scale: 1.25 }}
        animate={{ opacity: [0, 0.22, 0.48, 0.58, 0.2, 0], scale: [1.35, 1.16, 1.02, 1.08, 1.22, 1.45] }}
        transition={{ duration: 7.5, times: [0, 0.2, 0.48, 0.68, 0.88, 1], ease: [0.16, 1, 0.3, 1] }}
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
            opacity: [0, 0.38, 0.82, 0.7, 0.24, 0],
            scaleY: [0.65, 1.04, 1.42, 1.7, 1.95, 2.15],
            x: i === 1 ? ["-38vw", "-24vw", "-8vw", "-16vw", "-34vw", "-48vw"] : i === 2 ? ["38vw", "24vw", "8vw", "16vw", "34vw", "48vw"] : [0, 0, 0, 0, 0, 0],
            y: ["20svh", "8svh", "-2svh", "-12svh", "-22svh", "-34svh"],
          }}
          transition={{ duration: 7.45, times: [0, 0.22, 0.52, 0.72, 0.9, 1], ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="relative z-[5] h-[min(104svh,1040px)] w-[min(124vw,1120px)]"
        initial={{ opacity: 0, scale: 0.38, y: 28, filter: "brightness(0) contrast(1.55) blur(28px)" }}
        animate={{
          opacity: [0, 0.12, 0.82, 1, 1, 0.94, 0],
          scale: [0.38, 0.5, 0.82, 1.05, 2.08, 2.12, 2.48],
          x: [0, -2, 3, -2, -18, 12, 0],
          y: [28, 14, 4, 0, -42, -34, -10],
          filter: [
            "brightness(0) contrast(1.55) blur(28px)",
            "brightness(0.18) contrast(1.7) blur(18px)",
            "brightness(0.68) contrast(1.48) blur(5px)",
            "brightness(0.95) contrast(1.35) blur(0px)",
            "brightness(1.32) contrast(1.58) blur(0px)",
            "brightness(1.04) contrast(2.05) blur(5px)",
            "brightness(0.08) contrast(2.3) blur(34px)",
          ],
        }}
        transition={{ duration: 7.3, times: [0, 0.16, 0.38, 0.56, 0.71, 0.84, 1], ease: [0.16, 1, 0.3, 1] }}
        style={{
          maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, black 48%, rgba(0,0,0,0.82) 58%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, black 48%, rgba(0,0,0,0.82) 58%, transparent 75%)",
        }}
      >
        <img
          src="/face.png"
          alt=""
          className="h-full w-full object-contain object-center opacity-95"
          draggable={false}
          style={{
            mixBlendMode: "lighten",
            filter:
              "drop-shadow(0 0 28px rgba(255,0,0,0.82)) drop-shadow(0 0 96px rgba(120,0,0,0.9)) drop-shadow(0 46px 130px rgba(0,0,0,1))",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute z-[6] h-[min(11svh,88px)] w-[min(42vw,390px)] rounded-full bg-[#ff1f12] blur-2xl"
        initial={{ opacity: 0, scaleX: 0.25, scaleY: 0.16, y: -24 }}
        animate={{
          opacity: [0, 0, 0.42, 1, 0.92, 0.34, 0],
          scaleX: [0.2, 0.28, 0.66, 1.08, 1.62, 1.9, 2.2],
          scaleY: [0.12, 0.14, 0.22, 0.3, 0.2, 0.1, 0.04],
          y: [-20, -22, -28, -32, -98, -108, -118],
        }}
        transition={{ duration: 7.25, times: [0, 0.22, 0.42, 0.58, 0.72, 0.88, 1], ease: "easeInOut" }}
        style={{ mixBlendMode: "screen" }}
      />
      <motion.div
        className="absolute z-[6] h-[min(15svh,118px)] w-[min(30vw,300px)] rounded-full bg-[#d4110a] blur-3xl"
        initial={{ opacity: 0, scale: 0.22, y: 118 }}
        animate={{ opacity: [0, 0, 0.34, 0.78, 0.58, 0.18, 0], scale: [0.22, 0.32, 0.78, 1.22, 1.76, 2.08, 2.28], y: [122, 118, 112, 100, 58, 66, 84] }}
        transition={{ duration: 7.25, times: [0, 0.28, 0.48, 0.62, 0.74, 0.9, 1], ease: "easeInOut" }}
        style={{ mixBlendMode: "screen" }}
      />
      <motion.div
        className="absolute inset-0 z-[7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.12, 0, 0.5, 0, 0.18, 0] }}
        transition={{ duration: 7.25, times: [0, 0.34, 0.5, 0.56, 0.7, 0.74, 0.82, 1] }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <motion.div
        className="absolute inset-0 z-[8] bg-white mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.06, 0, 0.32, 0, 0.12, 0] }}
        transition={{ duration: 7.25, times: [0, 0.4, 0.54, 0.58, 0.7, 0.74, 0.82, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[9] bg-black"
        initial={{ opacity: 0.82 }}
        animate={{ opacity: [0.96, 0.86, 0.58, 0.24, 0.08, 0.44, 0.94] }}
        transition={{ duration: 7.25, times: [0, 0.16, 0.36, 0.56, 0.72, 0.9, 1], ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, black 72%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, black 72%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[10] shadow-[inset_0_0_190px_rgba(0,0,0,1)]" />
    </motion.div>
  );
}
