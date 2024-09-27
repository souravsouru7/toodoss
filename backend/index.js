require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TodoModel = require("./models/Todo");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
app.post("/addtask", async (req, res) => {
  const todo = new TodoModel({
    task: req.body.task
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
app.put("/update/:id", async (req, res) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
app.delete("/del/:id", async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});