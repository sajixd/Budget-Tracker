# 🚀 Quick Start Guide

Get your Budget Tracker running in 5 minutes!

---

## ⚡ Quick Setup

### 1. **Backend Setup** (2 minutes)

```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:
```env
MONGO_URI=mongodb://localhost:27017/budget-tracker
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

Start backend:
```bash
npm start
```

✅ You should see:
```
MongoDB connect ho gaya
Server chal raha hai port 5000 pe
```

---

### 2. **Frontend Setup** (2 minutes)

In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

✅ You should see:
```
  VITE v... ready in ... ms
  ➜  Local:   http://localhost:5173/
```

---

### 3. **Open in Browser** (1 minute)

Go to: **http://localhost:5173**

Click **"Register"** and create account

Done! 🎉

---

## 📱 What You Can Do Now

| Feature | How |
|---------|-----|
| Create Budget | Dashboard → Add Budget Name & Limit |
| Add Expense | Select Budget → Add Amount & Date |
| View Chart | Dashboard shows expense breakdown |
| Change Name | Settings → Update Profile |
| Change Password | Settings → Change Password |
| Delete Account | Settings → Danger Zone → Delete |

---

## 🛠️ System Requirements

- **Node.js** 14+
- **MongoDB** (local or Atlas)
- **Modern Browser** (Chrome, Firefox, Safari, Edge)

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB error | Start mongod: `mongod` |
| Port 5000 in use | Change PORT in .env |
| Can't see app | Check http://localhost:5173 |
| Can't login | Check MongoDB is running |
| No data saving | Verify MONGO_URI is correct |

---

## 📖 Full Documentation

See `README.md` for complete documentation including:
- Detailed API documentation
- Feature descriptions
- Advanced configuration
- Troubleshooting guide

---

## 🎯 Next Steps

1. ✅ Explore the Dashboard
2. ✅ Create multiple budgets
3. ✅ Add expenses to test
4. ✅ Check the Settings page
5. ✅ Try dark mode toggle

---

**Ready to track your expenses? Start now!** 💰
