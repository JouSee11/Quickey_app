//register validation
import validator from "validator"
import { RegisterPage, EmailVerifyPage } from "../views/view_pages.js"
import User from "../models/user_model.js"
import PendingRegistration from "../models/pending_registration_model.js"
import crypto from "crypto"
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv"
import fs from "fs"
import path from "path"

const registerFormValidation = async (req, res, next) => {
    let { username, email, password, passwordConfirm } = req.body
    let errors = []
    //trim the spaces for username and email
    username = username.trim() 
    email = email.trim()

    // // Example validation checks
    // if (!username || !email || !password || !passwordConfirm) {
    //     errors.push({inputField: "general",msg: "All fields are required."})
    // }
    if (!(await usernameUnique(username))) {
        errors.push({inputField: "username",msg: "Username is already taken"});
    }
    if (!usernameValid(username)) {
        errors.push({inputField: "username",msg: "Username length must be 3-20"});
    }
    if (!(await emailUnique(email))) {
        errors.push({inputField: "email", msg: "Email is already taken"});
    }
    if (!emailValid(email)) {
        errors.push({inputField: "email", msg: "Email is not valid"});
    }
    if (!passwordValid(password)) {
        errors.push({inputField: "password", msg: "Password requirements: - [A-Z], [0-1], length 8-256."});
    }
    if (!passwordMatch(password, passwordConfirm)) {
        errors.push({inputField: "password-conf", msg: "Passwords do not match"});
    }

    if (errors.length > 0) {
        // Render the form again with error messages and prefilled values
        const registerPage = new RegisterPage()
        registerPage.setErrors(errors)
        registerPage.setFormData({username: username, email: email})
        return res.render("index", registerPage.getDetails())
    }

    next() //if there are no errors write the user to the db
}

//username validation
const usernameUnique = async (username) => {
    const user = await User.findByUsername(username)
    return !user;
}
const usernameValid = (username) => {
    if (username.length < 3 || username.length > 20) {
        return false
    } else {
        return true
    }
}

//email validation
const emailUnique = async (email) => {
    const user = await User.findByEmail(email)
    return !user
}

const emailValid = (email) => {
    return validator.isEmail(email)
}

const passwordMatch = (password, passwordConfirm) => {
    return password === passwordConfirm
}

const passwordValid = (password) => {
    if (password.length < 8 || password.length > 256) {
        return false
    }

    const hasUppercase = /[A-Z]/.test(password);  // Checks for at least one uppercase letter
    const hasNumber = /\d/.test(password);        // Checks for at least one digit
    if (!hasNumber || !hasUppercase) {
        return false
    }
    return true
}

const generateEmailHtml = (username, verificationToken) => {
    // Read the original template.
    const templatePath = path.join(process.cwd(), "views", "verification_email.html");
    const emailTemplate = fs.readFileSync(templatePath, "utf8");
  
    // Replace dynamic values and the image cid with the data URI.
    return emailTemplate
      .replace(/{{username}}/g, username)
      .replace(/{{verificationToken}}/g, verificationToken)
}

//send to token to email
const createPendingUser = async(req, res) => {
    let { username, email, password} = req.body
    
    const verificationToken = crypto.randomBytes(3).toString("hex")
        
    try{
        // Remove previous pending registrations with the same email.
        await PendingRegistration.deleteMany({ email });
        
        //create new pending
        await PendingRegistration.create({
            username,
            email,
            password,
            verificationToken
        })
    } catch (err) {
        console.error("Error saving pending registration:", err);
        return res.status(500).send("Error processing registration.");
    }
    
    // Optionally, send the verification email here using your email service...
    // Set up nodemailer transporter.
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,   // e.g., '"Your App" <no-reply@yourapp.com>'
        to: email,
        subject: "Quick Key Email Verification",
        html: generateEmailHtml(username, verificationToken),
        attachments: [
            {
              filename: 'logo.png',
              path: path.join(process.cwd(), 'public', 'images', 'logo.png'), // absolute path derived with path.join
              cid: 'logoImage'
            }
        ]
    };

    try {
        // Send the verification email.
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error("Error sending verification email:", err);
        return res.status(500).send("Error sending verification email.");
    }



    // Render the email verification page, passing along minimal details (like email)
    req.session.registerEmail = email
    return res.redirect("/auth/register/verify");
}


export {registerFormValidation, createPendingUser}