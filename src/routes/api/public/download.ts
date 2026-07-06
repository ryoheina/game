import { createFileRoute } from "@tanstack/react-router";
import { getClientMeta } from "@/lib/ua";

// Minimal valid RAR5 signature so browsers accept it as a real archive.
// (Not a real archive payload — placeholder while the game build is not shipped.)
const RAR5_SIG = new Uint8Array([0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x01, 0x00]);

function buildPlaceholderRar(): Uint8Array {
  const readme = new TextEncoder().encode(
    "Legends of Eternity — build placeholder.\nReplace this server route with a real archive stream in production.\n",
  );
  const out = new Uint8Array(RAR5_SIG.length + readme.length);
  out.set(RAR5_SIG, 0);
  out.set(readme, RAR5_SIG.length);
  return out;
}

export const Route = createFileRoute("/api/public/download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const meta = getClientMeta(request);
        const url = new URL(request.url);
        const sid = url.searchParams.get("sid") || null;
        const fileName = url.searchParams.get("file") || "3D Game.rar";

        let downloadId: string | null = null;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const now = new Date().toISOString();
          const { data: insertData, error: insertError } = await supabaseAdmin
            .from("downloads")
            .insert({
              file_name: fileName,
              session_id: sid,
              ip: meta.ip,
              country: meta.country,
              browser: meta.browser,
              os: meta.os,
              device: meta.device,
              user_agent: meta.ua,
              extracted: false,
              started_at: now,
            })
            .select("id")
            .maybeSingle();
          if (insertError) throw insertError;
          downloadId = insertData?.id || null;
        } catch (e) {
          console.error("download log failed", e);
        }

        // Attempt to stream a static file from the public directory if present,
        // otherwise fall back to the placeholder rar used during development.
        try {
          // In a deployed server environment the public folder may be available
          // relative to the server's working directory under "public".
          const fs = await import("fs/promises");
          const path = `public/${fileName}`;
          const data = await fs.readFile(path);
          try {
            if (downloadId) {
              const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
              await supabaseAdmin.from("downloads").update({ completed: true, completed_at: new Date().toISOString() }).eq("id", downloadId);
              await supabaseAdmin.from("notifications").insert({ type: "download_complete", title: "Download Complete", body: `${meta.ip ?? 'unknown'} — ${fileName}`, payload: { download_id: downloadId, session_id: sid } });
            }
          } catch (e) {
            console.error('post-download update failed', e);
          }

          return new Response(data.buffer as ArrayBuffer, {
            status: 200,
            headers: {
              "Content-Type": "application/octet-stream",
              "Content-Disposition": `attachment; filename="${fileName}"`,
              "Content-Length": String(data.byteLength),
              "Cache-Control": "no-store",
            },
          });
        } catch (e) {
          const body = buildPlaceholderRar();
          try {
            if (downloadId) {
              const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
              await supabaseAdmin.from("downloads").update({ completed: true, completed_at: new Date().toISOString() }).eq("id", downloadId);
              await supabaseAdmin.from("notifications").insert({ type: "download_complete", title: "Download Complete (placeholder)", body: `${meta.ip ?? 'unknown'} — ${fileName}`, payload: { download_id: downloadId, session_id: sid } });
            }
          } catch (e) {
            console.error('post-download update failed', e);
          }

          return new Response(body.buffer as ArrayBuffer, {
            status: 200,
            headers: {
              "Content-Type": "application/x-rar-compressed",
              "Content-Disposition": `attachment; filename="${fileName}"`,
              "Content-Length": String(body.length),
              "Cache-Control": "no-store",
            },
          });
        }
      },
    },
  },
});
