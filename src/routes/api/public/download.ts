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
        const fileName = "LegendsOfEternity-v0.1.0.rar";

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("downloads").insert({
            file_name: fileName,
            ip: meta.ip,
            country: meta.country,
            browser: meta.browser,
            os: meta.os,
            user_agent: meta.ua,
          });
        } catch (e) {
          console.error("download log failed", e);
        }

        const body = buildPlaceholderRar();
        return new Response(body.buffer as ArrayBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/x-rar-compressed",
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Length": String(body.length),
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
