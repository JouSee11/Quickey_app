import KeyBinding from "../../models/key_binding_model.js"

const checkUniqueName = (req, res) =>{
    return
}

const saveKeyBinding = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({status: "error", msg: "Unauthorized user"})
    }

    try {
        const {name, description, bindingValues} = req.body 
        const newBinding = new KeyBinding({
            userId: req.session.userId,
            name: name,
            description: description,
            keyBinding: bindingValues
        })

        await newBinding.save()
        return res.status(201).json({status: "success", msg: "binding successfully saved"})
    } catch (error) {
        return res.status(500).json({status: "error", msg: error})
        
    }
}


export {checkUniqueName, saveKeyBinding}