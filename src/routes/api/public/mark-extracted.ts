import { createFileRoute } from "@tanstack/react-router";
import { clearInstallTokenCookie, getInstallTokenFromRequest } from "@/lib/install-token";
import { getClientMeta } from "@/lib/ua";
import { insertAdminNotification } from "@/lib/notifications";

export const Route = createFileRoute("/api/public/mark-extracted")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const requestedFileName = url.searchParams.get("file");
          const installToken = getInstallTokenFromRequest(request, url.searchParams.get("token"));

          if (!installToken) {
            return new Response("", { status: 403, headers: { "Cache-Control": "no-store" } });
          }

          const meta = getClientMeta(request);
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: download, error: downloadError } = await supabaseAdmin
            .from("downloads")
            .select("id,session_id,file_name,install_token")
            .eq("install_token", installToken)
            .maybeSingle();

          if (downloadError) throw downloadError;
          if (!download) return new Response("", { status: 403, headers: { "Cache-Control": "no-store" } });

          const fileName = download.file_name || requestedFileName || "LegendsofEternity.exe";
          const completedAt = new Date().toISOString();
          const updateResult = await supabaseAdmin
            .from("downloads")
            .update({ extracted: true, completed: true, completed_at: completedAt, installed_at: completedAt })
            .eq("id", download.id);
          if (updateResult.error) throw updateResult.error;

          await supabaseAdmin.from("extractions").insert({
            download_id: download.id,
            session_id: download.session_id,
            ip: meta.ip,
            file_name: fileName,
            device: meta.device,
          });

          await insertAdminNotification(supabaseAdmin, {
            type: "installed",
            type_detail: "installed",
            title: "Game Installed",
            session_id: download.session_id,
            ip_address: meta.ip,
            browser: meta.browser,
            device: meta.device,
            filename: fileName,
            body: `${download.session_id ? download.session_id.slice(0, 8) : "unknown"} - ${fileName}`,
            payload: { download_id: download.id, session_id: download.session_id, ip_address: meta.ip, file_name: fileName, installed: true },
            read: false,
            delivered: false,
          });

          return new Response(null, {
            status: 204,
            headers: { "Cache-Control": "no-store", "Set-Cookie": clearInstallTokenCookie() },
          });
        } catch (e) {
          console.error("mark-extracted failed", e);
          return new Response("", { status: 500, headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});
