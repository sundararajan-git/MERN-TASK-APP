const express = require("express")
const { createTask, getTasks, getSingleTask, updateTask, deleteTask } = require("../controllers/taskControllers")
const router = express.Router()

router.post("/", createTask)
router.get("/", getTasks)
router.get("/:id", getSingleTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)


module.exports = router