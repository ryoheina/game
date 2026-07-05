import { f as getRequest, i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DZO41X7i.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as getClientMeta } from "./ua-VZAcffKf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics.functions-B5he0NS3.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var trackVisit_createServerFn_handler = createServerRpc({
	id: "5e7bc6b7985a4c5567ec29c826f97eeb7805c320edefacaaf2df3b19b86050da",
	name: "trackVisit",
	filename: "src/lib/analytics.functions.ts"
}, (opts) => trackVisit.__executeServer(opts));
var trackVisit = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	sessionId: stringType().min(8).max(64),
	path: stringType().max(500)
}).parse(d)).handler(trackVisit_createServerFn_handler, async ({ data }) => {
	const req = getRequest();
	const meta = req ? getClientMeta(req) : {
		ip: null,
		country: null,
		ua: "",
		referrer: null,
		browser: "Unknown",
		os: "Unknown",
		device: "Desktop"
	};
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	await supabaseAdmin.from("visits").insert({
		session_id: data.sessionId,
		path: data.path,
		ip: meta.ip,
		country: meta.country,
		browser: meta.browser,
		os: meta.os,
		device: meta.device,
		user_agent: meta.ua,
		referrer: meta.referrer
	});
	return { ok: true };
});
var submitContact_createServerFn_handler = createServerRpc({
	id: "8043f9f461a2e106a6aa3ba0474234bd1598036ef6e2dc8a67dea4ff61dab955",
	name: "submitContact",
	filename: "src/lib/analytics.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(200),
	message: stringType().trim().min(1).max(5e3)
}).parse(d)).handler(submitContact_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { error } = await supabaseAdmin.from("contact_messages").insert(data);
	if (error) throw new Error("Could not save your message");
	return { ok: true };
});
var getAdminStats_createServerFn_handler = createServerRpc({
	id: "5058339e4274bf852ada72847e61fa713d72a2a54e6e0f6d25efda66bc028b9f",
	name: "getAdminStats",
	filename: "src/lib/analytics.functions.ts"
}, (opts) => getAdminStats.__executeServer(opts));
var getAdminStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminStats_createServerFn_handler, async ({ context }) => {
	const { data: roleRow, error } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (error || !roleRow) throw new Error("Forbidden");
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const since24h = (/* @__PURE__ */ new Date(Date.now() - 24 * 36e5)).toISOString();
	const since5m = (/* @__PURE__ */ new Date(Date.now() - 5 * 6e4)).toISOString();
	const sinceToday = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)).toISOString();
	const [visitsTotal, visitsToday, onlineNow, downloadsTotal, recentVisits, recentDownloads, byCountry, byBrowser, byOs, traffic24h, messages] = await Promise.all([
		supabaseAdmin.from("visits").select("*", {
			count: "exact",
			head: true
		}),
		supabaseAdmin.from("visits").select("*", {
			count: "exact",
			head: true
		}).gte("created_at", sinceToday),
		supabaseAdmin.from("visits").select("session_id", { count: "exact" }).gte("created_at", since5m),
		supabaseAdmin.from("downloads").select("*", {
			count: "exact",
			head: true
		}),
		supabaseAdmin.from("visits").select("*").order("created_at", { ascending: false }).limit(15),
		supabaseAdmin.from("downloads").select("*").order("created_at", { ascending: false }).limit(15),
		supabaseAdmin.from("visits").select("country").gte("created_at", since24h),
		supabaseAdmin.from("visits").select("browser").gte("created_at", since24h),
		supabaseAdmin.from("visits").select("os").gte("created_at", since24h),
		supabaseAdmin.from("visits").select("created_at").gte("created_at", since24h),
		supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(10)
	]);
	const tally = (rows, key) => {
		const m = {};
		(rows || []).forEach((r) => {
			const v = r[key] || "Unknown";
			m[v] = (m[v] || 0) + 1;
		});
		return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, value]) => ({
			name,
			value
		}));
	};
	const hourly = new Array(24).fill(0).map((_, i) => ({
		hour: i,
		visits: 0
	}));
	(traffic24h.data || []).forEach((r) => {
		const h = new Date(r.created_at).getHours();
		hourly[h].visits++;
	});
	const uniqueOnline = new Set((onlineNow.data || []).map((r) => r.session_id)).size;
	return {
		totals: {
			visits: visitsTotal.count || 0,
			today: visitsToday.count || 0,
			online: uniqueOnline,
			downloads: downloadsTotal.count || 0
		},
		recentVisits: recentVisits.data || [],
		recentDownloads: recentDownloads.data || [],
		byCountry: tally(byCountry.data, "country"),
		byBrowser: tally(byBrowser.data, "browser"),
		byOs: tally(byOs.data, "os"),
		hourly,
		messages: messages.data || []
	};
});
//#endregion
export { getAdminStats_createServerFn_handler, submitContact_createServerFn_handler, trackVisit_createServerFn_handler };
