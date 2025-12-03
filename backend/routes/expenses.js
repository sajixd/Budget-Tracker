const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

const auth = require('../middleware/auth');

// Add new expense
router.post("/add", auth, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const newExpense = new Expense({
      title,
      amount: Number(amount),
      category,
      date: new Date(),
      user: req.user.id // Link to user
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all expenses
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete expense
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check user
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
