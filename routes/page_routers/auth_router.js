import express from "express"
import { getLoginPage } from "../../controllers/login_controller.js"

const router = express.Router()

router.use(express.static("./public"))

router.route("/login")
.get(getLoginPage)


export default router