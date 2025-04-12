import mongoose from "mongoose";
const pendingRegistrationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verificationToken: { type: String, required: true },
    // createdAt field with TTL index: document expires after 300 seconds (5 minutes)
    createdAt: { type: Date, default: Date.now, expires: 300 }
});
export default mongoose.model("PendingRegistration", pendingRegistrationSchema);
