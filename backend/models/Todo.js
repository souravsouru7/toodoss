const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);