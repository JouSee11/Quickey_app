import { Request, Response } from "express"
import KeyBinding from "../../models/keybinding_model"
import { IUser } from "../../@types/user"

const verfiyBindingName = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser
        const {saveName} = req.body
    
        const valid = await bindingNameValid(user._id, saveName)
        
        res.status(200).json({
            status: "success",
            valid: valid
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            valid: false,
            msg: "name validation failed"
        })
    }
} 

const bindingNameValid = async (userId: string, saveName: string): Promise<Boolean> => {
    const exists = await KeyBinding.exists({
        userId: userId,
        name: saveName
    })

    return !exists
}

export {verfiyBindingName, bindingNameValid}