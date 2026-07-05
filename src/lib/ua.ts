export function parseUA(ua: string | null | undefined) {
  const u = (ua || "").toLowerCase();
  let browser = "Unknown";
  if (u.includes("edg/")) browser = "Edge";
  else if (u.includes("chrome/") && !u.includes("chromium")) browser = "Chrome";
  else if (u.includes("firefox/")) browser = "Firefox";
  else if (u.includes("safari/") && !u.includes("chrome")) browser = "Safari";
  else if (u.includes("opr/") || u.includes("opera")) browser = "Opera";

  let os = "Unknown";
  if (u.includes("windows")) os = "Windows";
  else if (u.includes("mac os") || u.includes("macintosh")) os = "macOS";
  else if (u.includes("android")) os = "Android";
  else if (u.includes("iphone") || u.includes("ipad") || u.includes("ios")) os = "iOS";
  else if (u.includes("linux")) os = "Linux";

  let device = "Desktop";
  if (u.includes("mobile") || u.includes("iphone") || u.includes("android")) device = "Mobile";
  else if (u.includes("tablet") || u.includes("ipad")) device = "Tablet";

  return { browser, os, device };
}

export function getClientMeta(request: Request) {
  const headers = request.headers;
  const ip =
    headers.get("cf-connecting-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null;
  const country = headers.get("cf-ipcountry") || null;
  const ua = headers.get("user-agent") || "";
  const referrer = headers.get("referer") || null;
  const parsed = parseUA(ua);
  return { ip, country, ua, referrer, ...parsed };
}
