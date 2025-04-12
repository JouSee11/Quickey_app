var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/user_model.js";
const checkUniqueUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    //user didnt provide username
    if (!username) {
        return res.status(400).json({ status: "error", msg: "username not provided" });
    }
    const user = yield User.findByUsername(username);
    //if username if already taken
    if (user) {
        return res.status(200).json({ status: "success", unique: "false" });
    }
    else {
        return res.status(200).json({ status: "success", unique: "true" });
    }
});
const checkUniqueEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    //user didnt provide username
    if (!email) {
        return res.status(400).json({ status: "error", msg: "email not provided" });
    }
    const user = yield User.findByEmail(email);
    //if username if already taken
    if (user) {
        return res.status(200).json({ status: "success", unique: "false" });
    }
    else {
        return res.status(200).json({ status: "success", unique: "true" });
    }
});
export { checkUniqueUsername, checkUniqueEmail };
