import { createFileRoute } from "@tanstack/react-router";
import { getClientMeta } from "@/lib/ua";
import { resolveCountry } from "@/lib/geo";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const PUBLIC_ARCHIVE_NAME = "LegendsofEternity.exe";
const PUBLIC_ARCHIVE_PATH = `/${encodeURIComponent(PUBLIC_ARCHIVE_NAME)}`;

export const Route = createFileRoute("/api/public/download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const meta = getClientMeta(request);
        const country = meta.country ?? (await resolveCountry(request.headers, meta.ip));
        const url = new URL(request.url);
        const sid = url.searchParams.get("sid") || null;
        const requestedFileName = url.searchParams.get("file") || PUBLIC_ARCHIVE_NAME;

        let downloadId: string | null = null;
        try {
          const now = new Date().toISOString();
          if (sid) {
            const { data: existingSession } = await supabaseAdmin
              .from("sessions")
              .select("session_id")
              .eq("session_id", sid)
              .maybeSingle();

            if (existingSession) {
              await supabaseAdmin
                .from("sessions")
                .update({
                  last_active: now,
                  ip: meta.ip,
                  country,
                  browser: meta.browser,
                  device: meta.device,
                  user_agent: meta.ua,
                  notified_left: false,
                })
                .eq("session_id", sid);
            } else {
              await supabaseAdmin.from("sessions").insert({
                session_id: sid,
                ip: meta.ip,
                country,
                browser: meta.browser,
                device: meta.device,
                user_agent: meta.ua,
                first_visit: now,
                last_active: now,
              });
            }
          }

          const { data: insertData, error: insertError } = await supabaseAdmin
            .from("downloads")
            .insert({
              file_name: requestedFileName,
              session_id: sid,
              ip: meta.ip,
              country,
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

        const archiveUrl = new URL(PUBLIC_ARCHIVE_PATH, request.url);

        try {
          const assetResponse = await fetch(archiveUrl, {
            headers: {
              Accept: "application/octet-stream, */*",
              "x-internal-download-fetch": "1",
            },
          });

          if (!assetResponse.ok || !assetResponse.body) {
            return new Response(JSON.stringify({ success: false, error: "Game file not found." }), {
              status: 404,
              headers: {
                "content-type": "application/json",
                "Cache-Control": "no-store",
              },
            });
          }

          const { readable, writable } = new TransformStream();
          const markCompleted = async () => {
            if (!downloadId) return;
            try {
              await supabaseAdmin
                .from("downloads")
                .update({ completed: true, completed_at: new Date().toISOString() })
                .eq("id", downloadId);
              await supabaseAdmin.from("notifications").insert({
                type: "download",
                type_detail: "download",
                title: "Download Complete",
                body: `${meta.ip ?? "unknown"} — ${country ?? "unknown"} — ${requestedFileName}`,
                session_id: sid,
                ip_address: meta.ip,
                country,
                browser: meta.browser,
                device: meta.device,
                filename: requestedFileName,
                payload: { download_id: downloadId, session_id: sid, file_name: requestedFileName },
                read: false,
                delivered: false,
              });
            } catch (e) {
              console.error("post-download update failed", e);
            }
          };

          void assetResponse.body
            .pipeTo(writable)
            .then(() => markCompleted())
            .catch((e) => console.error("download stream failed", e));

          const headers = new Headers({
              "Content-Type": assetResponse.headers.get("content-type") || "application/vnd.microsoft.portable-executable",
              "Content-Disposition": `attachment; filename="${requestedFileName}"`,
              "Cache-Control": "no-store",
          });
          const contentLength = assetResponse.headers.get("content-length");
          if (contentLength) headers.set("Content-Length", contentLength);

          return new Response(readable, {
            status: 200,
            headers,
          });
        } catch (error) {
          console.error("[Download] public archive request failed", {
            archiveUrl: archiveUrl.toString(),
            error,
          });
          return new Response(JSON.stringify({ success: false, error: "Game file not found." }), {
            status: 404,
            headers: {
              "content-type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        }
      },
    },
  },
});
