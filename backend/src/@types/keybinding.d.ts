import { Document, Model } from "mongoose";

export interface KeyBindingData {
    id: String,
    value: String[]
}

export interface IKeyBinding extends Document {
    _id: string,
    userId: mongoose.Schema.Types.ObjectId
    name: string
    description: string
    keyBinding: KeyBindingData[]
    public: boolean
    createdAt: Date
    updatedAt: Date
    useNumber: Number
    likes: Number
}

