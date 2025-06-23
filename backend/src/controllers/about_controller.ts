import validator from "validator"
import {Request, Response} from "express"
import AboutEmail from "../models/about_email_model"

const saveEmailAbout = async (req: Request, res: Response): Promise<void> => {
    const email = req.body?.email
    const findMethod = req.body?.findMethod

    //check if the email is valid
    if (!email) {
        res.status(400).json({status: "error", msg: "email not provided"}) 
        return    
    }
    if (!findMethod) {
        res.status(400).json({status: "error", msg: "find method is not provided"}) 
        return    
    }
    if (!validator.isEmail(email)) {
        res.status(400).json({status: "error", msg: "email is not valid"})
        return 
    }
    if (await AboutEmail.emailExists(email)) {
        res.status(400).json({status: "error", msg: "email is already saved"})
        return 
    }

    try {
        const newAboutEmail = new AboutEmail({
            email: email,
            findMethod: findMethod
        })

        await newAboutEmail.save()

        res.status(200).json({status: "success", msg: "email saved successfully"})
        
    } catch (error) {
        res.status(500).json({status: "error", msg: "error saving email"})
    }

    return 
    
}

const checkEmailExists = async (req: Request, res: Response) => {
    const email = req.body?.email
    
    if (!email) {
        res.status(200).json({exists: false, msg: "email not provided"}) 
        return    
    }
    
    if (await AboutEmail.emailExists(email)) {
        res.status(200).json({exists: true, msg: "email already saved"})
        return 
    }

    res.status(200).json({exists: false, msg: "email is not saved"})
    return 
}


export {saveEmailAbout, checkEmailExists}