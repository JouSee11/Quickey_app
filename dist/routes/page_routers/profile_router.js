"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_js_1 = require("../../controllers/profile_controller.js");
const profile_controller_js_2 = require("../../controllers/profile_controller.js");
const router = express_1.default.Router();
router.use(express_1.default.static("./public"));
router.route("/")
    .get(profile_controller_js_1.getProfilePage);
router.route("/item")
    .get(profile_controller_js_2.getSavedItemPage);
exports.default = router;
