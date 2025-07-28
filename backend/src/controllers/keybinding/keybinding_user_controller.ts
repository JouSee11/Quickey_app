import { Request, Response } from "express"
import KeyBinding from "../../models/keybinding_model"
import { IUser } from "../../@types/user"
import mongoose, { FilterQuery, PipelineStage, ObjectId } from "mongoose"
import { IKeyBinding } from "../../@types/keybinding"

const verfiyBindingName = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser
        const {saveName} = req.body
    
        const valid = await bindingNameValid(user._id, saveName)
        
        res.status(200).json({
            status: "success",
            valid: valid
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            valid: false,
            msg: "name validation failed"
        })
    }
} 

const getBindingUser = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser
        //get the filter values
        const {searchText, filterCategories, sortBy = "date_desc", publicFilter = "all", likedFilter = "false"} = req.query
        // const query: any = {userId: user._id, }
        const pipeline: PipelineStage[] = []

        const initMatch: FilterQuery<IKeyBinding> = {userId: new mongoose.Types.ObjectId(user._id)}
        if (searchText && typeof searchText === 'string') {
            initMatch.name = {$regex: searchText, $options: 'i'} //case insensitive search
        }

        if (filterCategories && typeof filterCategories === 'string') {
            const categories = filterCategories.split(',').filter(cat => cat.trim() !== '')
            if (categories.length > 0) {
                initMatch.category = {$in: categories}
            }
        }

        if (publicFilter !== 'all' && typeof publicFilter === 'string') {
            initMatch.public = publicFilter === 'public'
        }

        pipeline.push({$match: initMatch})

        //join with the likes collection
        pipeline.push({
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'keyBindingId',
                as: 'likesData'
            }
        })

        //add like count field to the results
        pipeline.push({
            $addFields: {
                likeCount: { $size: '$likesData'},
                isLiked: {$in: [user._id, '$likesData.userId']}
            }
        })

        if (likedFilter === "true") {
            pipeline.push({$match: {isLiked: true}})
        }

        //sort the results based on the sort filter
        const sortData = getSortOptions(sortBy as string)
        pipeline.push({$sort: sortData})
        
        //clean up the outpuyt
        pipeline.push({
            $project: {
                likesData: 0
            }
        })

        const bindingData = await KeyBinding.aggregate(pipeline)

        res.status(200).json({
            status: 'success',
            data: bindingData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "Error getting user binding data"
        })
    }
}

//helper funcations
const bindingNameValid = async (userId: string, saveName: string): Promise<Boolean> => {
    const exists = await KeyBinding.exists({
        userId: userId,
        name: saveName
    })

    return !exists
}

const getSortOptions = (sortValue: string): Record<string, 1 | -1> => {
    switch (sortValue) {
        case "date_asc":
            return {updatedAt: 1} 
        case "most_liked":
            return {likeCount: -1, updatedAt: -1}
        case "name_asc":
            return {name: 1}
        case "name_desc":
            return { name: -1 }
        default: // "date_desc"
            return { updatedAt: -1 }
    }
}

export {verfiyBindingName, bindingNameValid, getBindingUser}