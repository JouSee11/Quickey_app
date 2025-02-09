import express from "express"
import { getLoginPage, handleLogin, logoutUser } from "../../controllers/auth_controllers/login_controller.js"
import { getRegisterPage } from "../../controllers/auth_controllers/register_controller.js"
import { getRegisterSucPage } from "../../controllers/auth_controllers/register_controller.js"
import { handleRegister } from "../../controllers/auth_controllers/register_controller.js"
import registerFormValidation from "../../middleware/validate_registr_form.js"
import loginFormValidation from "../../middleware/validate_login.js"
import "../../middleware/google_sso_auth.js"
import googleCallback from "../../controllers/auth_controllers/google_sso_controller.js"
import passport from "passport"


const router = express.Router()

router.use(express.static("./public"))

router.route("/login")
.get(getLoginPage)
.post(loginFormValidation, handleLogin)

router.route("/logout")
.get(logoutUser)

router.route("/register")
.get(getRegisterPage)
.post(registerFormValidation, handleRegister)

router.route("/register/success")
.get(getRegisterSucPage)

//sso auth
router.route("/google")
    .get(passport.authenticate("google", {scope: ["email", "profile"]}))

router.route("/google/callback")
    .get(
        passport.authenticate("google", { failureRedirect: "/auth/login" }),
        googleCallback
  );


export default router