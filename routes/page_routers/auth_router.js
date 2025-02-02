import express from "express"
import { getLoginPage } from "../../controllers/login_controller.js"
import { getRegisterPage } from "../../controllers/register_controller.js"
import { handleRegister } from "../../controllers/register_controller.js"
import registerFormValidation from "../../middleware/validate_registr_form.js"


const router = express.Router()

router.use(express.static("./public"))

router.route("/login")
.get(getLoginPage)

router.route("/register")
.get(getRegisterPage)
.post(registerFormValidation ,handleRegister)

export default router