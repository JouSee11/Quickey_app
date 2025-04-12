var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PendingRegistration from "../models/pending_registration_model.js";
import { EmailVerifyPage } from "../views/view_pages.js";
const verifyEmailCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const email = req.session.registerEmail;
    if (!token || !email) {
        return showVerifyErr("Token not provided", email, res);
    }
    try {
        console.log(email);
        console.log(token);
        const pendingUser = yield PendingRegistration.findOne({ email });
        if (!pendingUser)
            return showVerifyErr("Token expired! (or email is not valid)", email, res);
        //check token
        if (pendingUser.verificationToken !== token)
            return showVerifyErr("Wrong token", email, res);
        //user verified - proceed to wiriting user to db
        next();
    }
    catch (err) {
        console.error("Error during email verification:", err);
        return showVerifyErr("Error during email verification.", email, res);
    }
});
const showVerifyErr = (errorMsg, email, res) => {
    const emailVerifyPage = new EmailVerifyPage();
    emailVerifyPage.setEmail(email);
    emailVerifyPage.setError(errorMsg);
    return res.render("index", emailVerifyPage.getDetails());
};
export { verifyEmailCheck };
