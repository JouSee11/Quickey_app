import express from "express";
import { checkUniqueEmail, checkUniqueUsername } from "../controllers/auth/auth_from_controller";

const router = express.Router()

router.route("/form/check-email").post(checkUniqueEmail)

router.post("/form/check-username", checkUniqueUsername)

export default router