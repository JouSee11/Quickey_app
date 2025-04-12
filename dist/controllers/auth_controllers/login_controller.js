import { LoginPage } from "../../views/view_pages.js";
const getLoginPage = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/profile");
    }
    const loginPage = new LoginPage();
    res.render("index", loginPage.getDetails());
};
const handleLogin = (req, res) => {
    // save user data to session
    req.session.userId = req.body.user.profile.id;
    res.redirect("/profile");
};
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        else {
            res.redirect("/auth/login");
        }
    });
};
export { getLoginPage, handleLogin, logoutUser };
