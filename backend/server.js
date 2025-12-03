const Expense = require('./models/Expense');
const expenseRoutes = require('./routes/expenses');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connect ho gaya'))
  .catch(err => console.log('MongoDB error: ', err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} pe`);
});