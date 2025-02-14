import express from "express"
import {checkUniqueName, saveKeyBinding, editInfo} from "../../controllers/api_controllers/api_key_binding_controller.js"


const router = express.Router()

router.route("/unique-name")
.post(checkUniqueName)

router.route("/save-key-binding")
.post(saveKeyBinding)

router.route("/edit-info")
.patch(editInfo)


// router.route("/unique-email")
// .post(checkUniqueEmail)

export default router