import express from "express";
import {saveEmailAbout, checkEmailExists} from "../controllers/about_controller"

const router = express.Router()

router.route("/save-email")
.post(saveEmailAbout)

router.route("/check-email")
.get(checkEmailExists)

export default router