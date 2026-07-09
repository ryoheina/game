import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/mark-extracted")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const sid = url.searchParams.get("sid");
          const fileName = url.searchParams.get("file");

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          if (sid) {
            let q = supabaseAdmin.from("downloads").update({ extracted: true }).eq("session_id", sid);
            if (fileName) q = q.eq("file_name", fileName);
            await q;
            // record extraction event
            await supabaseAdmin.from("extractions").insert({ session_id: sid, file_name: fileName, device: null });
            await supabaseAdmin.from("notifications").insert({
              type: "download_extracted",
              title: "Download Extracted",
              body: `${sid} — ${fileName ?? "unknown"}`,
              payload: { session_id: sid, file_name: fileName },
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
