const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title || !title.trim())
      return res.status(400).json({ message: "Task title is required" });
    const task = await Task.create({
      title: title.trim(), description: description || "",
      priority: priority || "Medium", dueDate: dueDate || "", userId: req.userId
    });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Could not create task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body, { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ message: "Could not update task" });
  }
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;