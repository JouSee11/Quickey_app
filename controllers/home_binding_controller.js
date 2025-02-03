import {homeBindingPage} from "../views/view_pages.js"


const getBindingPage = (req, res) => {
    res.render("index", homeBindingPage.getDetails())
}



export {getBindingPage}