const mongoose = require("mongoose")
const { Schema } = mongoose

const taskSchema = new Schema(
    {
        tittle: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Task", taskSchema)  