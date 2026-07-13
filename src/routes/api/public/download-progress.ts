import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getClientMeta } from "@/lib/ua";
import { resolveCountry } from "@/lib/geo";

export const runtime = "nodejs";

const PUBLIC_ARCHIVE_NAME = "LegendsofEternity.exe";
const KNOWN_PUBLIC_ARCHIVE_SIZE = 134_015_488;

function cleanNumber(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

async function updateDownload(downloadId: string | null, sessionId: string | null, data: Record<string, unknown>) {
  if (downloadId) {
    const byId = await supabaseAdmin.from("downloads").update(data).eq("id", downloadId).select("id").maybeSingle();
    if (!byId.error && byId.data?.id) return byId.data.id as string;
    if (byId.error) console.error("[Download progress] update by id failed", byId.error.message);
  }

  if (sessionId) {
    const latest = await supabaseAdmin
      .from("downloads")
      .select("id")
      .eq("session_id", sessionId)
      .eq("file_name", PUBLIC_ARCHIVE_NAME)
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!latest.error && latest.data?.id) {
      const bySession = await supabaseAdmin.from("downloads").update(data).eq("id", latest.data.id).select("id").maybeSingle();
      if (!bySession.error && bySession.data?.id) return bySession.data.id as string;
      if (bySession.error) console.error("[Download progress] update by session failed", bySession.error.message);
    }
    if (latest.error) console.error("[Download progress] lookup by session failed", latest.error.message);
  }

  return null;
}

async function insertFallbackDownload(request: Request, sessionId: string | null, data: Record<string, unknown>) {
  const meta = getClientMeta(request);
  const country = meta.country ?? (await resolveCountry(request.headers, meta.ip));
  const now = new Date().toISOString();
  const baseRecord = {
    file_name: PUBLIC_ARCHIVE_NAME,
    session_id: sessionId,
    ip: meta.ip,
    country,
    browser: meta.browser,
    os: meta.os,
    device: meta.device,
    user_agent: meta.ua,
    started_at: now,
    ...data,
  };

  let record: Record<string, unknown> = { ...baseRecord };
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const result = await supabaseAdmin.from("downloads").insert(record).select("id").maybeSingle();
    if (!result.error) return result.data?.id ?? null;

    const message = result.error.message;
    if (/downloaded_bytes|total_bytes|progress_percent|elapsed_seconds/i.test(message)) {
      delete record.downloaded_bytes;
      delete record.total_bytes;
      delete record.progress_percent;
      delete record.elapsed_seconds;
      continue;
    }
    if (/session_id|device|started_at|completed|completed_at/i.test(message)) {
      delete record.session_id;
      delete record.device;
      delete record.started_at;
      delete record.completed;
      delete record.completed_at;
      continue;
    }
    throw result.error;
  }

  return null;
}

export const Route = createFileRoute("/api/public/download-progress")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => null);
          const downloadId = typeof body?.downloadId === "string" && body.downloadId ? body.downloadId : null;
          const sessionId = typeof body?.sessionId === "string" && body.sessionId ? body.sessionId : null;
          const downloadedBytes = Math.round(cleanNumber(body?.downloadedBytes));
          const totalBytes = Math.round(cleanNumber(body?.totalBytes, KNOWN_PUBLIC_ARCHIVE_SIZE) || KNOWN_PUBLIC_ARCHIVE_SIZE);
          const elapsedSeconds = Math.round(cleanNumber(body?.elapsedSeconds));
          const completed = body?.completed === true || (totalBytes > 0 && downloadedBytes >= totalBytes);
          const progressPercent = completed
            ? 100
            : Math.max(0, Math.min(99, Math.round(cleanNumber(body?.percent) || (totalBytes > 0 ? (downloadedBytes / totalBytes) * 100 : 0))));

          const data: Record<string, unknown> = {
            downloaded_bytes: downloadedBytes,
            total_bytes: totalBytes,
            progress_percent: progressPercent,
            elapsed_seconds: elapsedSeconds,
            completed,
            ...(completed ? { completed_at: new Date().toISOString() } : {}),
          };

          let id = await updateDownload(downloadId, sessionId, data);
          if (!id) id = await insertFallbackDownload(request, sessionId, data);

          return new Response(JSON.stringify({ success: true, downloadId: id }), {
            headers: { "content-type": "application/json", "Cache-Control": "no-store" },
          });
        } catch (error) {
          console.error("[Download progress] update failed", error);
          return new Response(JSON.stringify({ success: false }), {
            status: 500,
            headers: { "content-type": "application/json", "Cache-Control": "no-store" },
          });
        }
      },
    },
  },
});
