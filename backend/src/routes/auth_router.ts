import express from "express";
import { checkUniqueEmail, checkUniqueUsername, createPendingUser } from "../controllers/auth/registration_form_controller";
import { registerFormValidation } from "../middleware/validate_register_form";
import { verifyEmail } from "../controllers/auth/email_verify_controller";
import { registrationLimiter } from "../middleware/rate_limiter";

const router = express.Router()

router.route("/form/check-email").post(checkUniqueEmail)

router.post("/form/check-username", checkUniqueUsername)

router.post("/register", registrationLimiter, registerFormValidation, createPendingUser)

router.post("/register-verify", verifyEmail)

export default router
