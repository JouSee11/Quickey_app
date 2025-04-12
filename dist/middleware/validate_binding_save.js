const bindingSaveValidation = (req, res, next) => {
    const { name, description, bindingValues } = req.body;
    //missing info
    if (!name || !bindingValues) {
        return res.status(400).json({ status: "error", msg: "Error: provide all information or try again later" });
    }
    if (name.length > 50) {
        return res.status(200).json({ status: "error", msg: "Maximum name length is 50 characters!" });
    }
    if (description.length > 2000) {
        return res.status(200).json({ status: "error", msg: "Maximum description length is 2000 characters!" });
    }
    if (!req.session.userId) {
        return res.status(401).json({ status: "error", msg: "Unauthenticated user!" });
    }
    next();
};
export {};
