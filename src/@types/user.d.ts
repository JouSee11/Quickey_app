import { Document, Model } from "mongoose";

export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    email: string;
    registerType: string;
    profilePicture?: string | null;
    createdAt: Date;
    role: string;
    // comparePassword(candidatePassword: string): Promise<boolean>;
    // Add the virtual property
    profile: {
        id: string;
        username: string;
        email: string;
        registerType: string;
        profilePicture: string | null;
        createdAt: Date;
    };
}

export interface IUserModel extends Model<IUser> {
    findByUsername(username: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
}