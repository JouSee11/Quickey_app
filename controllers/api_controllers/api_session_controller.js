
const sessionSaveBinding = (req, res) => {
    const keyData = req.body

    if (!keyData) {
        return res.status(200)
    }
}


export {sessionSaveBinding}