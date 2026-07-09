//#region node_modules/.nitro/vite/services/ssr/assets/ua-CPEkugaV.js
var countryCache = /* @__PURE__ */ new Map();
var UNKNOWN_COUNTRY_CODES = /* @__PURE__ */ new Set([
	"XX",
	"T1",
	"ZZ"
]);
function isPrivateIp(ip) {
	const normalized = ip.trim().toLowerCase();
	if (!normalized || normalized === "unknown") return true;
	if (normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
	if (/^127\.|^10\.|^192\.168\.|^169\.254\.|^0\./.test(normalized)) return true;
	const parts = normalized.split(".");
	if (parts.length === 4 && parts[0] === "172") {
		const second = Number(parts[1]);
		if (second >= 16 && second <= 31) return true;
	}
	return false;
}
function getCountryFromHeaders(headers) {
	const raw = headers.get("cf-ipcountry") || headers.get("x-vercel-ip-country") || headers.get("x-client-geo-country") || headers.get("x-appengine-country") || headers.get("x-country-code") || headers.get("cloudfront-viewer-country") || null;
	if (!raw) return null;
	const code = raw.trim().toUpperCase();
	if (!code || UNKNOWN_COUNTRY_CODES.has(code)) return null;
	return code;
}
async function lookupCountryByIp(ip) {
	if (!ip || isPrivateIp(ip)) return null;
	if (countryCache.has(ip)) return countryCache.get(ip) ?? null;
	try {
		const res = await fetch(`https://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,countryCode`, { signal: AbortSignal.timeout(2500) });
		if (!res.ok) {
			countryCache.set(ip, null);
			return null;
		}
		const data = await res.json();
		const code = data.status === "success" && data.countryCode ? data.countryCode.toUpperCase() : null;
		countryCache.set(ip, code);
		return code;
	} catch {
		countryCache.set(ip, null);
		return null;
	}
}
async function resolveCountry(headers, ip) {
	const fromHeaders = getCountryFromHeaders(headers);
	if (fromHeaders) return fromHeaders;
	if (!ip) return null;
	return lookupCountryByIp(ip);
}
function parseUA(ua) {
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
	return {
		browser,
		os,
		device
	};
}
function getClientMeta(request) {
	const headers = request.headers;
	const forwardedIps = headers.get("x-forwarded-for")?.split(",").map((ip) => ip.trim()).filter(Boolean);
	const ip = headers.get("cf-connecting-ip") || forwardedIps?.find((candidate) => !/^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$)/.test(candidate)) || forwardedIps?.[0] || headers.get("x-real-ip") || null;
	const country = getCountryFromHeaders(headers);
	const ua = headers.get("user-agent") || "";
	return {
		ip,
		country,
		ua,
		referrer: headers.get("referer") || null,
		...parseUA(ua)
	};
}
//#endregion
export { resolveCountry as n, getClientMeta as t };
