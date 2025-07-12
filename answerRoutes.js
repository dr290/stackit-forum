const express = require("express");
const router = express.Router();

const {
  postAnswer,
  getAnswersForQuestion,
  voteAnswer
} = require("../controllers/answerController");

// ✅ Define route handlers correctly
router.post("/", postAnswer);
router.get("/:questionId", getAnswersForQuestion);
router.patch("/:id/vote", voteAnswer);

module.exports = router;
