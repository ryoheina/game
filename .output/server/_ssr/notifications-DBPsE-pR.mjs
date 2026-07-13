import { t as createMiddleware } from "./createStart-Dt05N14y.mjs";
import { f as getRequest } from "./esm-9EjmF9OT.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-DBPsE-pR.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const SUPABASE_URL = processModule.env.SUPABASE_URL;
	const SUPABASE_PUBLISHABLE_KEY = processModule.env.SUPABASE_PUBLISHABLE_KEY;
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	if (!authHeader) throw new Error("Unauthorized: No authorization header provided");
	if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized: Only Bearer tokens are supported");
	const token = authHeader.replace("Bearer ", "");
	if (!token) throw new Error("Unauthorized: No token provided");
	if (token.split(".").length !== 3) throw new Error("Unauthorized: Invalid token");
	const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: {
			fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
			headers: { Authorization: `Bearer ${token}` }
		},
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
	const { data, error } = await supabase.auth.getClaims(token);
	if (error || !data?.claims) throw new Error("Unauthorized: Invalid token");
	if (!data.claims.sub) throw new Error("Unauthorized: No user ID found in token");
	return next({ context: {
		supabase,
		userId: data.claims.sub,
		claims: data.claims
	} });
});
var countryCache = /* @__PURE__ */ new Map();
var UNKNOWN_COUNTRY_CODES = /* @__PURE__ */ new Set([
	"XX",
	"T1",
	"ZZ"
]);
function isPrivateIp$1(ip) {
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
	if (!ip || isPrivateIp$1(ip)) return null;
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
function normalizeForwardedIp(value) {
	if (!value) return null;
	let ip = value.trim();
	if (!ip) return null;
	if (ip.startsWith("[") && ip.includes("]")) ip = ip.slice(1, ip.indexOf("]"));
	if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(ip)) ip = ip.slice(0, ip.lastIndexOf(":"));
	return ip || null;
}
function isPrivateIp(ip) {
	return /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$|fc00:|fd00:|fe80:)/i.test(ip);
}
function getClientMeta(request) {
	const headers = request.headers;
	const forwardedIps = headers.get("x-forwarded-for")?.split(",").map((ip) => normalizeForwardedIp(ip)).filter(Boolean);
	const directCandidates = [
		headers.get("cf-connecting-ip"),
		headers.get("true-client-ip"),
		headers.get("x-real-ip"),
		headers.get("x-client-ip"),
		headers.get("x-vercel-forwarded-for"),
		headers.get("x-nf-client-connection-ip"),
		headers.get("fly-client-ip"),
		headers.get("fastly-client-ip"),
		headers.get("x-forwarded"),
		headers.get("forwarded")?.match(/for="?([^";,]+)"?/i)?.[1]
	].map((ip) => normalizeForwardedIp(ip)).filter(Boolean);
	const ip = directCandidates.find((candidate) => !isPrivateIp(candidate)) || forwardedIps?.find((candidate) => !isPrivateIp(candidate)) || directCandidates[0] || forwardedIps?.[0] || null;
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
function isSchemaMismatch(error) {
	const message = error && typeof error === "object" && "message" in error ? String(error.message) : String(error);
	return /column .* does not exist|schema cache|Could not find .* column/i.test(message);
}
async function insertAdminNotification(supabaseAdmin, notification) {
	const fullNotification = {
		read: false,
		delivered: false,
		...notification
	};
	const { error } = await supabaseAdmin.from("notifications").insert(fullNotification);
	if (!error) return { ok: true };
	if (!isSchemaMismatch(error)) return {
		ok: false,
		error
	};
	const fallbackPayload = {
		...notification.payload || {},
		type_detail: notification.type_detail,
		session_id: notification.session_id,
		ip_address: notification.ip_address,
		country: notification.country,
		browser: notification.browser,
		device: notification.device,
		filename: notification.filename,
		user_id: notification.user_id,
		read: notification.read ?? false
	};
	const fallback = {
		type: notification.type_detail || notification.type,
		title: notification.title,
		body: notification.body ?? null,
		payload: fallbackPayload,
		delivered: notification.delivered ?? false
	};
	const fallbackResult = await supabaseAdmin.from("notifications").insert(fallback);
	if (fallbackResult.error) return {
		ok: false,
		error: fallbackResult.error
	};
	return {
		ok: true,
		fallback: true
	};
}
//#endregion
export { resolveCountry as i, insertAdminNotification as n, requireSupabaseAuth as r, getClientMeta as t };
