import mongoose from "mongoose"
import { IPendingUser } from "../@types/pending_user"
import bcrypt from "bcrypt"

const pendingUserSchema = new mongoose.Schema<IPendingUser>({
    username: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true},
    password: { type: String, required: true},
    verificationToken: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), expires: 300} // delete it self in 300s (5 min)
    
})

//hash the password before saving to pending user
pendingUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error: any) {
        next(error);
    }
})

//static methods
pendingUserSchema.statics.findByEmail = function(email: string) {
    return this.findOne({email: email.trim()})
}



export default mongoose.model("PendingUser", pendingUserSchema)