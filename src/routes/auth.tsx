import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MouseGlow, Particles } from "@/components/fx";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "admin@legends-of-eternity.studio";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Studio Admin Access — Legends of Eternity" }] }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setInfo(null);
    try {
      if (!password) {
        throw new Error("Password is required.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password,
      });

      if (error) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: ADMIN_EMAIL,
          password,
        });

        if (signUpError) {
          throw signUpError;
        }

        if (!signUpData.session) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password,
          });
          if (signInError) throw signInError;
        }
      }

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
        <h1 className="display text-3xl text-white">Studio Login</h1>
        <p className="mt-2 text-sm text-white/60">Enter the admin password to access your studio dashboard.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
          />
          {err && <div className="text-sm text-[color:var(--ember)]">{err}</div>}
          {info && <div className="text-sm text-[color:var(--lime)]">{info}</div>}
          <button
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-[color:var(--arcane)] to-[color:var(--gold)] px-6 py-3 text-sm uppercase tracking-[0.25em] text-black transition hover:scale-[1.01] disabled:opacity-60"
          >
            {busy ? "…" : "Enter"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/50">
          <p>Enter your admin password to access the studio dashboard.</p>
        </div>
      </div>
    </div>
  );
}
