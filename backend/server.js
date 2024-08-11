require('dotenv').config()
const express = require("express")
const cors = require("cors")  // Fixed typo from 'cros' to 'cors'
const app  = express()
const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")
const PORT = process.env.PORT
const URI = process.env.MONGO_URI  // Fixed typo from 'MANGO_URI' to 'MONGO_URI'

// Middleware
app.use(express.json())
app.use(cors())  // Fixed typo from 'cros' to 'cors'

// Connect to MongoDB
mongoose.connect(URI).then(() => {
    app.listen(PORT, () => {
        console.log("DB connected and listening on", PORT)
    })
}).catch((err) => {
    console.error("DB connection error:", err.message)
})

// Routes
app.use("/", taskRoutes)

// Optional: Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
