import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { i as resolveCountry, n as insertAdminNotification, r as requireSupabaseAuth, t as getClientMeta } from "./notifications-DBPsE-pR.mjs";
import { n as objectType, r as stringType, t as booleanType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Cesr7DTT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics.functions-DquHcGug.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var VISITOR_RETURN_WINDOW_MS = 1800 * 1e3;
function getHeaderValue(headers, names) {
	if (!headers) return null;
	for (const name of names) {
		const value = headers.get(name);
		if (value) return value;
	}
	return null;
}
function getNetworkMeta(request, country) {
	const headers = request?.headers ?? null;
	const ipCountry = getHeaderValue(headers, ["x-vercel-ip-country", "cf-ipcountry"]) || country;
	const ipCity = getHeaderValue(headers, ["x-vercel-ip-city", "cf-ipcity"]);
	const asn = getHeaderValue(headers, ["x-vercel-ip-as-number", "cf-asn"]);
	const isp = getHeaderValue(headers, ["x-vercel-ip-as-name", "cf-isp"]);
	return {
		ip_country: ipCountry,
		ip_city: ipCity ? decodeURIComponent(ipCity) : null,
		asn,
		isp
	};
}
async function recordVisit(request, data) {
	const meta = request ? getClientMeta(request) : {
		ip: null,
		country: null,
		ua: "",
		referrer: null,
		browser: "Unknown",
		os: "Unknown",
		device: "Desktop"
	};
	const country = meta.country ?? (request ? await resolveCountry(request.headers, meta.ip) : null);
	const networkMeta = getNetworkMeta(request, country);
	const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const { data: existing } = await supabaseAdmin.from("sessions").select("session_id,last_active").eq("session_id", data.sessionId).maybeSingle();
	if (existing) {
		const wasOffline = Date.now() - new Date(existing.last_active).getTime() > VISITOR_RETURN_WINDOW_MS;
		const sessionUpdate = {
			last_active: now,
			ip: meta.ip,
			country,
			browser: meta.browser,
			device: meta.device,
			user_agent: meta.ua,
			notified_left: false,
			...networkMeta
		};
		let sessionUpdateRes = await supabaseAdmin.from("sessions").update(sessionUpdate).eq("session_id", data.sessionId);
		if (sessionUpdateRes.error && /ip_country|ip_city|asn|isp|schema cache|column .* does not exist|Could not find .* column/i.test(sessionUpdateRes.error.message)) {
			const { ip_country: _ipCountry, ip_city: _ipCity, asn: _asn, isp: _isp, ...fallbackUpdate } = sessionUpdate;
			sessionUpdateRes = await supabaseAdmin.from("sessions").update(fallbackUpdate).eq("session_id", data.sessionId);
		}
		if (sessionUpdateRes.error) throw sessionUpdateRes.error;
		if (data.heartbeat) return { ok: true };
		if (wasOffline) try {
			await insertAdminNotification(supabaseAdmin, {
				type: "visitor",
				type_detail: "visitor",
				title: "Visitor Arrived",
				body: `${meta.ip ?? "unknown"} - ${country ?? "unknown"} - ${meta.device} - ${meta.browser}`,
				session_id: data.sessionId,
				ip_address: meta.ip,
				country,
				browser: meta.browser,
				device: meta.device,
				payload: {
					type_detail: "visitor",
					session_id: data.sessionId,
					ip_address: meta.ip,
					country,
					browser: meta.browser,
					device: meta.device
				},
				read: false,
				delivered: false
			});
		} catch (e) {
			console.error("notify failed", e);
		}
	} else if (data.heartbeat) return { ok: true };
	const visitRecord = {
		session_id: data.sessionId,
		path: data.path,
		ip: meta.ip,
		country,
		...networkMeta,
		browser: meta.browser,
		os: meta.os,
		device: meta.device,
		user_agent: meta.ua,
		referrer: meta.referrer
	};
	let visitInsertRes = await supabaseAdmin.from("visits").insert(visitRecord);
	if (visitInsertRes.error && /ip_country|ip_city|asn|isp|schema cache|column .* does not exist|Could not find .* column/i.test(visitInsertRes.error.message)) {
		const { ip_country: _ipCountry, ip_city: _ipCity, asn: _asn, isp: _isp, ...fallbackVisitRecord } = visitRecord;
		visitInsertRes = await supabaseAdmin.from("visits").insert(fallbackVisitRecord);
	}
	if (visitInsertRes.error) throw visitInsertRes.error;
	if (!existing) {
		const sessionRecord = {
			session_id: data.sessionId,
			ip: meta.ip,
			country,
			...networkMeta,
			browser: meta.browser,
			device: meta.device,
			user_agent: meta.ua,
			first_visit: now,
			last_active: now
		};
		let sessionInsertRes = await supabaseAdmin.from("sessions").insert(sessionRecord);
		if (sessionInsertRes.error && /ip_country|ip_city|asn|isp|schema cache|column .* does not exist|Could not find .* column/i.test(sessionInsertRes.error.message)) {
			const { ip_country: _ipCountry, ip_city: _ipCity, asn: _asn, isp: _isp, ...fallbackSessionRecord } = sessionRecord;
			sessionInsertRes = await supabaseAdmin.from("sessions").insert(fallbackSessionRecord);
		}
		if (sessionInsertRes.error) throw sessionInsertRes.error;
		try {
			await insertAdminNotification(supabaseAdmin, {
				type: "visitor",
				type_detail: "visitor",
				title: "Visitor Arrived",
				body: `${meta.ip ?? "unknown"} - ${country ?? "unknown"} - ${meta.device} - ${meta.browser}`,
				session_id: data.sessionId,
				ip_address: meta.ip,
				country,
				browser: meta.browser,
				device: meta.device,
				payload: {
					type_detail: "visitor",
					session_id: data.sessionId,
					ip_address: meta.ip,
					country,
					browser: meta.browser,
					device: meta.device
				},
				read: false,
				delivered: false
			});
		} catch (e) {
			console.error("notify failed", e);
		}
	}
	return { ok: true };
}
createServerFn({ method: "POST" }).validator((d) => objectType({
	sessionId: stringType().min(8).max(64),
	path: stringType().max(500),
	heartbeat: booleanType().optional()
}).parse(d)).handler(createSsrRpc("5e7bc6b7985a4c5567ec29c826f97eeb7805c320edefacaaf2df3b19b86050da"));
var submitContact = createServerFn({ method: "POST" }).validator((d) => objectType({
	name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(200),
	message: stringType().trim().min(1).max(5e3)
}).parse(d)).handler(createSsrRpc("8043f9f461a2e106a6aa3ba0474234bd1598036ef6e2dc8a67dea4ff61dab955"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6d92e280c68cd3c11aac298fc57f9269dca8d85ae15c9747e0c8a8d46051fccf"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("abd124c618fd11979349d78fa7b5705a4311550c5a02f311710e53685f427a7f"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5058339e4274bf852ada72847e61fa713d72a2a54e6e0f6d25efda66bc028b9f"));
//#endregion
export { submitContact as n, recordVisit as t };
