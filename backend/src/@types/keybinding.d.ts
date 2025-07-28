import { Document, Model } from "mongoose";
import { KeyBindingCategory } from "../constants/keybinding_categories";

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
    category: KeyBindingCategory
}

