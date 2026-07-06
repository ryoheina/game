import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MouseGlow } from "@/components/fx";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "20070925";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Studio Dashboard — Legends of Eternity" }] }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const token = window.localStorage.getItem("studio-admin-token");
    const valid = token === ADMIN_PASSWORD;
    setAuthorized(valid);
    if (!valid) {
      navigate({ to: "/auth", replace: true });
    }
  }, [navigate]);

  const signOut = () => {
    window.localStorage.removeItem("studio-admin-token");
    navigate({ to: "/auth", replace: true });
  };

  if (authorized === undefined) {
    return <div className="grid min-h-dvh place-items-center text-white/60">Loading admin…</div>;
  }

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <MouseGlow />

      <header className="sticky top-0 z-30 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md glass glow-blue">
              <span className="display text-gradient-gold text-sm">L</span>
            </span>
            <div className="display text-xs tracking-[0.35em] text-white/80">STUDIO CONSOLE</div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="rounded-full px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white">View site</Link>
            <button onClick={signOut} className="rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-white">Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <section className="rounded-3xl glass p-8 text-white">
          <h1 className="display text-3xl">Studio Admin Dashboard</h1>
          <p className="mt-3 text-sm text-white/70">
            You are signed in using the local admin password. This dashboard is now accessible without Supabase session auth.
          </p>
        </section>

        <section className="rounded-3xl glass p-8 text-white">
          <h2 className="text-xl font-semibold">Admin tools</h2>
          <p className="mt-2 text-sm text-white/70">This admin page is available at <code className="rounded bg-white/5 px-2 py-1">/admin</code>.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/70">Use the admin password to gate access to studio management content.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm text-white/70">Sign out will clear the local admin token and return you to the login page.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
