import mongoose, {Schema, Model, ObjectId, Document} from "mongoose"
import { ILike, ILikeModel } from "../@types/like"

const likeSchema = new Schema<ILike>({
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
likeSchema.statics.toggleLike = async function(userId: ObjectId, itemId: ObjectId) {
    const existingLike = await this.findOne({ userId, itemId });
    if (existingLike) {
      await this.deleteOne({ _id: existingLike._id });
      return { liked: false };
    } else {
      await this.create({ userId, itemId });
      return { liked: true };
    }
};

//check if specified user 
likeSchema.statics.hasUserLiked = async function (userId: ObjectId, itemId: ObjectId) {
    const like = await this.findOne({ userId, itemId });
    return !!like; // Returns true if a like exists, false otherwise
};


const Like = mongoose.model<ILike, ILikeModel>('Like', likeSchema);

export default Like;