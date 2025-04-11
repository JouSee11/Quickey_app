"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_js_1 = __importDefault(require("./page_routers/auth_router.js"));
const discover_router_js_1 = __importDefault(require("./page_routers/discover_router.js"));
const home_binding_controller_js_1 = require("../controllers/home_binding_controller.js");
const profile_router_js_1 = __importDefault(require("./page_routers/profile_router.js"));
const api_auth_router_js_1 = __importDefault(require("./api_routers/api_auth_router.js"));
const api_session_router_js_1 = __importDefault(require("./api_routers/api_session_router.js"));
const api_key_binding_router_js_1 = __importDefault(require("./api_routers/api_key_binding_router.js"));
const api_profile_router_js_1 = __importDefault(require("./api_routers/api_profile_router.js"));
const not_found_controller_js_1 = __importDefault(require("../controllers/not_found_controller.js"));
const router = express_1.default.Router();
router.route("/")
    .get(home_binding_controller_js_1.getBindingPage);
//routes for login
router.use("/auth", auth_router_js_1.default);
//profile router
router.use("/profile", profile_router_js_1.default);
//routes for discover
router.use("/discover", discover_router_js_1.default);
//routes for api
router.use("/api/auth", api_auth_router_js_1.default);
//routes for session
router.use("/api/session", api_session_router_js_1.default);
//routes for key bindings
router.use("/api/key-binding", api_key_binding_router_js_1.default);
//routes for profile api
router.use("/api/profile", api_profile_router_js_1.default);
// 404 error for all unused routes
router.use(not_found_controller_js_1.default);
exports.default = router;
