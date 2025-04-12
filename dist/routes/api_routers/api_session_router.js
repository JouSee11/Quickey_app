import express from "express";
import { sessionSaveBinding, sessionGetBinding } from "../../controllers/api_controllers/api_session_controller.js";
const router = express.Router();
router.route("/save-binding")
    .post(sessionSaveBinding);
router.route("/get-binding")
    .get(sessionGetBinding);
export default router;
