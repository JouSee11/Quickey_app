import {ViewParams} from "../views/view_class.js"


const getDiscoverPage = (req, res) => {
    const pageParams = new ViewParams(
        "Discover",
        ["discover_page.css"],
        [
            "discover.js",
        ],
        "discover",
        true,
        true
    )
    res.render("index", pageParams.getDetails())
}



export {getDiscoverPage}