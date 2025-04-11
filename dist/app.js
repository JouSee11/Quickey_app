"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_js_1 = __importDefault(require("./routes/router.js"));
const connect_js_1 = __importDefault(require("./db/connect.js"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// import keysRouter from "./routes/key-bindings.js"
const app = (0, express_1.default)();
dotenv_1.default.config();
//middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.set("view engine", "ejs");
app.use(express_1.default.static("./public", { maxAge: 1200000 })); // cache data
// app.use(express.static("./public"))
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//make sure the session values are avilible in the templates
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use("", router_js_1.default);
//for errpr pages
// app.use((req, res) => {
//     res.status(404).send("Error 404")
// })
const PORT = Number(process.env.PORT) || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_js_1.default)(process.env.MONGO_URI).then(() => console.log("DB connection established"));
        // start the server only when we are connected to the db
        app.listen(PORT, () => {
            console.log(`Server is listening on the port ${PORT}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
