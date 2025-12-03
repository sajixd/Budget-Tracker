const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
      const { name, email, password } = req.body;

      try {
            let user = await User.findOne({ email });

            if (user) {
                  return res.status(400).json({ message: 'User already exists' });
            }

            user = new User({
                  name,
                  email,
                  password,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                  user: {
                        id: user.id,
                  },
            };

            jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  { expiresIn: '5d' },
                  (err, token) => {
                        if (err) throw err;
                        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
                  }
            );
      } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
      }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
            let user = await User.findOne({ email });

            if (!user) {
                  return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                  return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const payload = {
                  user: {
                        id: user.id,
                  },
            };

            jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  { expiresIn: '5d' },
                  (err, token) => {
                        if (err) throw err;
                        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
                  }
            );
      } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
      }
});

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
router.get('/user', auth, async (req, res) => {
      try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
      } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
      }
});

// @route   PUT api/auth/update
// @desc    Update user profile
// @access  Private
router.put('/update', auth, async (req, res) => {
      const { name, password, currentPassword } = req.body;

      try {
            let user = await User.findById(req.user.id);

            if (!user) {
                  return res.status(404).json({ message: 'User not found' });
            }

            if (name) user.name = name;

            if (password) {
                  if (!currentPassword) {
                        return res.status(400).json({ message: 'Current password is required to set a new password' });
                  }

                  const isMatch = await bcrypt.compare(currentPassword, user.password);
                  if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid current password' });
                  }

                  const salt = await bcrypt.genSalt(10);
                  user.password = await bcrypt.hash(password, salt);
            }

            await user.save();
            res.json({ message: 'Profile updated successfully', user: { id: user.id, name: user.name, email: user.email } });
      } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
      }
});

// @route   DELETE api/auth/delete
// @desc    Delete user account
// @access  Private
router.delete('/delete', auth, async (req, res) => {
      const { password } = req.body;

      try {
            const user = await User.findById(req.user.id);

            if (!user) {
                  return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(400).json({ message: 'Invalid password' });
            }

            // Delete user's data
            const Expense = require('../models/Expense');
            const Budget = require('../models/Budget');

            await Expense.deleteMany({ user: req.user.id });
            await Budget.deleteMany({ user: req.user.id });
            await User.findByIdAndDelete(req.user.id);

            res.json({ message: 'Account deleted successfully' });
      } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
      }
});

module.exports = router;
