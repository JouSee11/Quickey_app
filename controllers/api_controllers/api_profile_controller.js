import KeyBinding from "../../models/key_binding_model.js"

const getSavesDefault = async (req, res) => {
    //check if user is logged in
    if (!req.session.userId) {
        return res.status(401).json({status: "error", msg: "User is not authorized"})
    }
    
    const userId = req.session.userId

    try {
        // Find key bindings for the specific user.
        // Use .select() to return only specific fields (e.g. "name" and "value")
        const savedData = await KeyBinding.find({ userId })
            .select("name keyBinding likes public updatedAt")
            .sort({ createdAt: -1 })
            .exec()

        return res.status(200).json({status: "success", data: savedData})

    } catch (error) {
        console.error(err);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }


}


export {getSavesDefault}