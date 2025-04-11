"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_js_1 = require("../../controllers/auth_controllers/login_controller.js");
const register_controller_js_1 = require("../../controllers/auth_controllers/register_controller.js");
const register_controller_js_2 = require("../../controllers/auth_controllers/register_controller.js");
const validate_registr_form_js_1 = require("../../middleware/validate_registr_form.js");
const verify_email_js_1 = require("../../middleware/verify_email.js");
const validate_login_js_1 = __importDefault(require("../../middleware/validate_login.js"));
const sso_router_js_1 = __importDefault(require("./sso_router.js"));
const router = express_1.default.Router();
router.use(express_1.default.static("./public"));
router.route("/login")
    .get(login_controller_js_1.getLoginPage)
    .post(validate_login_js_1.default, login_controller_js_1.handleLogin);
router.route("/logout")
    .get(login_controller_js_1.logoutUser);
router.route("/register")
    .get(register_controller_js_1.getRegisterPage)
    .post(validate_registr_form_js_1.registerFormValidation, validate_registr_form_js_1.createPendingUser);
// .post(registerFormValidation, verifyEmail, handleRegister)
router.route("/register/verify")
    .get(register_controller_js_1.getVerifyPage)
    .post(verify_email_js_1.verifyEmailCheck, register_controller_js_2.handleRegister);
router.route("/register/success")
    .get(register_controller_js_1.getRegisterSucPage);
//sso auth
router.use("/sso", sso_router_js_1.default);
// router.route("/google")
//     .get(passport.authenticate("google", {scope: ["email", "profile"]}))
// router.route("/google/callback")
//     .get(
//         passport.authenticate("google", { failureRedirect: "/auth/login" }),
//         googleCallback
//   );
exports.default = router;
