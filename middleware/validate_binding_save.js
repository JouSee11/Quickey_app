

const bindingSaveValidation = (req, res) => {
    const {name, description, bindingValues} = req.body

    //missing info
    if (!name || !bindingValues) {
        return res.status(400).json({status: "error", msg: "Please all information!"})
    }
    if (name.length > 50) {
        return res.status(200).json({status: "error", msg: "Maximum name length is !"})
    }
    if (!req.session.userId) {
        return res.status(401).json({status: "error", msg: "Unauthenticated user!"})        
    }
} 