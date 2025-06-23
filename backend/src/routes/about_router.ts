import express from "express";
import {saveEmailAbout} from "../controllers/about_controller"

const router = express.Router()

router.route("/save-email")
.post(saveEmailAbout)

export default router