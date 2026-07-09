import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import useAdminNotifications from "@/hooks/use-admin-notifications";
import { useDesktopNotifications } from "@/hooks/use-desktop-notifications";
import { MouseGlow } from "@/components/fx";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Studio Dashboard — Legends of Eternity" }] }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);
  const [sessions, setSessions] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const { notifications, setNotifications, markRead, remove, clearAll } = useAdminNotifications([]);
  const desktopNotifState = useDesktopNotifications();
  const lastSnapshotRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/dashboard", { credentials: "include" });
        if (res.status === 401) {
          navigate({ to: "/auth", replace: true });
          return;
        }
        if (res.ok && mounted) setAuthorized(true);
      } catch {
        navigate({ to: "/auth", replace: true });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (!authorized) return;

    if (Notification && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }

    let mounted = true;
    let pollIv: ReturnType<typeof setInterval> | null = null;

    async function fetchDashboard() {
      try {
        const res = await fetch("/api/admin/dashboard", {
          credentials: "include",
          headers: { "content-type": "application/json" },
        });
        if (res.status === 401) {
          navigate({ to: "/auth", replace: true });
          return false;
        }

        if (!res.ok) {
          console.error("Dashboard API error:", res.status, res.statusText);
          if (!mounted) return true;
          setSessions([]);
          setDownloads([]);
          setNotifications([]);
          return true;
        }

        const data = await res.json();
        if (!mounted) return true;
        setSessions(data.sessions || []);
        setDownloads(data.downloads || []);
        setNotifications(data.notifications || []);

        const snap = JSON.stringify((data.sessions || []).map((item: any) => ({ id: item.session_id, last_active: item.last_active })));
        if (lastSnapshotRef.current && lastSnapshotRef.current !== snap) {
          const prev = JSON.parse(lastSnapshotRef.current);
          const prevMap = new Map(prev.map((p: any) => [p.id, p.last_active]));
          (data.sessions || []).forEach((item: any) => {
            const prevVal = prevMap.get(item.session_id);
            if (prevVal && prevVal !== item.last_active && Notification && Notification.permission === "granted") {
              new Notification("Visitor activity", {
                body: `${item.ip ?? "unknown"} — ${item.device ?? item.os} — ${item.status}`,
              });
            }
          });
        }
        lastSnapshotRef.current = snap;
        return true;
      } catch (e) {
        console.error("Dashboard poll error:", e);
        if (!mounted) return false;
        setSessions([]);
        setDownloads([]);
        setNotifications([]);
        return false;
      }
    }

    void fetchDashboard();
    pollIv = setInterval(fetchDashboard, 3000);

    return () => {
      mounted = false;
      if (pollIv) clearInterval(pollIv);
    };
  }, [authorized, navigate]);

  const signOut = async () => {
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
            {desktopNotifState.permission === "granted" && (
              <div className="flex items-center gap-1 ml-4 text-xs text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Notifications active
              </div>
            )}
            {desktopNotifState.permission === "denied" && (
              <div className="flex items-center gap-1 ml-4 text-xs text-red-400">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                Notifications denied
              </div>
            )}
            {desktopNotifState.permission === "default" && (
              <div className="flex items-center gap-1 ml-4 text-xs text-yellow-400">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                Notifications: not granted
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="rounded-full px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white">View site</Link>
            <button onClick={signOut} className="rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-white">Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-6">
        {desktopNotifState.permission === "denied" && (
          <section className="rounded-3xl glass p-6 border border-red-400/30 bg-red-950/20 text-red-200">
            <div className="flex items-start gap-3">
              <div className="text-lg">⚠️</div>
              <div>
                <h3 className="font-semibold">Notifications Disabled</h3>
                <p className="mt-1 text-sm text-red-200/80">
                  Browser notifications have been denied. Check your browser settings to enable notifications for this site. You will receive real-time alerts for new visitors and downloads once enabled.
                </p>
                {desktopNotifState.lastError && (
                  <p className="mt-2 text-xs text-red-300 font-mono bg-black/30 p-2 rounded">{desktopNotifState.lastError}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {desktopNotifState.permission === "loading" && (
          <section className="rounded-3xl glass p-6 border border-blue-400/30 bg-blue-950/20 text-blue-200">
            <div className="flex items-center gap-2">
              <div className="animate-spin text-lg">⏳</div>
              <p className="text-sm">Requesting notification permission...</p>
            </div>
          </section>
        )}
        <section className="rounded-3xl glass p-8 text-white">
          <h1 className="display text-3xl">Studio Admin Dashboard</h1>
          <p className="mt-3 text-sm text-white/70">
            You are signed in using the signed admin cookie. This dashboard is protected by cookie-based admin auth only.
          </p>
        </section>

        <section className="rounded-3xl glass p-8 text-white">
          <h2 className="text-xl font-semibold">Admin tools</h2>
          <p className="mt-2 text-sm text-white/70">This admin page is available at <code className="rounded bg-white/5 px-2 py-1">/admin</code>.</p>
          {desktopNotifState.permission === "granted" && (
            <p className="mt-2 text-xs text-emerald-300">
              ✓ Desktop notifications enabled. You will receive real-time alerts for new visitors and downloads.
              {desktopNotifState.notificationCount > 0 && ` (${desktopNotifState.notificationCount} notifications sent)`}
            </p>
          )}
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
                    <th className="px-2 py-2">Actions</th>
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
                      <td className="px-2 py-2">
                        <div className="flex gap-2">
                          {d.user_id ? (
                            <button
                              onClick={async () => {
                                const ok = window.confirm('Delete user and associated data?');
                                if (!ok) return;
                                try {
                                  const res = await fetch('/api/admin/delete-user', { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ user_id: d.user_id }) });
                                  if (!res.ok) {
                                    const b = await res.json().catch(() => null);
                                    window.alert('Delete failed: ' + (b?.error || res.statusText));
                                  } else {
                                    window.alert('User deleted');
                                    setSessions((prev) => prev.filter((s: any) => s.user_id !== d.user_id));
                                    setDownloads((prev) => prev.filter((x: any) => x.user_id !== d.user_id));
                                    // notifications will be updated by hook
                                  }
                                } catch (e) { window.alert('Delete failed: ' + String(e)); }
                              }}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Delete user
                            </button>
                          ) : null}

                          <button
                            onClick={async () => {
                              const ok = window.confirm('Delete this session?');
                              if (!ok) return;
                              try {
                                const res = await fetch('/api/admin/delete-session', { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: d.session_id }) });
                                if (!res.ok) { const b = await res.json().catch(() => null); window.alert('Delete session failed: ' + (b?.error || res.statusText)); }
                                else { setSessions((prev) => prev.filter((s: any) => s.session_id !== d.session_id)); }
                              } catch (e) { window.alert('Delete session failed: ' + String(e)); }
                            }}
                            className="text-xs text-white/60 hover:text-white"
                          >
                            Delete session
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto rounded-3xl bg-white/5 p-4">
              <h3 className="text-lg font-medium">Download activity</h3>
              <div className="flex justify-end mt-2">
                <button
                  onClick={async () => {
                    const ok = window.confirm('Clear all download history? This cannot be undone.');
                    if (!ok) return;
                    try {
                      const res = await fetch('/api/admin/clear-downloads', { method: 'POST', credentials: 'include' });
                      if (!res.ok) { const b = await res.json().catch(() => null); window.alert('Clear failed: ' + (b?.error || res.statusText)); }
                      else { setDownloads([]); window.alert('Downloads cleared'); }
                    } catch (e) { window.alert('Clear failed: ' + String(e)); }
                  }}
                  className="text-xs text-white/60 hover:text-white"
                >
                  Clear downloads
                </button>
              </div>
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
                        <td className="px-2 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                const ok = window.confirm('Delete this download record?');
                                if (!ok) return;
                                try {
                                  const res = await fetch('/api/admin/delete-download', { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: d.id }) });
                                  if (!res.ok) { const b = await res.json().catch(() => null); window.alert('Delete failed: ' + (b?.error || res.statusText)); }
                                  else { setDownloads((prev) => prev.filter((x: any) => x.id !== d.id)); }
                                } catch (e) { window.alert('Delete failed: ' + String(e)); }
                              }}
                              className="text-xs text-white/60 hover:text-white"
                            >
                              Delete
                            </button>
                            {d.user_id ? (
                              <button
                                onClick={async () => {
                                  const ok = window.confirm('Delete user and associated records? This cannot be undone.');
                                  if (!ok) return;
                                  try {
                                    const res = await fetch('/api/admin/delete-user', { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ user_id: d.user_id }) });
                                    if (!res.ok) { const b = await res.json().catch(() => null); window.alert('Delete failed: ' + (b?.error || res.statusText)); }
                                    else { window.alert('User deleted'); setDownloads((prev) => prev.filter((x: any) => x.user_id !== d.user_id)); setSessions((prev) => prev.filter((s: any) => s.user_id !== d.user_id)); }
                                  } catch (e) { window.alert('Delete failed: ' + String(e)); }
                                }}
                                className="text-xs text-red-400 hover:text-red-300"
                              >
                                Delete user
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      await clearAll();
                    }}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    Clear all
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                {notifications.length === 0 && <div className="text-white/50">No notifications</div>}
                {notifications.map((note) => (
                  <div key={note.id} className={`rounded-2xl p-4 flex justify-between items-start border ${note.read ? 'border-white/10 bg-background/70' : 'border-accent/50 bg-accent/900'}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{note.type_detail === 'visitor' ? '👤' : '📥'}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-white">{note.title}</div>
                            {!note.read && <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>}
                          </div>
                          <div className="text-xs text-white/60 mt-1">{new Date(note.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/70 pl-9">
                        <div>
                          <span className="text-white/50">Session:</span>
                          <div className="font-mono text-white">{note.session_id?.slice(0, 8) || '—'}</div>
                        </div>
                        <div>
                          <span className="text-white/50">IP:</span>
                          <div className="font-mono text-white">{note.ip_address || '—'}</div>
                        </div>
                        <div>
                          <span className="text-white/50">Country:</span>
                          <div className="text-white">{note.country || '—'}</div>
                        </div>
                        <div>
                          <span className="text-white/50">Device:</span>
                          <div className="text-white">{note.device || '—'}</div>
                        </div>
                        <div>
                          <span className="text-white/50">Browser:</span>
                          <div className="text-white">{note.browser || '—'}</div>
                        </div>
                        {note.filename && (
                          <div>
                            <span className="text-white/50">File:</span>
                            <div className="text-white">{note.filename}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {!note.read && (
                        <button
                          onClick={async () => {
                            await markRead(note.id);
                          }}
                          className="text-xs text-white/60 hover:text-white whitespace-nowrap"
                          title="Mark as read"
                        >
                          ✓ Mark read
                        </button>
                      )}
                      <button
                        onClick={async () => {
                          const ok = window.confirm('Delete notification?');
                          if (!ok) return;
                          await remove(note.id);
                        }}
                        className="text-xs text-red-400 hover:text-red-300 whitespace-nowrap"
                        title="Delete this notification"
                      >
                        🗑️ Delete
                      </button>
                    </div>
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
              <p className="text-sm text-white/70">Sign out will clear the admin cookie and return you to the login page.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
