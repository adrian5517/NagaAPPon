const User = require('../models/userModel');

const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ message: 'Email already exists' });
  
      const existingUsername = await User.findOne({ username });
      if (existingUsername) return res.status(400).json({ message: 'Username already exists' });
  
      const profilePicture = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
  
      const newUser = new User({
        username,
        email,
        password,
        profilePicture,
      });
  
      await newUser.save();
      const token = newUser.generateAuthToken();
  
      res.status(201).json({
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ message: 'Login Successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error Logging in', error: error.message });
    }
};

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ message: 'User not found' });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware
};