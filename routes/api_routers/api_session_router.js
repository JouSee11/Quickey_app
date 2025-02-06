import express from "express"
import {sessionSaveBinding} from "../../controllers/api_controllers/api_session_controller.js"

const router = express.Router()

router.route("/save-binding")
.post(sessionSaveBinding)


export default router