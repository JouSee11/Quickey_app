import {Request, Response} from "express"
import KeyBinding from "../../models/keybinding_model"
import { IUser } from "../../@types/user"
import { bindingNameValid } from "./keybinding_user_controller"
import { KEYBINDING_CATEGORIES } from "../../constants/keybinding_categories"

const saveKeyBinding = async (req: Request, res: Response) => {
    const {bindingData, name, description = ""} = req.body
    //check if all data is provided
    if (!bindingData || !name) {        
        res.status(400).json({
            status: "error",
            msg: "Some data are not provided"
        })
        return
    }
    //check if user is authenticated and valid
    const user = req.user as IUser
    if (!user) {
        res.status(401).json({
            status: "error",
            msg: "User not authenticated"
        })
        return
    }
    //validate single values
    const nameValid = await validateName(name, user._id)
    const descriptionValid = validateDescription(description)
    const keyBindingDataValid = validateKeybindingData(bindingData)

    if (!nameValid || !descriptionValid || !keyBindingDataValid) {
        res.status(400).json({
            status: "error",
            msg: "Invalid data provided"
        })
        return
    }

    //save the binding to database
    try {
        await KeyBinding.create({
            userId: user._id,
            keyBinding: bindingData,
            name: name.trim(),
            description: (description || "").trim()
        })

        res.status(201).json({
            status: "success",
            msg: "Data successfully saved"
        })

    } catch (error) {
        res.status(500).json({status: "error", msg: "Error saving key binding"})
    }
}

const getCategories = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'successfull',
        categories: KEYBINDING_CATEGORIES
    })
    return
}

//helper functions
const validateName = async (name: string, userId: string): Promise<boolean> => {
    if (name.length > 50 || name.length < 3) {
        return false
    }
    if (!await bindingNameValid(userId, name)) return false

    return true
} 

const validateDescription = (description: string): boolean => {
    if (description.length > 3000) return false
    return true
}

const validateKeybindingData = (keyBinding: any) => {
    if (!Array.isArray(keyBinding)) return false
    if (keyBinding.length === 0) return false

    //check that every item has requiered structure
    return keyBinding.every((item: any) => 
        item &&
        typeof item.id === 'string' &&
        Array.isArray(item.value) 
    )
}

export {saveKeyBinding, getCategories}