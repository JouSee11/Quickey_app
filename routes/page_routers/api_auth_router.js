import express from "express"
import {checkUniqueUsername} from "../../controllers/api_auth_controller.js"


const router = express.Router()

router.route("/unique-username")
.get(checkUniqueUsername)


export default router