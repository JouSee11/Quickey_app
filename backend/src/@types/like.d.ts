import { Document } from "mongoose";

export interface ILike extends Document {
    userId: ObjectId;
    keyBindingId: ObjectId;
    createdAt: Date
}

export interface ILikeModel extends Model<Like> {
    toggleLike(userId: ObjectId, keyBindingId: ObjectId): Promise<{liked: boolean}>
    hasUserLiked(userId: ObjectId, keyBindingId: ObjectId): Promise<boolean>
}