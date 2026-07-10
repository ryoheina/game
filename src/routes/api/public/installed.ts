import { createFileRoute } from "@tanstack/react-router";
import { recordVisit } from "@/lib/analytics.functions";
import { clearInstallTokenCookie, getInstallTokenFromRequest } from "@/lib/install-token";
import { getClientMeta } from "@/lib/ua";
import { insertAdminNotification } from "@/lib/notifications";

export const runtime = "nodejs";

export const Route = createFileRoute("/api/public/installed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => null);
          const fileName = typeof body?.file === "string" ? body.file.slice(0, 200) : "LegendsofEternity.exe";
          const meta = getClientMeta(request);
          const installToken = getInstallTokenFromRequest(request, body?.token);

          if (!installToken) {
            return new Response(JSON.stringify({ success: false, error: "Install token required" }), {
              status: 403,
              headers: { "content-type": "application/json", "Cache-Control": "no-store" },
            });
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: download, error: downloadError } = await supabaseAdmin
            .from("downloads")
            .select("id,session_id,ip,file_name,install_token")
            .eq("install_token", installToken)
            .maybeSingle();

          if (downloadError) throw downloadError;
          if (!download) {
            return new Response(JSON.stringify({ success: false, error: "Invalid install token" }), {
              status: 403,
              headers: { "content-type": "application/json", "Cache-Control": "no-store" },
            });
          }

          const sessionId = download.session_id;
          const installedFileName = download.file_name || fileName;
          if (sessionId) await recordVisit(request, { sessionId, path: "/installed" });

          const updateByToken = await supabaseAdmin
            .from("downloads")
            .update({ extracted: true, completed: true, completed_at: new Date().toISOString(), installed_at: new Date().toISOString() })
            .eq("id", download.id);
          if (updateByToken.error) throw updateByToken.error;

          await supabaseAdmin.from("extractions").insert({
            download_id: download.id,
            session_id: sessionId,
            ip: meta.ip,
            device: meta.device,
            file_name: installedFileName,
          });

          await insertAdminNotification(supabaseAdmin, {
            type: "installed",
            type_detail: "installed",
            title: "Game Installed",
            body: `${sessionId ? sessionId.slice(0, 8) : "unknown"} - ${installedFileName}`,
            session_id: sessionId,
            ip_address: meta.ip,
            country: meta.country,
            browser: meta.browser,
            device: meta.device,
            filename: installedFileName,
            payload: { download_id: download.id, session_id: sessionId, ip_address: meta.ip, file_name: installedFileName, installed: true },
            read: false,
            delivered: false,
          });

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "content-type": "application/json", "Cache-Control": "no-store", "Set-Cookie": clearInstallTokenCookie() },
          });
        } catch (error) {
          console.error("[Installed] tracking failed", error);
          return new Response(JSON.stringify({ success: false }), {
            status: 500,
            headers: { "content-type": "application/json", "Cache-Control": "no-store" },
          });
        }
      },
    },
  },
});
