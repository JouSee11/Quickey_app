import mongoose from "mongoose";
const keyBindingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must assign the binding to some user"]
    },
    name: {
        type: String,
        required: true,
        minlength: [1, "Must provide name"],
        maxlength: [50, "Max key binding save name is 50 chars"]
    },
    keyBinding: [
        {
            keyIndex: Number,
            keyValues: [String]
        }
    ],
    description: {
        type: String,
        required: false,
        default: null,
        maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    likes: {
        type: Number,
        required: [true, "The number of likes must be initialized"],
        default: 0
    },
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Create a compound index on userId and name to ensure uniqueness per user
keyBindingSchema.index({ userId: 1, name: 1 }, { unique: true });
const KeyBinding = mongoose.model("keyBinding", keyBindingSchema);
export default KeyBinding;
