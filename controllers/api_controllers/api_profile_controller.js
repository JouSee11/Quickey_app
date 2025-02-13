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
            .select("name userId keyBinding likes public updatedAt")
            .sort({ createdAt: -1 })
            .populate("userId", "username")
            .exec()


        return res.status(200).json({status: "success", data: savedData})

    } catch (error) {
        console.error(err);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }

}

const getItemData = async (req,res) => {
    const itemId = req.query.id

    const itemData = await KeyBinding.find({ _id: itemId})

    res.json(itemData)
}

const deleteItemProfile = async (req, res) => {
    try {
        const {deleteId} = req.body

        // Check if deleteId is provided
        if (!deleteId) {
            return res.status(400).json({ status: "error", msg: "No item ID provided" });
        }

        const deletedItem = await KeyBinding.findByIdAndDelete(deleteId);

        if (!deletedItem) {
            return res.status(404).json({ status: "error", msg: "Item not found" });
        }

        return res.status(200).json({ status: "success", msg: "Item successfully deleted" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }

}


export {getSavesDefault, getItemData, deleteItemProfile}