const Expense = require('./models/Expense');
const expenseRoutes = require('./routes/expenses');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");

const app = express();

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:5174',
  process.env.FRONTEND_URL // Production Vercel URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Budget Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connect ho gaya'))
  .catch(err => console.log('MongoDB error: ', err));

// Use dynamic PORT for deployment platforms like Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} pe`);
});