import { createFileRoute } from "@tanstack/react-router";
import { getClientMeta } from "@/lib/ua";
import { insertAdminNotification } from "@/lib/notifications";

export const Route = createFileRoute("/api/public/mark-extracted")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const sid = url.searchParams.get("sid");
          const fileName = url.searchParams.get("file");
          const meta = getClientMeta(request);

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          if (sid) {
            let q = supabaseAdmin.from("downloads").update({ extracted: true }).eq("session_id", sid);
            if (fileName) q = q.eq("file_name", fileName);
            await q;
            // record extraction event
            await supabaseAdmin.from("extractions").insert({ session_id: sid, ip: meta.ip, file_name: fileName, device: meta.device });
            await insertAdminNotification(supabaseAdmin, {
              type: "installed",
              type_detail: "installed",
              title: "Game Installed",
              session_id: sid,
              ip_address: meta.ip,
              browser: meta.browser,
              device: meta.device,
              filename: fileName,
              body: `${sid} — ${fileName ?? "unknown"}`,
              payload: { session_id: sid, ip_address: meta.ip, file_name: fileName, installed: true },
            });
          }

          return new Response(null, { status: 204 });
        } catch (e) {
          console.error("mark-extracted failed", e);
          return new Response("", { status: 500 });
        }
      },
    },
  },
});
