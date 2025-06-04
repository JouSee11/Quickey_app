import express from "express"
import { getLoginPage, handleLogin, logoutUser } from "../../controllers/auth_controllers/login_controller.js"
import { getRegisterPage, getRegisterSucPage, getVerifyPage } from "../../controllers/auth_controllers/register_controller.js"
import { handleRegister } from "../../controllers/auth_controllers/register_controller.js"
import {registerFormValidation, createPendingUser} from "../../middleware/validate_registr_form.js"
import {verifyEmailCheck} from "../../middleware/verify_email.js"
import loginFormValidation from "../../middleware/validate_login.js"
import ssoRouter from "./sso_router.js"


const router = express.Router()

router.use(express.static("../public"))

router.route("/login")
.get(getLoginPage)
.post(loginFormValidation, handleLogin)

router.route("/logout")
.get(logoutUser)

router.route("/register")
.get(getRegisterPage)
.post(registerFormValidation, createPendingUser)
// .post(registerFormValidation, verifyEmail, handleRegister)

router.route("/register/verify")
.get(getVerifyPage)
.post(verifyEmailCheck, handleRegister)

router.route("/register/success")
.get(getRegisterSucPage)

//sso auth
router.use("/sso", ssoRouter)
// router.route("/google")
//     .get(passport.authenticate("google", {scope: ["email", "profile"]}))

// router.route("/google/callback")
//     .get(
//         passport.authenticate("google", { failureRedirect: "/auth/login" }),
//         googleCallback
//   );


export default router