import express from "express";
import { saveKeyBinding, editInfo, editState, toggleBindingLike, checkUserLike } from "../../controllers/api_controllers/api_key_binding_controller.js";
const router = express.Router();
router.route("/save-key-binding")
    .post(saveKeyBinding);
router.route("/edit-info")
    .patch(editInfo);
router.route("/edit-state")
    .patch(editState);
router.route("/like")
    .patch(toggleBindingLike);
router.route("/check-user-like")
    .post(checkUserLike);
export default router;
