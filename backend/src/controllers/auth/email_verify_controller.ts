import {Request, Response} from 'express'
import PendingUser from '../../models/pending_user_model'
import { saveUser } from './registration_form_controller'

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const {token} = req.body

        //check if pending user with provided token exists
        const pendingUser = await PendingUser.findOne({'verificationToken': token})

        if (pendingUser) {
            //delete the pending user
            const userSaved = await saveUser(pendingUser.username, pendingUser.email, pendingUser.password)
            const pendingUserDeleted = await PendingUser.deleteOne({verificationToken: token})

            if (userSaved && pendingUserDeleted) {
                res.status(200).json({status: 'success', valid: true})
            } else{
                res.status(500).json({status: 'success', valid: false})
            }
        } else {
            res.status(200).json({status: 'success', valid: false})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 'error', valid: false})
    }

}

const deletePendingUser = async (token: string) => {
    PendingUser.deleteOne({verificationToken: token})
}


export {verifyEmail}