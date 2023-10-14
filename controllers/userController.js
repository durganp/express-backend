const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
// @desc Register user
// @route POST /api/users/registar
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All feild are mendatory');
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User is already register');
  }
  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed password: ', hashedPassword);
  const user = await User.create({ name, email, password: hashedPassword });
  console.log('user created', user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
  res.json({ message: 'Current user information' });
});
// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are manatory');
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password not valid');
  }
  res.json({ message: 'Current user information' });
});
// @desc Current user info
// @route GET /api/users/current
// @access privae
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
