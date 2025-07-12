const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
