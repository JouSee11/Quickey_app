var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KeyBinding",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedAt: {
        type: Date,
        default: Date.now
    }
});
// Enforce uniqueness: one like per user per save.
likeSchema.index({ userId: 1, itemId: 1 }, { unique: true });
//handle toggling the like button
likeSchema.statics.toggleLike = function (userId, itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingLike = yield this.findOne({ userId, itemId });
        if (existingLike) {
            yield this.deleteOne({ _id: existingLike._id });
            return { liked: false };
        }
        else {
            yield this.create({ userId, itemId });
            return { liked: true };
        }
    });
};
//check if specified user 
likeSchema.statics.hasUserLiked = function (userId, itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const like = yield this.findOne({ userId, itemId });
        return !!like; // Returns true if a like exists, false otherwise
    });
};
const Like = mongoose.model('Like', likeSchema);
export default Like;
