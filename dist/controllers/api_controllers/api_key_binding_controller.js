"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserLike = exports.toggleBindingLike = exports.editState = exports.editInfo = exports.saveKeyBinding = void 0;
const key_binding_model_js_1 = __importDefault(require("../../models/key_binding_model.js"));
const likes_model_js_1 = __importDefault(require("../../models/likes_model.js"));
const saveKeyBinding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, bindingValues } = req.body;
        const newBinding = new key_binding_model_js_1.default({
            userId: req.session.userId,
            name: name.trim(),
            description: description.trim(),
            keyBinding: bindingValues
        });
        yield newBinding.save();
        return res.status(201).json({ status: "success", msg: "binding successfully saved" });
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Name must be unique! Must be logged in!" });
    }
});
exports.saveKeyBinding = saveKeyBinding;
const editInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, itemId } = req.body;
        if (!name || !itemId || description === undefined) {
            return res.status(400).json({ status: "error", msg: "Not all nessesary data was provided" });
        }
        const updatedRecord = yield key_binding_model_js_1.default.findOneAndUpdate({ _id: itemId, userId: req.session.userId }, {
            name: name.trim(),
            description: description.trim()
        }, { new: true } // return the updated document
        );
        if (!updatedRecord) {
            return res.status(404).json({ status: "error", msg: "Item not found" });
        }
        return res.status(200).json({ status: "success", msg: "Record updated" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", msg: "Name must be unique! ( or unauthorized)" });
    }
});
exports.editInfo = editInfo;
const editState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isPublic, itemId } = req.body;
        const updatedRecord = yield key_binding_model_js_1.default.findOneAndUpdate({ _id: itemId, userId: req.session.userId }, {
            public: isPublic
        }, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ status: "error", msg: "Item not found" });
        }
        return res.status(200).json({ status: "success", msg: "Record updated" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", msg: "Internal error - try again later!" });
    }
});
exports.editState = editState;
const toggleBindingLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const userId = req.session.userId;
    //check if all data is present
    if (!userId || !itemId) {
        return res.status(400).json({ status: "error", msg: "Not all data provided" });
    }
    try {
        const result = yield likes_model_js_1.default.toggleLike(userId, itemId);
        return res.status(200).json({ status: "success", msg: "Like toggled successfully", curStatus: result.liked });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", msg: error });
    }
});
exports.toggleBindingLike = toggleBindingLike;
const checkUserLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const userId = req.session.userId;
    //check if all data is present
    if (!userId || !itemId) {
        return res.status(400).json({ status: "error", msg: "not all data provided" });
    }
    try {
        const result = yield likes_model_js_1.default.hasUserLiked(userId, itemId);
        return res.status(200).json({ status: "success", msg: "Like recieved success successfully", curStatus: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", msg: error });
    }
});
exports.checkUserLike = checkUserLike;
