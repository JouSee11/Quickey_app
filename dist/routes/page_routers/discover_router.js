"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discover_controller_js_1 = require("../../controllers/discover_controller.js");
const router = express_1.default.Router();
router.route("/")
    .get(discover_controller_js_1.getDiscoverPage);
exports.default = router;
