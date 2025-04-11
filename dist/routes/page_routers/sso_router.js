"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../../middleware/google_sso_auth.js");
require("../../middleware/github_sso_auth.js");
const google_sso_controller_js_1 = __importDefault(require("../../controllers/auth_controllers/google_sso_controller.js"));
const github_sso_controller_js_1 = __importDefault(require("../../controllers/auth_controllers/github_sso_controller.js"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// google auth
router.route("/google")
    .get(passport_1.default.authenticate("google", { scope: ["email", "profile"], prompt: "select_account" }));
router.route("/google/callback")
    .get(passport_1.default.authenticate("google", { failureRedirect: "/auth/login" }), google_sso_controller_js_1.default);
// github auth
router.route("/github")
    .get(passport_1.default.authenticate("github", { scope: ["user:email"] }));
router.route("/github/callback")
    .get(passport_1.default.authenticate("github", { failureRedirect: "/auth/login" }), github_sso_controller_js_1.default);
exports.default = router;
