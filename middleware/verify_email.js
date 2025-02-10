import PendingRegistration from "../models/pending_registration_model.js";
import {EmailVerifyPage} from "../views/view_pages.js"

const verifyEmailCheck = async (req, res, next) => {
    const {token} = req.body
    const email = req.session.registerEmail

    if (!token || !email) {
        return showVerifyErr("Token not provided", email, res)
    }

    try{
        console.log(email)
        console.log(token)
        const pendingUser = await PendingRegistration.findOne({ email })
        if (!pendingUser) return showVerifyErr("Token expired! (or email is not valid)", email, res)
        
        //check token
        if (pendingUser.verificationToken !== token) return showVerifyErr("Wrong token", email, res)
        
        //user verified - proceed to wiriting user to db
        next()

    } catch (err) {
        console.error("Error during email verification:", err);
        return showVerifyErr("Error during email verification.", email, res);
    }

}

const showVerifyErr = (errorMsg, email, res) => {
    const emailVerifyPage = new EmailVerifyPage();
    emailVerifyPage.setEmail(email);
    emailVerifyPage.setError(errorMsg)
    return res.render("index", emailVerifyPage.getDetails());
}


export {verifyEmailCheck}