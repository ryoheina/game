import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getAdminStats, getAdminStatus, promoteToAdmin } from "@/lib/analytics.functions";
import { MouseGlow } from "@/components/fx";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Studio Dashboard — Legends of Eternity" }] }),
  component: Admin,
  errorComponent: ErrorView,
});

function ErrorView({ error }: { error: Error }) {
  return (
    <div className="mx-auto max-w-lg p-10 text-center">
      <h1 className="display text-2xl text-white">Access denied</h1>
      <p className="mt-3 text-sm text-white/60">{error.message}</p>
      <Link to="/" className="mt-6 inline-block text-sm text-white/70 hover:text-white">← Back to site</Link>
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const getStatus = useServerFn(getAdminStatus);
  const promote = useServerFn(promoteToAdmin);
  const fetchStats = useServerFn(getAdminStats);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setSession(null);
      } else {
        setSession(data.session ?? null);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (session === null) {
      navigate({ to: "/auth", replace: true });
    }
  }, [navigate, session]);

  const {
    data: status,
    isLoading: statusLoading,
    error: statusError,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ["admin-status"],
    queryFn: () => getStatus(),
    enabled: session !== undefined && session !== null,
  });

  const {
    data,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats(),
    enabled: Boolean(status?.isAdmin),
    refetchInterval: 15_000,
  });

  const signOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const promoteSelf = async () => {
    setIsPromoting(true);
    try {
      const result = await promote();
      if (result?.ok) {
        refetchStatus();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPromoting(false);
    }
  };

  if (session === undefined) {
    return <div className="grid min-h-dvh place-items-center text-white/60">Loading dashboard…</div>;
  }
  if (!session) return null;
  if (statusLoading || statsLoading) {
    return <div className="grid min-h-dvh place-items-center text-white/60">Loading dashboard…</div>;
  }

  if (statusError) {
    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div>
          <h1 className="display text-2xl text-white">Unable to verify access</h1>
          <p className="mt-2 text-white/60">We could not verify your admin access. Please sign out and try again.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={signOut} className="rounded-full bg-white px-4 py-2 text-sm text-black">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  if (!status?.isAdmin) {
    if (!status?.anyAdmin) {
      return (
        <div className="grid min-h-dvh place-items-center p-6 text-center">
          <div>
            <h1 className="display text-2xl text-white">First admin required</h1>
            <p className="mt-2 text-white/60">No admin account exists yet. You can promote your current account to the first admin.</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={promoteSelf}
                disabled={isPromoting}
                className="rounded-full glass px-4 py-2 text-sm text-white disabled:opacity-60"
              >
                {isPromoting ? "Promoting…" : "Make this account admin"}
              </button>
              <button onClick={signOut} className="rounded-full bg-white px-4 py-2 text-sm text-black">Sign out</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div>
          <h1 className="display text-2xl text-white">Forbidden</h1>
          <p className="mt-2 text-white/60">You are signed in but not an admin. Grant your user the <code>admin</code> role in the database.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => refetchStatus()} className="rounded-full glass px-4 py-2 text-sm text-white">Retry</button>
            <button onClick={signOut} className="rounded-full bg-white px-4 py-2 text-sm text-black">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div>
          <h1 className="display text-2xl text-white">Dashboard unavailable</h1>
          <p className="mt-2 text-white/60">We could not load admin data right now.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => refetchStats()} className="rounded-full glass px-4 py-2 text-sm text-white">Retry</button>
            <button onClick={signOut} className="rounded-full bg-white px-4 py-2 text-sm text-black">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { totals, recentVisits, recentDownloads, byCountry, byBrowser, byOs, hourly, messages } = data;
  const maxHourly = Math.max(1, ...hourly.map((h) => h.visits));

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

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total Visitors", totals.visits],
            ["Online Now", totals.online],
            ["Today", totals.today],
            ["Downloads", totals.downloads],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl glass p-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{k}</div>
              <div className="mt-3 display text-4xl text-white">{v as number}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl glass p-6 lg:col-span-2">
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Traffic · last 24h</div>
            <div className="flex h-40 items-end gap-1">
              {hourly.map((h) => (
                <div key={h.hour} className="flex-1">
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${(h.visits / maxHourly) * 100}%`,
                      background: "linear-gradient(180deg, var(--arcane), oklch(0.3 0.15 245))",
                      minHeight: 2,
                    }}
                    title={`${h.hour}:00 — ${h.visits}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-white/40">
              <span>00:00</span><span>12:00</span><span>23:00</span>
            </div>
          </div>
          <BreakdownCard title="Countries" rows={byCountry} />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <BreakdownCard title="Browsers" rows={byBrowser} />
          <BreakdownCard title="Operating Systems" rows={byOs} />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl glass p-6">
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Recent Downloads</div>
            <div className="space-y-2 text-sm">
              {recentDownloads.length === 0 && <div className="text-white/40">No downloads yet.</div>}
              {recentDownloads.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-white">{d.file_name}</div>
                    <div className="text-xs text-white/50">{d.country || "?"} · {d.browser} · {d.os} · {d.ip || "—"}</div>
                  </div>
                  <div className="shrink-0 text-xs text-white/50">{new Date(d.created_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl glass p-6">
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Recent Visits</div>
            <div className="space-y-2 text-sm">
              {recentVisits.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-white">{v.path || "/"}</div>
                    <div className="text-xs text-white/50">{v.country || "?"} · {v.browser} · {v.os} · {v.ip || "—"}</div>
                  </div>
                  <div className="shrink-0 text-xs text-white/50">{new Date(v.created_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {messages.length > 0 && (
          <section className="rounded-2xl glass p-6">
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">Recent Messages</div>
            <div className="space-y-3 text-sm">
              {messages.map((m) => (
                <div key={m.id} className="rounded-lg bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white">{m.name} <span className="text-white/50">· {m.email}</span></div>
                    <div className="text-xs text-white/50">{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                  <p className="mt-2 text-white/70">{m.message}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function BreakdownCard({ title, rows }: { title: string; rows: { name: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="rounded-2xl glass p-6">
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">{title}</div>
      {rows.length === 0 && <div className="text-sm text-white/40">No data.</div>}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.name}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-white/80">{r.name}</span>
              <span className="text-white/50">{r.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(r.value / max) * 100}%`,
                  background: "linear-gradient(90deg, var(--arcane), var(--gold))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
