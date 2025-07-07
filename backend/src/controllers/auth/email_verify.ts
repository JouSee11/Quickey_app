import {Request, Response} from 'express'
import PendingUser from '../../models/pending_user_model'

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const {token} = req.body

        //check if pending user with provided token exists
        const pendingUser = await PendingUser.findOne({'verificationToken': token})

        if (pendingUser) {
            res.status(200).json({status: 'success', valid: true})
        } else {
            res.status(200).json({status: 'success', valid: false})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 'error', valid: false})
    }

} 

export {verifyEmail}