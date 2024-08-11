require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")
const PORT = process.env.PORT
const URI = process.env.MONGO_URI

// Middleware
app.use(express.json())
app.use(cors())

mongoose.connect(URI).then(() => {
    app.listen(PORT, (resq, res) => {
        console.log("DB connected and listsing on ", PORT)
    })
}).catch((err) => {
    console.error(err.message)
})

app.use("/", taskRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
