import mongoose, {Schema} from "mongoose"
import { IKeyBinding } from "../@types/keybinding"

const keyBindingSchema = new Schema<IKeyBinding>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must assign the binding to some user"]
    },
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Max key binding save name is 50 chars"]
    },
    description: {
        type: String,
        required: false,
        default: null,
        maxlength: [3000, "Description cannot exceed 2000 characters"]
    },
    keyBinding: [
        {
            keyIndex: Number,
            keyValues: [String]
        }
    ],
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    likes: {
        type: Number,
        required: [true, "The number of likes must be initialized"],
        default: 0
    },
    useNumber: {
        type: Number,
        required: [true, "The number of keybiding use must be initialized"],
        default: 0
    },
})

// enforce uniqueness on user and save name combiantion
keyBindingSchema.index({userId: 1, name: 1}, {unique: true})

const KeyBinding = mongoose.model("keyBinding", keyBindingSchema)

export default KeyBinding