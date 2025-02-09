import express from "express"
import dotenv from "dotenv"
import router from "./routes/router.js"
import connectDB from "./db/connect.js"
import session from "express-session"
import passport from "passport"


// import keysRouter from "./routes/key-bindings.js"
const app = express()
dotenv.config()

//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("./public"))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

//make sure the session values are avilible in the templates
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  

app.use("", router)

//for errpr pages
// app.use((req, res) => {
//     res.status(404).send("Error 404")
// })


const PORT = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI).then(() => console.log("DB connection established"))
        
        // start the server only when we are connected to the db
        app.listen(PORT, () => {
            console.log(`Server is listening on the port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
