import express from "express";
import { getSavesDefault, getItemData, deleteItemProfile } from "../../controllers/api_controllers/api_profile_controller.js";
const router = express.Router();
router.route("/get-default")
    .get(getSavesDefault);
router.route("/item")
    .get(getItemData)
    .delete(deleteItemProfile);
export default router;
