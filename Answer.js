const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  votes: { type: Number, default: 0 },
  voters: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: { type: Number, enum: [1, -1] } // 1 = upvote, -1 = downvote
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);
