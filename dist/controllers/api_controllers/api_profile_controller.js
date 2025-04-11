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
exports.deleteItemProfile = exports.getItemData = exports.getSavesDefault = void 0;
const key_binding_model_js_1 = __importDefault(require("../../models/key_binding_model.js"));
const likes_model_js_1 = __importDefault(require("../../models/likes_model.js"));
const getSavesDefault = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user is logged in
    if (!req.session.userId) {
        return res.status(401).json({ status: "error", msg: "User is not authorized" });
    }
    const userId = req.session.userId;
    const searchQuery = req.query.search || "";
    const likedQuery = req.query.liked || "false";
    //pagination data
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const regex = new RegExp(searchQuery, "i"); // case-insensitive search
    try {
        //if there is some search criteria search with the text
        const findCriteria = searchQuery ? { userId, name: regex } : { userId };
        //if we are looking only for the liked ones
        if (likedQuery === "true") {
            // Find all liked records for this user.
            const likedRecords = yield likes_model_js_1.default.find({ userId }).select("itemId").lean();
            const likedIds = likedRecords.map((record) => record.itemId);
            // Add a condition to only fetch key bindings whose _id is in the likedIds array.
            findCriteria._id = { $in: likedIds };
        }
        const totalCount = yield key_binding_model_js_1.default.countDocuments(findCriteria);
        // Find key bindings for the specific user.
        const savedData = yield key_binding_model_js_1.default.find(findCriteria)
            .select("name userId keyBinding likes public updatedAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("userId", "username")
            .lean() // returns plain JavaScript objects so we can attach new fields
            .exec();
        // Map over the results and attach a likes count from the Likes model
        const savedDataWithLikes = yield Promise.all(savedData.map((save) => __awaiter(void 0, void 0, void 0, function* () {
            // Count likes documents where saveId matches the current save _id
            const likesCount = yield likes_model_js_1.default.countDocuments({ itemId: save._id });
            return Object.assign(Object.assign({}, save), { likes: likesCount });
        })));
        // Return pagination metadata along with the data
        return res.status(200).json({
            status: "success",
            data: savedDataWithLikes,
            pagination: {
                page,
                limit,
                total: totalCount,
                pages: Math.ceil(totalCount / limit)
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }
});
exports.getSavesDefault = getSavesDefault;
const getItemData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.query.id;
    //check id user is logged in and is owner of the item
    if (!req.session.userId) {
        return res.status(401).json({ status: "error", msg: "User is not authorized" });
    }
    try {
        const itemData = yield key_binding_model_js_1.default.find({ _id: itemId, userId: req.session.userId });
        if (itemData.length === 0) {
            return res.status(401).json({ status: "error", msg: "User is not authorized" });
        }
        console.log(itemData);
        res.json({ status: "success", data: itemData });
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Server error" });
    }
});
exports.getItemData = getItemData;
const deleteItemProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deleteId } = req.body;
        // Check if deleteId is provided
        if (!deleteId) {
            return res.status(400).json({ status: "error", msg: "No item ID provided" });
        }
        const deletedItem = yield key_binding_model_js_1.default.findOneAndDelete({
            _id: deleteId,
            userId: req.session.userId
        });
        if (!deletedItem) {
            return res.status(404).json({ status: "error", msg: "Item not found" });
        }
        return res.status(200).json({ status: "success", msg: "Item successfully deleted" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }
});
exports.deleteItemProfile = deleteItemProfile;
