import { createFileRoute } from "@tanstack/react-router";
import { clearInstallTokenCookie, getInstallTokenFromRequest } from "@/lib/install-token";
import { getClientMeta } from "@/lib/ua";
import { insertAdminNotification } from "@/lib/notifications";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isSchemaMismatch(error: any) {
  return /install_token|installed_at|schema cache|column .* does not exist|Could not find .* column/i.test(error?.message || "");
}

async function findDownloadByInstallToken(supabaseAdmin: any, token: string) {
  const byInstallToken = await supabaseAdmin
    .from("downloads")
    .select("id,session_id,file_name,install_token")
    .eq("install_token", token)
    .maybeSingle();

  if (!byInstallToken.error && byInstallToken.data) return { data: byInstallToken.data, error: null };
  if (byInstallToken.error && !isSchemaMismatch(byInstallToken.error)) return byInstallToken;

  if (!isUuid(token)) return { data: null, error: byInstallToken.error || null };
  return supabaseAdmin
    .from("downloads")
    .select("id,session_id,file_name")
    .eq("id", token)
    .maybeSingle();
}

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
          const { data: download, error: downloadError } = await findDownloadByInstallToken(supabaseAdmin, installToken);

          if (downloadError) throw downloadError;
          if (!download) return new Response("", { status: 403, headers: { "Cache-Control": "no-store" } });

          const fileName = download.file_name || requestedFileName || "LegendsofEternity.exe";
          const completedAt = new Date().toISOString();
          let updateResult = await supabaseAdmin
            .from("downloads")
            .update({ extracted: true, completed: true, completed_at: completedAt, installed_at: completedAt })
            .eq("id", download.id);
          if (updateResult.error && isSchemaMismatch(updateResult.error)) {
            updateResult = await supabaseAdmin
              .from("downloads")
              .update({ extracted: true, completed: true, completed_at: completedAt })
              .eq("id", download.id);
          }
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
