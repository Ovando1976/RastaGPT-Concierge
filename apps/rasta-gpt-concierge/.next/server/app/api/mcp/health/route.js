/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/mcp/health/route";
exports.ids = ["app/api/mcp/health/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmcp%2Fhealth%2Froute&page=%2Fapi%2Fmcp%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmcp%2Fhealth%2Froute.ts&appDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmcp%2Fhealth%2Froute&page=%2Fapi%2Fmcp%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmcp%2Fhealth%2Froute.ts&appDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _workspaces_RastaGPT_Concierge_apps_rasta_gpt_concierge_app_api_mcp_health_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/mcp/health/route.ts */ \"(rsc)/./app/api/mcp/health/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/mcp/health/route\",\n        pathname: \"/api/mcp/health\",\n        filename: \"route\",\n        bundlePath: \"app/api/mcp/health/route\"\n    },\n    resolvedPagePath: \"/workspaces/RastaGPT-Concierge/apps/rasta-gpt-concierge/app/api/mcp/health/route.ts\",\n    nextConfigOutput,\n    userland: _workspaces_RastaGPT_Concierge_apps_rasta_gpt_concierge_app_api_mcp_health_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL25leHRAMTUuMC4zX0BiYWJlbCtjb3JlQDcuMjguNF9Ab3BlbnRlbGVtZXRyeSthcGlAMS45LjBfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtY3AlMkZoZWFsdGglMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRm1jcCUyRmhlYWx0aCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRm1jcCUyRmhlYWx0aCUyRnJvdXRlLnRzJmFwcERpcj0lMkZ3b3Jrc3BhY2VzJTJGUmFzdGFHUFQtQ29uY2llcmdlJTJGYXBwcyUyRnJhc3RhLWdwdC1jb25jaWVyZ2UlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRndvcmtzcGFjZXMlMkZSYXN0YUdQVC1Db25jaWVyZ2UlMkZhcHBzJTJGcmFzdGEtZ3B0LWNvbmNpZXJnZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi93b3Jrc3BhY2VzL1Jhc3RhR1BULUNvbmNpZXJnZS9hcHBzL3Jhc3RhLWdwdC1jb25jaWVyZ2UvYXBwL2FwaS9tY3AvaGVhbHRoL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tY3AvaGVhbHRoL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbWNwL2hlYWx0aFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbWNwL2hlYWx0aC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi93b3Jrc3BhY2VzL1Jhc3RhR1BULUNvbmNpZXJnZS9hcHBzL3Jhc3RhLWdwdC1jb25jaWVyZ2UvYXBwL2FwaS9tY3AvaGVhbHRoL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmcp%2Fhealth%2Froute&page=%2Fapi%2Fmcp%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmcp%2Fhealth%2Froute.ts&appDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/mcp/health/route.ts":
/*!*************************************!*\
  !*** ./app/api/mcp/health/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var _lib_mcp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/mcp */ \"(rsc)/./app/lib/mcp.ts\");\n\nconst runtime = \"nodejs\";\nasync function GET() {\n    try {\n        const res = await (0,_lib_mcp__WEBPACK_IMPORTED_MODULE_0__.invokeTool)(\"health\");\n        return Response.json({\n            connected: !!res?.ok,\n            tools: res?.tools ?? [],\n            source: \"mcp\"\n        });\n    } catch (e) {\n        // Treat any failure as disconnected; do not 5xx so UI can render a banner.\n        return Response.json({\n            connected: false,\n            tools: [],\n            error: \"unreachable\",\n            detail: e?.message ?? null,\n            source: \"mock\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21jcC9oZWFsdGgvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRXZDLE1BQU1DLFVBQVUsU0FBUztBQUV6QixlQUFlQztJQUNwQixJQUFJO1FBQ0YsTUFBTUMsTUFBTSxNQUFNSCxvREFBVUEsQ0FBaUQ7UUFDN0UsT0FBT0ksU0FBU0MsSUFBSSxDQUFDO1lBQUVDLFdBQVcsQ0FBQyxDQUFDSCxLQUFLSTtZQUFJQyxPQUFPTCxLQUFLSyxTQUFTLEVBQUU7WUFBRUMsUUFBUTtRQUFNO0lBQ3RGLEVBQUUsT0FBT0MsR0FBUTtRQUNmLDJFQUEyRTtRQUMzRSxPQUFPTixTQUFTQyxJQUFJLENBQUM7WUFBRUMsV0FBVztZQUFPRSxPQUFPLEVBQUU7WUFBRUcsT0FBTztZQUFlQyxRQUFRRixHQUFHRyxXQUFXO1lBQU1KLFFBQVE7UUFBTztJQUN2SDtBQUNGIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9SYXN0YUdQVC1Db25jaWVyZ2UvYXBwcy9yYXN0YS1ncHQtY29uY2llcmdlL2FwcC9hcGkvbWNwL2hlYWx0aC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbnZva2VUb29sIH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9tY3BcIjtcblxuZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSBcIm5vZGVqc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGludm9rZVRvb2w8eyBvazogYm9vbGVhbjsgbmFtZTogc3RyaW5nOyB0b29sczogc3RyaW5nW10gfT4oXCJoZWFsdGhcIik7XG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBjb25uZWN0ZWQ6ICEhcmVzPy5vaywgdG9vbHM6IHJlcz8udG9vbHMgPz8gW10sIHNvdXJjZTogXCJtY3BcIiB9KTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgLy8gVHJlYXQgYW55IGZhaWx1cmUgYXMgZGlzY29ubmVjdGVkOyBkbyBub3QgNXh4IHNvIFVJIGNhbiByZW5kZXIgYSBiYW5uZXIuXG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBjb25uZWN0ZWQ6IGZhbHNlLCB0b29sczogW10sIGVycm9yOiBcInVucmVhY2hhYmxlXCIsIGRldGFpbDogZT8ubWVzc2FnZSA/PyBudWxsLCBzb3VyY2U6IFwibW9ja1wiIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbImludm9rZVRvb2wiLCJydW50aW1lIiwiR0VUIiwicmVzIiwiUmVzcG9uc2UiLCJqc29uIiwiY29ubmVjdGVkIiwib2siLCJ0b29scyIsInNvdXJjZSIsImUiLCJlcnJvciIsImRldGFpbCIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/mcp/health/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/mcp.ts":
/*!************************!*\
  !*** ./app/lib/mcp.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   invokeTool: () => (/* binding */ invokeTool)\n/* harmony export */ });\nconst MCP_BASE_URL = process.env.MCP_BASE_URL || \"http://127.0.0.1:3333\";\n/**\n * Calls an MCP tool over SSE HTTP bridge exposed by make_sse_app(app).\n * We POST to /sse/tools/invoke with { name, arguments }.\n * If your server exposes a slightly different path, adjust PATH below.\n */ const PATH = \"/sse/tools/invoke\";\nasync function invokeTool(name, args, init) {\n    const url = MCP_BASE_URL.replace(/\\/$/, \"\") + PATH;\n    const res = await fetch(url, {\n        method: \"POST\",\n        headers: {\n            \"content-type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            name,\n            arguments: args\n        }),\n        // ensure server-side request from Next API route\n        cache: \"no-store\",\n        ...init\n    });\n    if (!res.ok) {\n        const text = await res.text().catch(()=>\"\");\n        throw new Error(`MCP ${name} ${res.status}: ${text || res.statusText}`);\n    }\n    // The SSE bridge returns JSON results (FastMCP tools return JSON-serializable)\n    const json = await res.json();\n    return json;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL21jcC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsZUFBZUMsUUFBUUMsR0FBRyxDQUFDRixZQUFZLElBQUk7QUFFakQ7Ozs7Q0FJQyxHQUNELE1BQU1HLE9BQU87QUFPTixlQUFlQyxXQUNwQkMsSUFBWSxFQUNaQyxJQUE4QixFQUM5QkMsSUFBa0I7SUFFbEIsTUFBTUMsTUFBTVIsYUFBYVMsT0FBTyxDQUFDLE9BQU8sTUFBTU47SUFDOUMsTUFBTU8sTUFBTSxNQUFNQyxNQUFNSCxLQUFLO1FBQzNCSSxRQUFRO1FBQ1JDLFNBQVM7WUFBRSxnQkFBZ0I7UUFBbUI7UUFDOUNDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUFFWDtZQUFNWSxXQUFXWDtRQUFLO1FBQzdDLGlEQUFpRDtRQUNqRFksT0FBTztRQUNQLEdBQUdYLElBQUk7SUFDVDtJQUNBLElBQUksQ0FBQ0csSUFBSVMsRUFBRSxFQUFFO1FBQ1gsTUFBTUMsT0FBTyxNQUFNVixJQUFJVSxJQUFJLEdBQUdDLEtBQUssQ0FBQyxJQUFNO1FBQzFDLE1BQU0sSUFBSUMsTUFBTSxDQUFDLElBQUksRUFBRWpCLEtBQUssQ0FBQyxFQUFFSyxJQUFJYSxNQUFNLENBQUMsRUFBRSxFQUFFSCxRQUFRVixJQUFJYyxVQUFVLEVBQUU7SUFDeEU7SUFDQSwrRUFBK0U7SUFDL0UsTUFBTUMsT0FBUSxNQUFNZixJQUFJZSxJQUFJO0lBQzVCLE9BQU9BO0FBQ1QiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL1Jhc3RhR1BULUNvbmNpZXJnZS9hcHBzL3Jhc3RhLWdwdC1jb25jaWVyZ2UvYXBwL2xpYi9tY3AudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTUNQX0JBU0VfVVJMID0gcHJvY2Vzcy5lbnYuTUNQX0JBU0VfVVJMIHx8IFwiaHR0cDovLzEyNy4wLjAuMTozMzMzXCI7XG5cbi8qKlxuICogQ2FsbHMgYW4gTUNQIHRvb2wgb3ZlciBTU0UgSFRUUCBicmlkZ2UgZXhwb3NlZCBieSBtYWtlX3NzZV9hcHAoYXBwKS5cbiAqIFdlIFBPU1QgdG8gL3NzZS90b29scy9pbnZva2Ugd2l0aCB7IG5hbWUsIGFyZ3VtZW50cyB9LlxuICogSWYgeW91ciBzZXJ2ZXIgZXhwb3NlcyBhIHNsaWdodGx5IGRpZmZlcmVudCBwYXRoLCBhZGp1c3QgUEFUSCBiZWxvdy5cbiAqL1xuY29uc3QgUEFUSCA9IFwiL3NzZS90b29scy9pbnZva2VcIjtcblxudHlwZSBNQ1BJbnZva2VCb2R5ID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGFyZ3VtZW50cz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGludm9rZVRvb2w8VCA9IGFueT4oXG4gIG5hbWU6IHN0cmluZyxcbiAgYXJncz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICBpbml0PzogUmVxdWVzdEluaXRcbik6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBNQ1BfQkFTRV9VUkwucmVwbGFjZSgvXFwvJC8sIFwiXCIpICsgUEFUSDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBuYW1lLCBhcmd1bWVudHM6IGFyZ3MgfSBhcyBNQ1BJbnZva2VCb2R5KSxcbiAgICAvLyBlbnN1cmUgc2VydmVyLXNpZGUgcmVxdWVzdCBmcm9tIE5leHQgQVBJIHJvdXRlXG4gICAgY2FjaGU6IFwibm8tc3RvcmVcIixcbiAgICAuLi5pbml0LFxuICB9KTtcbiAgaWYgKCFyZXMub2spIHtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzLnRleHQoKS5jYXRjaCgoKSA9PiBcIlwiKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1DUCAke25hbWV9ICR7cmVzLnN0YXR1c306ICR7dGV4dCB8fCByZXMuc3RhdHVzVGV4dH1gKTtcbiAgfVxuICAvLyBUaGUgU1NFIGJyaWRnZSByZXR1cm5zIEpTT04gcmVzdWx0cyAoRmFzdE1DUCB0b29scyByZXR1cm4gSlNPTi1zZXJpYWxpemFibGUpXG4gIGNvbnN0IGpzb24gPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgVDtcbiAgcmV0dXJuIGpzb247XG59Il0sIm5hbWVzIjpbIk1DUF9CQVNFX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJQQVRIIiwiaW52b2tlVG9vbCIsIm5hbWUiLCJhcmdzIiwiaW5pdCIsInVybCIsInJlcGxhY2UiLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFyZ3VtZW50cyIsImNhY2hlIiwib2siLCJ0ZXh0IiwiY2F0Y2giLCJFcnJvciIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJqc29uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/mcp.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/@opentelemetry+api@1.9.0"], () => (__webpack_exec__("(rsc)/../../node_modules/.pnpm/next@15.0.3_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fmcp%2Fhealth%2Froute&page=%2Fapi%2Fmcp%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmcp%2Fhealth%2Froute.ts&appDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FRastaGPT-Concierge%2Fapps%2Frasta-gpt-concierge&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();