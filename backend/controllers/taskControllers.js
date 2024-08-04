const mongoose = require("mongoose")
const taskModel = require("../models/taskModel")


// TO CREATE TASK 
const createTask = async (req, res) => {
    try {
        const { tittle, description } = req.body
        const task = await taskModel.create({ tittle, description })
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//  GET ALL TASK
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({})
        res.status(200).json(tasks)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// GET SINGLE TASK
const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Task Not Found" })
        }
        const task = await taskModel.findById(id)
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

// UPDATE THE TASK
const updateTask = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Task Not Found" })
        }
        const update = await taskModel.findByIdAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(update)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


// DELTE THE TASK
const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "Task Not Found" })
        }
        const del = await taskModel.findByIdAndDelete(id)
        res.status(200).json(del)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = { createTask, getTasks, getSingleTask, updateTask , deleteTask }