import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-55EBrvtc.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DZO41X7i.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics.functions-Dr04tFJr.js
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
var trackVisit = createServerFn({ method: "POST" }).validator((d) => objectType({
	sessionId: stringType().min(8).max(64),
	path: stringType().max(500)
}).parse(d)).handler(createSsrRpc("5e7bc6b7985a4c5567ec29c826f97eeb7805c320edefacaaf2df3b19b86050da"));
var submitContact = createServerFn({ method: "POST" }).validator((d) => objectType({
	name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(200),
	message: stringType().trim().min(1).max(5e3)
}).parse(d)).handler(createSsrRpc("8043f9f461a2e106a6aa3ba0474234bd1598036ef6e2dc8a67dea4ff61dab955"));
var getAdminStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6d92e280c68cd3c11aac298fc57f9269dca8d85ae15c9747e0c8a8d46051fccf"));
var promoteToAdmin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("abd124c618fd11979349d78fa7b5705a4311550c5a02f311710e53685f427a7f"));
var getAdminStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5058339e4274bf852ada72847e61fa713d72a2a54e6e0f6d25efda66bc028b9f"));
//#endregion
export { trackVisit as a, submitContact as i, getAdminStatus as n, promoteToAdmin as r, getAdminStats as t };
