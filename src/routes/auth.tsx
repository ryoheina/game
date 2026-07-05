import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MouseGlow, Particles } from "@/components/fx";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Access — Legends of Eternity" }] }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
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
        <h1 className="display text-3xl text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-white/60">Sign in with your studio account to access the admin dashboard.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
          />
          <input
            type="password"
            required
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength={8}
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
          />
          {err && <div className="text-sm text-[color:var(--ember)]">{err}</div>}
          <button
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-[color:var(--arcane)] to-[color:var(--gold)] px-6 py-3 text-sm uppercase tracking-[0.25em] text-black transition hover:scale-[1.01] disabled:opacity-60"
          >
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/50">
          {mode === "signin" ? (
            <>No account? <button onClick={() => setMode("signup")} className="text-white hover:underline">Create one</button></>
          ) : (
            <>Have an account? <button onClick={() => setMode("signin")} className="text-white hover:underline">Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}
