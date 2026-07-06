import { createHmac } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || "";
export const ADMIN_COOKIE_NAME = "studio-admin-token";

function getAdminCookieValue() {
  return createHmac("sha256", ADMIN_PASSWORD).update("studio-admin-auth").digest("hex");
}

export function isAdminAuthorized(request: Request) {
  if (!ADMIN_PASSWORD) return false;
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(cookieHeader.split(";").map((chunk) => {
    const [name, ...rest] = chunk.trim().split("=");
    return [name, rest.join("=")];
  }));
  const cookieValue = cookies[ADMIN_COOKIE_NAME];
  const headerValue = request.headers.get("x-admin-password") || "";
  return cookieValue === getAdminCookieValue() || headerValue === ADMIN_PASSWORD;
}

export function createAdminAuthCookie() {
  const value = getAdminCookieValue();
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

export function clearAdminAuthCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=deleted; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
