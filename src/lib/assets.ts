import azrael from "@/assets/azrael.png.asset.json";
import background from "@/assets/background.png.asset.json";
import elysia from "@/assets/elysia.png.asset.json";
import lucas from "@/assets/lucas.png.asset.json";
import zerevok from "@/assets/zerevok.png.asset.json";

// Prefer local `public/` images when present (these are included in the build).
// Fallback to the Lovable-hosted asset URLs embedded in the .asset.json files.
export const IMG = {
  azrael: "/AZRAEL.png" || azrael.url,
  background: "/Background.png" || background.url,
  elysia: "/ELYSIA.png" || elysia.url,
  lucas: "/game1.png" || lucas.url,  // lucas.png not found; using game1.png as placeholder
  zerevok: "/ZEREVOK.png" || zerevok.url,
};
