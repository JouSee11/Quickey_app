import express from "express"
import {getSavesDefault} from "../../controllers/api_controllers/api_profile_controller.js"

const router = express.Router()

router.route("/get-default")
.get(getSavesDefault)


export default router