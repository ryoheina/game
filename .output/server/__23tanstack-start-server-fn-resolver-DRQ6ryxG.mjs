//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DRQ6ryxG.js
var manifest = {
	"5058339e4274bf852ada72847e61fa713d72a2a54e6e0f6d25efda66bc028b9f": {
		functionName: "getAdminStats_createServerFn_handler",
		importer: () => import("./_ssr/analytics.functions-BicD5zz7.mjs")
	},
	"5e7bc6b7985a4c5567ec29c826f97eeb7805c320edefacaaf2df3b19b86050da": {
		functionName: "trackVisit_createServerFn_handler",
		importer: () => import("./_ssr/analytics.functions-BicD5zz7.mjs")
	},
	"6d92e280c68cd3c11aac298fc57f9269dca8d85ae15c9747e0c8a8d46051fccf": {
		functionName: "getAdminStatus_createServerFn_handler",
		importer: () => import("./_ssr/analytics.functions-BicD5zz7.mjs")
	},
	"8043f9f461a2e106a6aa3ba0474234bd1598036ef6e2dc8a67dea4ff61dab955": {
		functionName: "submitContact_createServerFn_handler",
		importer: () => import("./_ssr/analytics.functions-BicD5zz7.mjs")
	},
	"abd124c618fd11979349d78fa7b5705a4311550c5a02f311710e53685f427a7f": {
		functionName: "promoteToAdmin_createServerFn_handler",
		importer: () => import("./_ssr/analytics.functions-BicD5zz7.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
