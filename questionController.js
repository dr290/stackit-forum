const Question = require("../models/Question");
const mongoose = require("mongoose");

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;
    const question = new Question({ title, description, tags, user: userId });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const { tag } = req.query;

    let query = {};
    if (tag) {
      query.tags = tag;
    }

    const questions = await Question.find(query)
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const { answerId, userId } = req.body;

    if (!question) return res.status(404).json({ error: "Question not found" });

    if (question.user.toString() !== userId)
      return res.status(403).json({ error: "Only question creator can accept answers" });

    question.acceptedAnswer = answerId;
    await question.save();

    res.json({ message: "Answer marked as accepted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
