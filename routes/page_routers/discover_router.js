import express from "express"
import { getDiscoverPage } from "../../controllers/discover_controller.js"

const router = express.Router()

router.route("/")
.get(getDiscoverPage)


export default router