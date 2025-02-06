
//save data
const sessionSaveBinding = (req, res) => {
    const keyData = req.body

    //if not body data was provided send back error
    if (!keyData) {
        return res.status(400).json({status: "error", msg: "no data recieved"})
    }

    // Ensure req.session.binding is initialized
    initSessionBinding(req)

    //send data to the session
    Object.entries(keyData).forEach(([key, value]) => {
        req.session.binding[key] = value
        console.log(`Key: ${key}`)
        console.log(` Value: ${value}`)
    });

    return res.status(200).json({status: "success", msg: "data recieved"})
    
}


//send data
const sessionGetBinding = (req, res) => {
    // Ensure req.session.binding is initialized
    initSessionBinding(req)

    res.json(req.session.binding)
}

const initSessionBinding = (req) => {
    if (!req.session.binding) {
        console.log("not init")
        req.session.binding = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
    }
}


export {sessionSaveBinding, sessionGetBinding}