const googleCallback = (req, res) => {
    // Successful authentication, assign session userId and redirect.
    req.session.userId = req.user._id;
    delete req.session.passport;
    res.redirect("/profile");
};
export default googleCallback;
