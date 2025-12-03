# 💰 Budget Tracker Application

A full-stack web application for managing personal budgets and tracking expenses. Built with React, Node.js, Express, and MongoDB.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Features in Detail](#features-in-detail)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ✨ Features

### User Authentication
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes with authentication middleware
- ✅ Auto-logout functionality

### Budget Management
- ✅ Create and manage multiple budgets
- ✅ Set budget limits for different categories
- ✅ View budget status with progress bars
- ✅ Track budget spending vs limits
- ✅ Edit and delete budgets

### Expense Tracking
- ✅ Add expenses to budgets
- ✅ Categorize expenses
- ✅ Set expense amounts and dates
- ✅ Edit and delete expenses
- ✅ View expense history

### Dashboard & Analytics
- ✅ Summary cards showing key metrics
- ✅ Expense distribution chart
- ✅ Budget progress visualization
- ✅ Monthly expense trends
- ✅ Real-time data updates

### Profile Management
- ✅ Update profile name
- ✅ Change password with validation
- ✅ Delete account (with all associated data)
- ✅ View account information
- ✅ Dark/Light theme toggle

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart and graph library
- **Axios** - HTTP client (or native Fetch API)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **JWT (jsonwebtoken)** - Token-based authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **npm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
Budget-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Budget.js            # Budget schema
│   │   └── Expense.js           # Expense schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── budgets.js           # Budget CRUD routes
│   │   └── expenses.js          # Expense CRUD routes
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│   └── .env                      # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── Settings.jsx      # User settings
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── budget/
│   │   │   │   ├── BudgetCard.jsx
│   │   │   │   ├── BudgetForm.jsx
│   │   │   │   ├── BudgetProgressBar.jsx
│   │   │   │   └── BudgetSelector.jsx
│   │   │   ├── expenses/
│   │   │   │   ├── ExpenseForm.jsx
│   │   │   │   └── ExpenseList.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── ExpenseChart.jsx
│   │   │   │   └── SummaryCards.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Input.jsx
│   │   │       └── Modal.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth state management
│   │   │   ├── BudgetContext.jsx # Budget state management
│   │   │   ├── ExpenseContext.jsx# Expense state management
│   │   │   └── ThemeContext.jsx  # Theme state management
│   │   ├── lib/
│   │   │   └── utils.js          # Utility functions
│   │   ├── App.jsx               # Main app component
│   │   ├── App.css               # App styles
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # React entry point
│   ├── public/                   # Static files
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── postcss.config.js         # PostCSS configuration
│
├── README.md                     # This file
└── .gitignore                    # Git ignore rules
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (Local or Cloud) - [MongoDB Setup](https://www.mongodb.com/)
  - Local: `mongod` running on `mongodb://localhost:27017`
  - Cloud: MongoDB Atlas connection string

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Navigate to project directory
cd Budget-tracker
```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and fill in your actual values
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: A strong random secret key
nano .env  # or use your preferred editor
```

**Important**: Never commit `.env` file to version control. The `.gitignore` file is configured to prevent this.

### Step 3: Setup Frontend

```bash
# Navigate to Frontend folder from backend
cd ../Frontend

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### Backend Configuration (.env)

1. **Create .env file** (copy from `.env.example`):
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Edit `.env`** with your values:
   ```env
   # Database Connection
   MONGO_URI=mongodb://localhost:27017/budget-tracker
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/budget-tracker

   # JWT Secret (Change this in production!)
   JWT_SECRET=your_secret_key_here_minimum_32_characters

   # Server Port
   PORT=5000

   # Environment
   NODE_ENV=development
   ```

3. **Generate a strong JWT_SECRET**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

**⚠️ Security Note**: 
- Never commit `.env` file to version control
- `.env` is listed in `.gitignore`
- Use `.env.example` as template for developers
- Change `JWT_SECRET` in production

### Frontend Configuration

The frontend is pre-configured to connect to `http://localhost:5000`. 

To change the API endpoint, update in `Frontend/src/context/AuthContext.jsx`:

```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## 🏃 Running the Application

### Option 1: Run in Separate Terminals

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start

# Expected output:
# Server chal raha hai port 5000 pe
# MongoDB connect ho gaya
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd Frontend
npm run dev

# Expected output:
#   VITE v... ready in ... ms
#   ➜  Local:   http://localhost:5173/
```

### Option 2: Run Both Simultaneously

```bash
# From root directory, run both in background
cd backend && npm start &
cd Frontend && npm run dev
```

### Verify Everything is Running

- Backend API: `http://localhost:5000`
- Frontend App: `http://localhost:5173`
- MongoDB: `mongodb://localhost:27017`

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/user
Authorization: Bearer jwt_token_here

Response: 200 OK
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "date": "2025-12-04T10:00:00Z"
}
```

#### Update Profile
```http
PUT /api/auth/update
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Jane Doe"
}
// OR
{
  "password": "newpassword123",
  "currentPassword": "oldpassword123"
}

Response: 200 OK
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

#### Delete Account
```http
DELETE /api/auth/delete
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "password": "password123"
}

Response: 200 OK
{
  "message": "Account deleted successfully"
}
```

### Budget Endpoints

#### Get All Budgets
```http
GET /api/budgets
Authorization: Bearer jwt_token_here

Response: 200 OK
[
  {
    "id": "budget_id",
    "user": "user_id",
    "name": "Food",
    "limit": 5000,
    "spent": 2500,
    "color": "#FF6B6B"
  }
]
```

#### Create Budget
```http
POST /api/budgets
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Groceries",
  "limit": 5000,
  "color": "#FF6B6B"
}

Response: 201 Created
{ ... budget object ... }
```

#### Update Budget
```http
PUT /api/budgets/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Updated Name",
  "limit": 6000
}

Response: 200 OK
{ ... updated budget ... }
```

#### Delete Budget
```http
DELETE /api/budgets/:id
Authorization: Bearer jwt_token_here

Response: 200 OK
{
  "message": "Budget deleted"
}
```

### Expense Endpoints

#### Get All Expenses
```http
GET /api/expenses
Authorization: Bearer jwt_token_here

Response: 200 OK
[
  {
    "id": "expense_id",
    "user": "user_id",
    "budget": "budget_id",
    "amount": 500,
    "description": "Weekly groceries",
    "date": "2025-12-04"
  }
]
```

#### Create Expense
```http
POST /api/expenses
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "budget": "budget_id",
  "amount": 500,
  "description": "Weekly groceries",
  "date": "2025-12-04"
}

Response: 201 Created
{ ... expense object ... }
```

#### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "amount": 600,
  "description": "Updated description"
}

Response: 200 OK
{ ... updated expense ... }
```

#### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer jwt_token_here

Response: 200 OK
{
  "message": "Expense deleted"
}
```

---

## 📖 Usage Guide

### 1. Create an Account

- Go to `http://localhost:5173/register`
- Enter your name, email, and password
- Click "Register"
- You'll be automatically logged in

### 2. Create a Budget

- Navigate to Dashboard
- Click on Budget section
- Fill in budget name and limit amount
- Choose a color
- Click "Add Budget"

### 3. Add Expenses

- Select a budget from the dropdown
- Enter expense amount and description
- Set the date
- Click "Add Expense"
- Expense will be added to the selected budget

### 4. View Analytics

- Dashboard shows:
  - **Summary Cards**: Total expenses, budgets, etc.
  - **Expense Chart**: Visual breakdown of expenses
  - **Budget Progress**: How much you've spent vs budget limit

### 5. Manage Profile

- Click Settings (top right menu)
- **Update Name**: Change your profile name
- **Change Password**: Update your password (with validation)
- **Delete Account**: Permanently delete account (with confirmation)

---

## 🎯 Features in Detail

### User Authentication
- Secure registration with password hashing
- JWT token-based login
- Token stored in localStorage
- Auto-logout on token expiration
- Protected routes that require authentication

### Budget System
- Multiple budget support
- Category-based budgets
- Customizable budget limits
- Color-coded budgets
- Real-time spent vs limit tracking
- Visual progress indicators

### Expense Tracking
- Add expenses to specific budgets
- Date-based expense tracking
- Edit existing expenses
- Delete expenses
- Expense descriptions
- Real-time budget updates

### Dashboard Analytics
- Summary of total expenses
- Summary of active budgets
- Expense distribution pie chart
- Monthly expense trends
- Budget status cards with progress bars
- Real-time data updates

### User Settings
- Profile name update with validation
- Secure password change with current password verification
- Account deletion with password confirmation
- All data deletion on account removal
- Success/error message feedback

### Theme Support
- Light/Dark mode toggle
- Persistent theme preference
- Tailwind CSS responsive design
- Mobile-friendly interface

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: Cannot connect to MongoDB**
```
Solution:
1. Ensure MongoDB is running (mongod)
2. Check MONGO_URI in .env file
3. If using Atlas, verify connection string
4. Check internet connection for Atlas
```

**Error: Port 5000 already in use**
```
Solution:
1. Kill process: lsof -ti:5000 | xargs kill -9
2. Or change PORT in .env file
3. Update Frontend API URL accordingly
```

**Error: JWT_SECRET not set**
```
Solution:
1. Add JWT_SECRET to .env file
2. Use a random string (min 32 chars)
3. Restart server
```

### Frontend Won't Load

**Error: Cannot connect to API**
```
Solution:
1. Ensure backend is running on port 5000
2. Check CORS is enabled (should be in server.js)
3. Clear browser cache and localStorage
4. Check browser console for errors
```

**Error: Blank page after login**
```
Solution:
1. Check if token is stored in localStorage
2. Verify API endpoints are correct
3. Check browser console for errors
4. Clear localStorage: localStorage.clear()
```

### Authentication Issues

**Cannot login even with correct credentials**
```
Solution:
1. Verify user exists in database
2. Check password hashing is working
3. Ensure JWT token is being created
4. Check token is saved in localStorage
```

**Settings changes not saving**
```
Solution:
1. Verify backend is running
2. Check network tab in DevTools
3. Ensure Authorization header has token
4. Check user has proper permissions
```

### Database Issues

**MongoDB connection fails**
```
Solution:
1. Start MongoDB: mongod
2. Check MONGO_URI is correct
3. For Atlas: verify IP whitelist
4. Check network connectivity
```

**Data not persisting**
```
Solution:
1. Verify database is connected
2. Check database storage space
3. Ensure data is being saved before reload
4. Check browser console for errors
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Guidelines
- Follow existing code style
- Add comments for complex logic
- Test features before submitting
- Update README if adding features
- Use meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Budget Tracker** - A full-stack expense tracking application

Built with ❤️ using React, Node.js, and MongoDB

---

## 📞 Support

For issues, questions, or suggestions:

1. Check the **Troubleshooting** section
2. Review existing issues on GitHub
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce

---

## 🎯 Future Enhancements

- [ ] Export budget data as PDF
- [ ] Multi-user budget sharing
- [ ] Budget notifications/alerts
- [ ] Recurring expense support
- [ ] Budget forecasting
- [ ] Advanced analytics and reports
- [ ] Mobile app
- [ ] Multi-currency support
- [ ] Bulk expense import
- [ ] Budget templates

---

## 📊 Project Statistics

- **Frontend Lines**: ~1000+ lines (React + Components)
- **Backend Lines**: ~500+ lines (Express + Routes)
- **Database Collections**: 3 (Users, Budgets, Expenses)
- **API Endpoints**: 15+
- **React Components**: 12+
- **Responsive**: Yes (Mobile, Tablet, Desktop)

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ CORS enabled
- ✅ Environment variables for secrets
- ✅ Password verification for sensitive actions
- ✅ SQL injection prevention (MongoDB)
- ✅ XSS protection via React escaping

---

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorial](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT Auth](https://jwt.io/)

---

## 🎉 Getting Started Quick Reference

```bash
# Clone/navigate to project
cd Budget-tracker

# Setup Backend
cd backend
npm install
# Create .env with MONGO_URI and JWT_SECRET
npm start

# Setup Frontend (in new terminal)
cd Frontend
npm install
npm run dev

# Open http://localhost:5173 in browser
# Register/Login and start tracking expenses!
```

---

**Happy Budget Tracking! 💰**

Last Updated: December 4, 2025
