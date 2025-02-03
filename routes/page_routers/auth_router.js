import express from "express"
import { getLoginPage, handleLogin, logoutUser } from "../../controllers/login_controller.js"
import { getRegisterPage } from "../../controllers/register_controller.js"
import { getRegisterSucPage } from "../../controllers/register_controller.js"
import { handleRegister } from "../../controllers/register_controller.js"
import registerFormValidation from "../../middleware/validate_registr_form.js"
import loginFormValidation from "../../middleware/validate_login.js"


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

export default router