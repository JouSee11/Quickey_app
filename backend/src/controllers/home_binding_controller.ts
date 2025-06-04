import {HomeBindingPage} from "../views/view_pages.js"
import User from "../models/user_model.js"


const getBindingPage = async (req, res) => {
    const homePage = new HomeBindingPage()
    
    //show username if user is logged in
    if (req.session.userId) {
        const userObject = await User.findById(req.session.userId)
        const username = userObject?.profile.username
        homePage.setUsername(username)
    }
    res.render("index", homePage.getDetails())
}



export {getBindingPage}