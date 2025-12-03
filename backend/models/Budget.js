const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
      type: {
            type: String,
            enum: ['daily', 'monthly', 'yearly', 'custom'],
            required: true,
      },
      amount: {
            type: Number,
            required: true,
      },
      customDate: {
            type: Date, // Only used if type is 'custom'
      },
      lastUpdated: {
            type: Date,
            default: Date.now,
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
      }
});

// Compound index to ensure unique budget per type (and date for custom) PER USER
BudgetSchema.index({ user: 1, type: 1, customDate: 1 }, { unique: true });

module.exports = mongoose.model('Budget', BudgetSchema);
