import express from "express"
// import keysRouter from "./routes/key-bindings.js"
const app = express()

//middleware
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("./public"))
// app.use("/save-to-device", keysRouter)


//for errpr pages
app.use((req, res) => {
    res.status(404).send("Error 404")
})


const port = 3000
app.listen(3000, () => {
    console.log(`App is listening on port ${port}...`)
})