import { createFileRoute } from "@tanstack/react-router";
import { getClientMeta } from "@/lib/ua";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const meta = getClientMeta(request);
        const url = new URL(request.url);
        const sid = url.searchParams.get("sid") || null;
        const fileName = url.searchParams.get("file") || "3D Game.rar";
        const storageObjectPath = fileName.replace(/^\/+/, "");
        const candidateBuckets = [
          process.env.SUPABASE_STORAGE_BUCKET,
          process.env.VITE_SUPABASE_STORAGE_BUCKET,
          "downloads",
          "public",
          "game-builds",
          "game",
        ].filter((value): value is string => Boolean(value));

        let downloadId: string | null = null;
        try {
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

        let archiveBlob: Blob | null = null;
        let storageError: unknown = null;
        let usedBucket: string | null = null;

        for (const bucketName of candidateBuckets) {
          try {
            const { data, error } = await supabaseAdmin.storage.from(bucketName).download(storageObjectPath);
            if (!error && data) {
              archiveBlob = data;
              usedBucket = bucketName;
              break;
            }
            storageError = error ?? new Error("No archive returned from storage");
          } catch (e) {
            storageError = e;
          }
        }

        if (!archiveBlob) {
          console.error("[Download] Supabase Storage download failed", {
            buckets: candidateBuckets,
            objectPath: storageObjectPath,
            fileName,
            error: storageError,
          });
          return new Response(JSON.stringify({ success: false, error: "Archive not found" }), {
            status: 404,
            headers: {
              "content-type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        }

        try {
          if (downloadId) {
            await supabaseAdmin.from("downloads").update({ completed: true, completed_at: new Date().toISOString() }).eq("id", downloadId);
            await supabaseAdmin.from("notifications").insert({ type: "download_complete", title: "Download Complete", body: `${meta.ip ?? "unknown"} — ${fileName}`, payload: { download_id: downloadId, session_id: sid } });
          }
        } catch (e) {
          console.error("post-download update failed", e);
        }

        return new Response(archiveBlob, {
          status: 200,
          headers: {
            "Content-Type": "application/x-rar-compressed",
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Length": String(archiveBlob.size),
            "Cache-Control": "no-store",
            "X-Storage-Bucket": usedBucket ?? "",
          },
        });
      },
    },
  },
});
