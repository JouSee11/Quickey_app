import {HomeBindingPage} from "../views/view_pages.js"


const getBindingPage = (req, res) => {
    const homePage = new HomeBindingPage()
    // const homePageCopy =  Object.assign(Object.create(Object.getPrototypeOf(homeBindingPage)), homeBindingPage);
    if (req.session.userId) {
        // console.log("here the session value:" + req.session.username)
        homePage.setUsername(req.session.userId)
    }
    res.render("index", homePage.getDetails())
}



export {getBindingPage}