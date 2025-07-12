const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Answer = require("../models/Answer");


exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.voteAnswer = async (req, res) => {
  try {
    const { userId, voteValue } = req.body; // voteValue: 1 or -1
    const answer = await Answer.findById(req.params.id);

    if (!answer) return res.status(404).json({ error: "Answer not found" });

    const existingVote = answer.voters.find(v => v.user.toString() === userId);

    if (existingVote) {
      if (existingVote.value === voteValue) {
        return res.status(400).json({ error: "You already voted this way" });
      }
      // reverse vote
      existingVote.value = voteValue;
      answer.votes += voteValue * 2; // +1 to -1 = -2 (reversing)
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
