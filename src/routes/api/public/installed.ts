import { createFileRoute } from "@tanstack/react-router";
import { recordVisit } from "@/lib/analytics.functions";
import { getClientMeta } from "@/lib/ua";
import { insertAdminNotification } from "@/lib/notifications";

export const runtime = "nodejs";

export const Route = createFileRoute("/api/public/installed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => null);
          const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
          const fileName = typeof body?.file === "string" ? body.file.slice(0, 200) : "LegendsofEternity.exe";
          const meta = getClientMeta(request);

          if (sessionId.length < 8 || sessionId.length > 64) {
            return new Response(JSON.stringify({ success: false, error: "Invalid session" }), {
              status: 400,
              headers: { "content-type": "application/json", "Cache-Control": "no-store" },
            });
          }

          await recordVisit(request, { sessionId, path: "/installed" });

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          let updateQuery = supabaseAdmin
            .from("downloads")
            .update({ extracted: true, completed: true, completed_at: new Date().toISOString() })
            .eq("session_id", sessionId);
          if (fileName) updateQuery = updateQuery.eq("file_name", fileName);
          const updateBySession = await updateQuery;
          if (updateBySession.error) console.warn("[Installed] session download update failed", updateBySession.error.message);

          if (meta.ip) {
            let updateByIpQuery = supabaseAdmin
              .from("downloads")
              .update({ extracted: true, completed: true, completed_at: new Date().toISOString() })
              .eq("ip", meta.ip);
            if (fileName) updateByIpQuery = updateByIpQuery.eq("file_name", fileName);
            const updateByIp = await updateByIpQuery;
            if (updateByIp.error) console.warn("[Installed] ip download update failed", updateByIp.error.message);
          }

          await supabaseAdmin.from("extractions").insert({
            session_id: sessionId,
            ip: meta.ip,
            device: meta.device,
            file_name: fileName,
          });

          await insertAdminNotification(supabaseAdmin, {
            type: "installed",
            type_detail: "installed",
            title: "Game Installed",
            body: `${sessionId.slice(0, 8)} - ${fileName}`,
            session_id: sessionId,
            ip_address: meta.ip,
            country: meta.country,
            browser: meta.browser,
            device: meta.device,
            filename: fileName,
            payload: { session_id: sessionId, ip_address: meta.ip, file_name: fileName, installed: true },
            read: false,
            delivered: false,
          });

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "content-type": "application/json", "Cache-Control": "no-store" },
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
