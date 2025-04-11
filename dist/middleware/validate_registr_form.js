"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPendingUser = exports.registerFormValidation = void 0;
//register validation
const validator_1 = __importDefault(require("validator"));
const view_pages_js_1 = require("../views/view_pages.js");
const user_model_js_1 = __importDefault(require("../models/user_model.js"));
const pending_registration_model_js_1 = __importDefault(require("../models/pending_registration_model.js"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const registerFormValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password, passwordConfirm } = req.body;
    let errors = [];
    //trim the spaces for username and email
    username = username.trim();
    email = email.trim();
    // // Example validation checks
    // if (!username || !email || !password || !passwordConfirm) {
    //     errors.push({inputField: "general",msg: "All fields are required."})
    // }
    if (!(yield usernameUnique(username))) {
        errors.push({ inputField: "username", msg: "Username is already taken" });
    }
    if (!usernameValid(username)) {
        errors.push({ inputField: "username", msg: "Username length must be 3-20" });
    }
    if (!(yield emailUnique(email))) {
        errors.push({ inputField: "email", msg: "Email is already taken" });
    }
    if (!emailValid(email)) {
        errors.push({ inputField: "email", msg: "Email is not valid" });
    }
    if (!passwordValid(password)) {
        errors.push({ inputField: "password", msg: "Password requirements: - [A-Z], [0-1], length 8-256." });
    }
    if (!passwordMatch(password, passwordConfirm)) {
        errors.push({ inputField: "password-conf", msg: "Passwords do not match" });
    }
    if (errors.length > 0) {
        // Render the form again with error messages and prefilled values
        const registerPage = new view_pages_js_1.RegisterPage();
        registerPage.setErrors(errors);
        registerPage.setFormData({ username: username, email: email });
        return res.render("index", registerPage.getDetails());
    }
    next(); //if there are no errors write the user to the db
});
exports.registerFormValidation = registerFormValidation;
//username validation
const usernameUnique = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_js_1.default.findByUsername(username);
    return !user;
});
const usernameValid = (username) => {
    if (username.length < 3 || username.length > 20) {
        return false;
    }
    else {
        return true;
    }
};
//email validation
const emailUnique = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_js_1.default.findByEmail(email);
    return !user;
});
const emailValid = (email) => {
    return validator_1.default.isEmail(email);
};
const passwordMatch = (password, passwordConfirm) => {
    return password === passwordConfirm;
};
const passwordValid = (password) => {
    if (password.length < 8 || password.length > 256) {
        return false;
    }
    const hasUppercase = /[A-Z]/.test(password); // Checks for at least one uppercase letter
    const hasNumber = /\d/.test(password); // Checks for at least one digit
    if (!hasNumber || !hasUppercase) {
        return false;
    }
    return true;
};
const generateEmailHtml = (username, verificationToken) => {
    // Read the original template.
    const templatePath = path_1.default.join(process.cwd(), "views", "verification_email.html");
    const emailTemplate = fs_1.default.readFileSync(templatePath, "utf8");
    // Replace dynamic values and the image cid with the data URI.
    return emailTemplate
        .replace(/{{username}}/g, username)
        .replace(/{{verificationToken}}/g, verificationToken);
};
//send to token to email
const createPendingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password } = req.body;
    const verificationToken = crypto_1.default.randomBytes(3).toString("hex");
    try {
        // Remove previous pending registrations with the same email.
        yield pending_registration_model_js_1.default.deleteMany({ email });
        //create new pending
        yield pending_registration_model_js_1.default.create({
            username,
            email,
            password,
            verificationToken
        });
    }
    catch (err) {
        console.error("Error saving pending registration:", err);
        return res.status(500).send("Error processing registration.");
    }
    // Optionally, send the verification email here using your email service...
    // Set up nodemailer transporter.
    let transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM, // e.g., '"Your App" <no-reply@yourapp.com>'
        to: email,
        subject: "Quick Key Email Verification",
        html: generateEmailHtml(username, verificationToken),
        attachments: [
            {
                filename: 'main-logo.svg',
                path: path_1.default.join(process.cwd(), 'public', 'images', 'icons', 'main-logo.svg'), // absolute path derived with path.join
                cid: 'logoImage'
            }
        ]
    };
    try {
        // Send the verification email.
        yield transporter.sendMail(mailOptions);
    }
    catch (err) {
        //when user set give wrong email that doesnt work
        console.error("Error sending verification email:", err);
        return res.redirect("/auth/register");
    }
    // Render the email verification page, passing along minimal details (like email)
    req.session.registerEmail = email;
    return res.redirect("/auth/register/verify");
});
exports.createPendingUser = createPendingUser;
