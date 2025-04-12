var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import connectDB from "./db/connect.js";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
// import keysRouter from "./routes/key-bindings.js"
const app = express();
dotenv.config();
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("./public", { maxAge: 1200000 })); // cache data
// app.use(express.static("./public"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.use(passport.initialize());
app.use(passport.session());
//make sure the session values are avilible in the templates
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use("", router);
//for errpr pages
// app.use((req, res) => {
//     res.status(404).send("Error 404")
// })
const PORT = Number(process.env.PORT) || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(process.env.MONGO_URI).then(() => console.log("DB connection established"));
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
