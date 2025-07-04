import {Document, Model} from "mongoose"

export interface IPendingUser extends Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    verificationToken: string
    createdAt: Date

    comparePassword(candidatePassword: string): Promise<boolean>, // Add this
}

export interface IPendingUserModel extends Model<IPendingUser> {
    findByToken(username: string): Promise<IPendingUser | null>;
    findByEmail(email: string): Promise<IPendingUser | null>;
}