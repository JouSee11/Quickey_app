import User from "../../models/user_model"
import { Request, Response } from "express"

interface CheckUsernameRequest extends Request {
    body: {
        username: string
    }
}

interface CheckEmailRequest extends Request {
    body: {
        email: string
    }
}

const checkUniqueUsername = async (req: CheckUsernameRequest, res: Response) => {
    try {
        const username = req.body.username
        const existingUser = await User.findByUsername(username)

        if (existingUser) {
            res.status(200).json({status: "success", availible: false})
        } else {
            res.status(200).json({status: "success", availible: true})
        }
    } catch (error) {
        res.status(500).json({status: "error", availible: true})
    }
}

const checkUniqueEmail = async (req: CheckEmailRequest, res: Response) => {
    try {
        const email = req.body.email
        const existingUser = await User.findByEmail(email)

        if (existingUser) {
            res.status(200).json({status: "success", availible: false})
        } else {
            res.status(200).json({status: "success", availible: true})
        }
    } catch (error) {
        res.status(500).json({status: "error", availible: true})
    }
}

const createPendingUser = async (req: Request, res: Response) => {
    //create pending user
}

export {checkUniqueEmail, checkUniqueUsername, createPendingUser}