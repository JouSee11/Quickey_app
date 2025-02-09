import passport from "passport"

const googleCallback = (req, res) => {
    // Successful authentication, assign session userId and redirect.
    req.session.userId = req.user._id;
    res.redirect("/profile");
}


export default googleCallback