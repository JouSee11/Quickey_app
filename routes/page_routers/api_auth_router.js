import express from "express"
import {checkUniqueUsername, checkUniqueEmail} from "../../controllers/api_auth_controller.js"


const router = express.Router()

router.route("/unique-username")
.post(checkUniqueUsername)

router.route("/unique-email")
.post(checkUniqueEmail)

export default router