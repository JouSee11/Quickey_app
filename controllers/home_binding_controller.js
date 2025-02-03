import {homeBindingPage} from "../views/view_pages.js"


const getBindingPage = (req, res) => {
    const homePageCopy = Object.create(homeBindingPage)
    // const homePageCopy =  Object.assign(Object.create(Object.getPrototypeOf(homeBindingPage)), homeBindingPage);
    if (req.session.username) {
        console.log("here the session value:" + req.session.username)
        homePageCopy.insertData({username: req.session.username})
    }
    res.render("index", homePageCopy.getDetails())
}



export {getBindingPage}