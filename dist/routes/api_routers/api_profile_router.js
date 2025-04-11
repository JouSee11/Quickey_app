"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_profile_controller_js_1 = require("../../controllers/api_controllers/api_profile_controller.js");
const router = express_1.default.Router();
router.route("/get-default")
    .get(api_profile_controller_js_1.getSavesDefault);
router.route("/item")
    .get(api_profile_controller_js_1.getItemData)
    .delete(api_profile_controller_js_1.deleteItemProfile);
exports.default = router;
