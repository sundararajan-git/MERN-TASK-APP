require('dotenv').config()
const express = require("express")
const cros = require("cors")
const app  = express()
const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")
const PORT = process.env.PORT
const URI = process.env.MANGO_URI


app.use(express.json())
app.use(cros())

mongoose.connect(URI).then(()=>{
    app.listen(PORT,(resq,res)=>{
        console.log("DB connected and listsing on " , PORT)
    })
}).catch((err)=>{
    console.error(err.message)
})


app.use("/api/tasks",taskRoutes)

