import KeyBinding from "../../models/key_binding_model.js"
import Like from "../../models/likes_model.js"

type FindCriteria = {
    userId: any;
    name?: RegExp;
    _id?: { $in: any[] };
};

const getSavesDefault = async (req, res) => {
    //check if user is logged in
    if (!req.session.userId) {
        return res.status(401).json({status: "error", msg: "User is not authorized"})
    }
    
    const userId = req.session.userId
    const searchQuery = req.query.search || ""
    const likedQuery = req.query.liked || "false"

    //pagination data
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const regex = new RegExp(searchQuery, "i") // case-insensitive search

    try {
        //if there is some search criteria search with the text
        const findCriteria: FindCriteria = searchQuery ? { userId, name: regex } : { userId };

        //if we are looking only for the liked ones
        if (likedQuery === "true") {
            // Find all liked records for this user.
            const likedRecords = await Like.find({userId}).select("itemId").lean()
            const likedIds = likedRecords.map((record) => record.itemId)

            // Add a condition to only fetch key bindings whose _id is in the likedIds array.
            findCriteria._id = { $in: likedIds }
        }

        const totalCount = await KeyBinding.countDocuments(findCriteria)

        // Find key bindings for the specific user.
        const savedData = await KeyBinding.find(findCriteria)
            .select("name userId keyBinding likes public updatedAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("userId", "username")
            .lean() // returns plain JavaScript objects so we can attach new fields
            .exec()
        
        // Map over the results and attach a likes count from the Likes model
        const savedDataWithLikes = await Promise.all(savedData.map(async (save) => {
            // Count likes documents where saveId matches the current save _id
            const likesCount = await Like.countDocuments({ itemId: save._id });
            return { ...save, likes: likesCount };
        }));

        // Return pagination metadata along with the data
        return res.status(200).json({
            status: "success", 
            data: savedDataWithLikes,
            pagination: {
                page,
                limit,
                total: totalCount,
                pages: Math.ceil(totalCount / limit)
            }
            
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal server error" });
    }

}

const getItemData = async (req,res) => {
    const itemId = req.query.id
    
    //check id user is logged in and is owner of the item
    if (!req.session.userId) {
        return res.status(401).json({status: "error", msg: "User is not authorized"})
    }
    try {
        const itemData = await KeyBinding.find({ _id: itemId, userId: req.session.userId})

        if (itemData.length === 0) {
            return res.status(401).json({status: "error", msg: "User is not authorized"})
        }

        console.log(itemData)

        res.json({status: "success", data: itemData})
        
    } catch (error) {
        return res.status(500).json({status: "error", msg: "Server error"})
    }

}

const deleteItemProfile = async (req, res) => {
    try {
        const {deleteId} = req.body

        // Check if deleteId is provided
        if (!deleteId) {
            return res.status(400).json({ status: "error", msg: "No item ID provided" });
        }

        const deletedItem = await KeyBinding.findOneAndDelete({
            _id: deleteId,
            userId: req.session.userId
        });

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