import express from "express"
import { getProfilePage } from "../../controllers/profile_controller.js"


const router = express.Router()

router.use(express.static("./public"))

router.route("/")
.get(getProfilePage)


export default router