const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// 🔔 Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Mark all as read
router.patch("/:userId/mark-read", async (req, res) => {
  try {
    await Notification.updateMany({ user: req.params.userId }, { isRead: true });
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
