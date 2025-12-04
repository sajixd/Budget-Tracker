const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');

// Get all budgets
router.get('/', auth, async (req, res) => {
      try {
            const budgets = await Budget.find({ user: req.user.id });
            res.json(budgets);
      } catch (error) {
            console.error("Error fetching budgets:", error);
            res.status(500).json({ message: "Server Error" });
      }
});

// Set or Update a budget
router.post('/', auth, async (req, res) => {
      try {
            const { type, amount, customDate } = req.body;

            if (!type || !amount) {
                  return res.status(400).json({ message: "Type and amount are required" });
            }

            if (isNaN(amount) || Number(amount) < 0) {
                  return res.status(400).json({ message: "Amount must be a positive number" });
            }

            let query = { type, user: req.user.id };
            if (type === 'custom') {
                  if (!customDate) {
                        return res.status(400).json({ message: "Custom date is required for custom budget" });
                  }
                  // Normalize date to start of day for consistency
                  const date = new Date(customDate);
                  date.setHours(0, 0, 0, 0);
                  query.customDate = date;
            }

            const budget = await Budget.findOneAndUpdate(
                  query,
                  { amount, lastUpdated: new Date(), user: req.user.id },
                  { new: true, upsert: true } // Create if not exists
            );

            res.json(budget);
      } catch (error) {
            console.error("Error setting budget:", error);
            res.status(500).json({ message: error.message || "Server Error" });
      }
});

module.exports = router;
