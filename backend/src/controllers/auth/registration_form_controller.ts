import PendingUser from "../../models/pending_user_model"
import User from "../../models/user_model"
import { Request, Response } from "express"
import emailService from "../../utils/emailService"
import crypto from 'crypto'

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

interface RegisterRequest extends Request {
    body: {
        username: string,
        email: string,
        password: string,
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

const createPendingUser = async (req: RegisterRequest, res: Response) => {
    try {
        //create pending user
        let {username, email, password} = req.body

        const verificationToken = crypto.randomUUID()

        await PendingUser.deleteMany({ email });

        await PendingUser.create({
            username,
            email,
            password,
            verificationToken
        })

        // send verification email
        const emailSent = await emailService.sendVerificationEmail(email, username, verificationToken)

        if (emailSent) {
            res.status(200).json({status: 'success', msg: 'registration created successfully'})
        } else {
            res.status(200).json({status: 'error', msg: 'sending verification email failed'})
        }

    } catch (error: any) {
        console.log(error);
        res.status(500).json({status: 'error', msg: 'creating pending user failed'})
 
    }

}

export {checkUniqueEmail, checkUniqueUsername, createPendingUser}