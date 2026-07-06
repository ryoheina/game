import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { MouseGlow } from "@/components/fx";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "20070925";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Studio Dashboard — Legends of Eternity" }] }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);
  const [sessions, setSessions] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const lastSnapshotRef = useRef<string | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("studio-admin-token");
    const valid = token === ADMIN_PASSWORD;
    setAuthorized(valid);
    if (!valid) {
      navigate({ to: "/auth", replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!authorized) return;

    if (Notification && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }

    let mounted = true;
    const token = window.localStorage.getItem("studio-admin-token") || "";

    async function poll() {
      try {
        const res = await fetch("/api/admin/dashboard", {
          credentials: "include",
          headers: {
            "content-type": "application/json",
            "x-admin-password": token,
          },
        });
        if (res.status === 401) {
          window.localStorage.removeItem("studio-admin-token");
          navigate({ to: "/auth", replace: true });
          return;
        }

        const data = await res.json();
        const list = data.sessions || [];
        if (!mounted) return;

        setSessions(list);
        setDownloads(data.downloads || []);
        setNotifications(data.notifications || []);

        const snap = JSON.stringify(list.map((item: any) => ({ id: item.session_id, last_active: item.last_active })));
        if (lastSnapshotRef.current && lastSnapshotRef.current !== snap) {
          const prev = JSON.parse(lastSnapshotRef.current);
          const prevMap = new Map(prev.map((p: any) => [p.id, p.last_active]));
          list.forEach((item: any) => {
            const prevVal = prevMap.get(item.session_id);
            if (prevVal && prevVal !== item.last_active && Notification && Notification.permission === "granted") {
              new Notification("Visitor activity", {
                body: `${item.ip ?? "unknown"} — ${item.device ?? item.os} — ${item.status}`,
              });
            }
          });
        }
        lastSnapshotRef.current = snap;
      } catch (e) {
        console.error(e);
      }
    }

    poll();
    const iv = setInterval(poll, 5000);
    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, [authorized, navigate]);

  const signOut = async () => {
    window.localStorage.removeItem("studio-admin-token");
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" }).catch(() => {});
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
          <div className="mt-6 space-y-8">
            <div className="overflow-x-auto rounded-3xl bg-white/5 p-4">
              <h3 className="text-lg font-medium">Active visitors</h3>
              <table className="w-full table-auto text-left text-sm text-white/80">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Session</th>
                    <th className="px-2 py-2">IP</th>
                    <th className="px-2 py-2">Country</th>
                    <th className="px-2 py-2">Device</th>
                    <th className="px-2 py-2">Browser</th>
                    <th className="px-2 py-2">OS</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Last active</th>
                    <th className="px-2 py-2">First visit</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((d) => (
                    <tr key={d.session_id} className="border-t border-white/5 text-white/70">
                      <td className="px-2 py-2">{d.session_id.slice(0, 8)}</td>
                      <td className="px-2 py-2">{d.ip ?? '—'}</td>
                      <td className="px-2 py-2">{d.country ?? '—'}</td>
                      <td className="px-2 py-2">{d.device ?? '—'}</td>
                      <td className="px-2 py-2">{d.browser ?? '—'}</td>
                      <td className="px-2 py-2">{d.os ?? '—'}</td>
                      <td className="px-2 py-2">{d.status}</td>
                      <td className="px-2 py-2">{new Date(d.last_active).toLocaleTimeString()}</td>
                      <td className="px-2 py-2">{new Date(d.first_visit).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto rounded-3xl bg-white/5 p-4">
              <h3 className="text-lg font-medium">Download activity</h3>
              <table className="w-full table-auto text-left text-sm text-white/80">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Time</th>
                    <th className="px-2 py-2">IP</th>
                    <th className="px-2 py-2">Session</th>
                    <th className="px-2 py-2">File</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((d) => (
                    <tr key={d.id} className="border-t border-white/5 text-white/70">
                      <td className="px-2 py-2">{new Date(d.started_at ?? d.created_at).toLocaleString()}</td>
                      <td className="px-2 py-2">{d.ip ?? '—'}</td>
                      <td className="px-2 py-2">{d.session_id ? d.session_id.slice(0, 8) : '—'}</td>
                      <td className="px-2 py-2">{d.file_name}</td>
                      <td className="px-2 py-2">{d.status}</td>
                      <td className="px-2 py-2">{d.completed ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white/5 p-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                {notifications.map((note) => (
                  <div key={note.id} className="rounded-2xl bg-background/80 p-3">
                    <div className="font-medium text-white">{note.title}</div>
                    <div>{note.body}</div>
                    <div className="mt-1 text-xs text-white/50">{new Date(note.created_at).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
