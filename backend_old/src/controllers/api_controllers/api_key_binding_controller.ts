import KeyBinding from "../../models/key_binding_model.js"
import Like from "../../models/likes_model.js"

const saveKeyBinding = async (req, res) => {

    try {
        const {name, description, bindingValues} = req.body 
        const newBinding = new KeyBinding({
            userId: req.session.userId,
            name: name.trim(),
            description: description.trim(),
            keyBinding: bindingValues
        })

        await newBinding.save()
        return res.status(201).json({status: "success", msg: "binding successfully saved"})
    } catch (error) {
        return res.status(500).json({status: "error", msg: "Name must be unique! Must be logged in!"})
        
    }
}

const editInfo = async (req, res) => {
    try {
        const {name, description, itemId} = req.body
        
        if (!name || !itemId || description === undefined) {
            return res.status(400).json({ status: "error", msg: "Not all nessesary data was provided" });
        }
  
        const updatedRecord = await KeyBinding.findOneAndUpdate(
            {_id: itemId, userId: req.session.userId},
            {
                name: name.trim(),
                description: description.trim()
            },
            { new: true} // return the updated document
        )

        if (!updatedRecord) {
            return res.status(404).json({ status: "error", msg: "Item not found" });
        }

        return res.status(200).json({ status: "success", msg: "Record updated"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", msg: "Name must be unique! ( or unauthorized)"});
    }
}

const editState = async (req, res) => {
    try {
        const { isPublic, itemId } = req.body

        const updatedRecord = await KeyBinding.findOneAndUpdate(
            {_id: itemId, userId: req.session.userId},
            {
                public: isPublic
            },
            { new: true}
        )

        if (!updatedRecord) {
            return res.status(404).json({ status: "error", msg: "Item not found" });
        }

        return res.status(200).json({ status: "success", msg: "Record updated"});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", msg: "Internal error - try again later!"});
    }
}

const toggleBindingLike = async (req, res) => {
    const {itemId} = req.body
    const userId = req.session.userId
    //check if all data is present
    if (!userId || !itemId) {
        return res.status(400).json({status: "error", msg: "Not all data provided"})
    }

    try {
        const result = await Like.toggleLike(userId, itemId)
        return res.status(200).json({status: "success", msg: "Like toggled successfully", curStatus: result.liked})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", msg: error });
    }

}

const checkUserLike = async (req, res) => {
    const {itemId} = req.body
    const userId = req.session.userId
    //check if all data is present
    if (!userId || !itemId) {
        return res.status(400).json({status: "error", msg: "not all data provided"})
    }

    try {
        const result = await Like.hasUserLiked(userId, itemId)
        return res.status(200).json({status: "success", msg: "Like recieved success successfully", curStatus: result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", msg: error });
    }
}


export {saveKeyBinding, editInfo, editState, toggleBindingLike, checkUserLike}