import { createFileRoute } from "@tanstack/react-router";
import { recordVisit } from "@/lib/analytics.functions";
import { clearInstallTokenCookie, getInstallTokenFromRequest } from "@/lib/install-token";
import { getClientMeta } from "@/lib/ua";
import { insertAdminNotification } from "@/lib/notifications";

export const runtime = "nodejs";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isSchemaMismatch(error: any) {
  return /install_token|installed_at|schema cache|column .* does not exist|Could not find .* column/i.test(error?.message || "");
}

async function findDownloadByInstallToken(supabaseAdmin: any, token: string) {
  const byInstallToken = await supabaseAdmin
    .from("downloads")
    .select("id,session_id,ip,file_name,install_token")
    .eq("install_token", token)
    .maybeSingle();

  if (!byInstallToken.error && byInstallToken.data) return { data: byInstallToken.data, error: null };
  if (byInstallToken.error && !isSchemaMismatch(byInstallToken.error)) return byInstallToken;

  if (!isUuid(token)) return { data: null, error: byInstallToken.error || null };
  return supabaseAdmin
    .from("downloads")
    .select("id,session_id,ip,file_name")
    .eq("id", token)
    .maybeSingle();
}

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
          const { data: download, error: downloadError } = await findDownloadByInstallToken(supabaseAdmin, installToken);

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

          const installedAt = new Date().toISOString();
          let updateByToken = await supabaseAdmin
            .from("downloads")
            .update({ extracted: true, completed: true, completed_at: installedAt, installed_at: installedAt })
            .eq("id", download.id);
          if (updateByToken.error && isSchemaMismatch(updateByToken.error)) {
            updateByToken = await supabaseAdmin
              .from("downloads")
              .update({ extracted: true, completed: true, completed_at: installedAt })
              .eq("id", download.id);
          }
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
