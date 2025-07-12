const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestions,
  acceptAnswer
} = require("../controllers/questionController"); // ✅ Make sure this path is correct

router.post("/", createQuestion);
router.get("/", getQuestions);
router.patch("/:id/accept", acceptAnswer); // ✅ This line is fine IF acceptAnswer is valid

module.exports = router;
