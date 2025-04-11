"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_key_binding_controller_js_1 = require("../../controllers/api_controllers/api_key_binding_controller.js");
const router = express_1.default.Router();
router.route("/save-key-binding")
    .post(api_key_binding_controller_js_1.saveKeyBinding);
router.route("/edit-info")
    .patch(api_key_binding_controller_js_1.editInfo);
router.route("/edit-state")
    .patch(api_key_binding_controller_js_1.editState);
router.route("/like")
    .patch(api_key_binding_controller_js_1.toggleBindingLike);
router.route("/check-user-like")
    .post(api_key_binding_controller_js_1.checkUserLike);
exports.default = router;
