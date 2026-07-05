import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MouseGlow, Particles } from "@/components/fx";
import { ADMIN_SECRET } from "@/lib/admin";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Access — Legends of Eternity" }] }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("loe_admin_secret") === ADMIN_SECRET) {
      navigate({ to: "/admin", replace: true });
    }
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (password !== ADMIN_SECRET) {
        throw new Error("Incorrect access code.");
      }
      localStorage.setItem("loe_admin_secret", ADMIN_SECRET);
      navigate({ to: "/admin", replace: true });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Unable to authenticate.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4">
      <MouseGlow />
      <Particles count={30} color="arcane" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,oklch(0.72_0.19_245/0.18),transparent)]" />
      <div className="relative w-full max-w-md rounded-2xl glass p-8">
        <Link to="/" className="mb-6 inline-block text-xs uppercase tracking-[0.35em] text-white/50 hover:text-white">
          ← Back to site
        </Link>
        <h1 className="display text-3xl text-white">Admin Gate</h1>
        <p className="mt-2 text-sm text-white/60">Enter the hidden studio access code to continue.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input
            type="password" required autoComplete="one-time-code"
            value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Access code"
            minLength={1}
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
          />
          {err && <div className="text-sm text-[color:var(--ember)]">{err}</div>}
          <button
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-[color:var(--arcane)] to-[color:var(--gold)] px-6 py-3 text-sm uppercase tracking-[0.25em] text-black transition hover:scale-[1.01] disabled:opacity-60"
          >
            {busy ? "…" : "Enter"}
          </button>
        </form>
        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
          Hidden access code required. Keep this page private.
        </p>
      </div>
    </div>
  );
}
