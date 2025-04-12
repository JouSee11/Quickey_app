import express from "express";
import { getProfilePage } from "../../controllers/profile_controller.js";
import { getSavedItemPage } from "../../controllers/profile_controller.js";
const router = express.Router();
router.use(express.static("./public"));
router.route("/")
    .get(getProfilePage);
router.route("/item")
    .get(getSavedItemPage);
export default router;
