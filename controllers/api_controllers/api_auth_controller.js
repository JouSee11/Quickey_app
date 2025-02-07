import User from "../../models/user_model.js"

const checkUniqueUsername = async (req, res) => {
    const username = req.body.username

    //user didnt provide username
    if (!username){
        return res.status(400).json({status: "error", msg: "username not provided"})
    }

    const user = await User.findByUsername(username)
    //if username if already taken
    if (user) {
        return res.status(200).json({status: "success", unique: "false"})
    } else {
        return res.status(200).json({status: "success", unique: "true"})
    }
}

const checkUniqueEmail = async (req, res) => {
    const email = req.body.email

    //user didnt provide username
    if (!email){
        return res.status(400).json({status: "error", msg: "email not provided"})
    }

    const user = await User.findByEmail(email)
    //if username if already taken
    if (user) {
        return res.status(200).json({status: "success", unique: "false"})
    } else {
        return res.status(200).json({status: "success", unique: "true"})
    }
}


export  {checkUniqueUsername, checkUniqueEmail}