import { Document, Model } from "mongoose";

export interface ILike extends Document {
    userId: ObjectId;
    itemId: ObjectId;
    likedAt: Date;
}

// Define the Like model interface with static methods
export interface ILikeModel extends Model<ILike> {
    toggleLike(userId: ObjectId, itemId: ObjectId): Promise<{ liked: boolean }>;
    hasUserLiked(userId: ObjectId, itemId: ObjectId): Promise<boolean>;
}