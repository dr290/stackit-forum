const Answer = require("../models/Answer");
const Notification = require("../models/Notification");
const Question = require("../models/Question");

exports.postAnswer = async (req, res) => {
  try {
    const { content, userId, questionId } = req.body;

    const answer = new Answer({ content, user: userId, question: questionId });
    await answer.save();

    // 🔔 Notify question owner
    const question = await Question.findById(questionId);
    if (question && question.user.toString() !== userId) {
      const note = new Notification({
        user: question.user, // notify question owner
        message: `Your question was answered.`,
      });
      await note.save();
    }

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswersForQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await Answer.find({ question: questionId }).populate("user", "username").sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.voteAnswer = async (req, res) => {
  try {
    const { userId, voteValue } = req.body; // voteValue: 1 (upvote) or -1 (downvote)
    const answer = await Answer.findById(req.params.id);

    if (!answer) return res.status(404).json({ error: "Answer not found" });

    // Check if user already voted
    const existingVote = answer.voters.find(v => v.user.toString() === userId);

    if (existingVote) {
      if (existingVote.value === voteValue) {
        return res.status(400).json({ error: "You already voted this way" });
      }
      // reverse vote
      existingVote.value = voteValue;
      answer.votes += voteValue * 2; // reverse + apply new
    } else {
      answer.voters.push({ user: userId, value: voteValue });
      answer.votes += voteValue;
    }

    await answer.save();
    res.json({ message: "Vote recorded", votes: answer.votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
