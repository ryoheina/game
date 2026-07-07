const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.STUDIO_ADMIN_PASSWORD;
const ADMIN_COOKIE_NAME = "admin-auth-token";

function getAdminPassword() {
  return ADMIN_PASSWORD || "";
}

async function getAdminCookieValue(secret: string) {
  if (!secret) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }

  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign("HMAC", key, encoder.encode("studio-admin-auth"));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function isAdminAuthorized(request: Request) {
  const password = getAdminPassword();
  if (!password) return false;
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((chunk) => {
      const [name, ...rest] = chunk.trim().split("=");
      return [name, rest.join("=")];
    }),
  );
  const cookieValue = cookies[ADMIN_COOKIE_NAME];
  return cookieValue === (await getAdminCookieValue(password));
}

export async function createAdminAuthCookie() {
  const password = getAdminPassword();
  const value = await getAdminCookieValue(password);
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

export async function clearAdminAuthCookie() {
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=deleted; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
