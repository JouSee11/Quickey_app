import express from "express";
import { checkUniqueEmail, checkUniqueUsername, createPendingUser } from "../controllers/auth/registration_form_controller";
import { registerFormValidation } from "../middleware/validate_register_form";
import { verifyEmail } from "../controllers/auth/email_verify_controller";
import { registrationLimiter } from "../middleware/rate_limiter";
import passport from "passport"
import ssoRouter from "./sso_router"

const router = express.Router()

router.route("/form/check-email").get(checkUniqueEmail)

router.get("/form/check-username", checkUniqueUsername)

router.post("/register", registrationLimiter, registerFormValidation, createPendingUser)

router.post("/register-verify", verifyEmail)

router.use(ssoRouter)

export default router
