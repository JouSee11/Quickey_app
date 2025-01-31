import express from "express"
import dotenv from "dotenv"
import router from "./routes/router.js"

// import keysRouter from "./routes/key-bindings.js"
const app = express()
dotenv.config()

//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("./public"))

app.use("", router)

//for errpr pages
// app.use((req, res) => {
//     res.status(404).send("Error 404")
// })


const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`App is listening on port ${PORT}...`)
})