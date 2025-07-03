import express from "express";
import { checkUniqueEmail, checkUniqueUsername, createPendingUser } from "../controllers/auth/registration_form_controller";
import { registerFormValidation } from "../middleware/validate_register_form";

const router = express.Router()

router.route("/form/check-email").post(checkUniqueEmail)

router.post("/form/check-username", checkUniqueUsername)

router.post("/auth/register", registerFormValidation, createPendingUser)

export default router
