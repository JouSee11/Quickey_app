import mongoose from "mongoose"

const keyBindingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must assign the binding to some user"]
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
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    } 
})

const KeyBinding = mongoose.model("keyBinding", keyBindingSchema)

export default KeyBinding