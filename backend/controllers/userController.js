require('dotenv').config()

const User = require('../models/userModel')
const ou = require('../models/ouModel')
const division = require('../models/divisionModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

// Retrieve all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('divisions')
      .populate('ous')

      // Return all users
      res.json(users)
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

// Retrieve a single user
const getUser = async (req, res) => {
  const { id } = req.query

  try {
    const user = await User.findById(id)
      .populate('divisions')
      .populate('ous')

    // Return user info
    res.json(user)
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.query
  const updatedUser = req.body
  delete updatedUser._id

  try {
    const user = await User.findOneAndReplace(
      { _id: id }, 
      updatedUser, 
      { new: true }
    ).populate('divisions ous')

    // Send back user info mainly to update user context
    // mainly used if same user is updated which is logged on
    res.json({
      success: true,
      message: 'Update successful',
      username: user.username,
      _id: user._id,
      role: user.role,
      divisions: user.divisions,
      ous: user.ous
    })
    
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

// Create/Register a user
const registerUser = async (req, res) => {
  const { username, password } = req.body

  let emptyFields = []

  if(!username){
    emptyFields.push('username')
  }
  if(!password){
    emptyFields.push('password')
  }
  if (emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all fields.', emptyFields})
  }

  try {
    // Check if user already exists 
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ 'message': 'User exists' })
    }
    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 8)

    // Add user to db
    const user = await User.create({
      username,
      password: encryptedPassword
    })

    res.json({ success: true, 'message': 'Registered' })
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

// Login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body

  // Validate if empty fields
  let emptyFields = []
  if (!username) {
    emptyFields.push('username')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields.', emptyFields })
  }

  try {
    // Find user in db
    const user = await User.findOne({ username })
    .populate('divisions')
    .populate('ous')

    // Check if username/user found
    if (!user) {
      // User not found
      return res.status(400).json({ message: 'Invalid username or password' })
    }
    
    // Apply jwt
    let token
    if (user && ( await bcrypt.compare(password, user.password))){
      // Generate a jwt
      token = jwt.sign(
        {
          id: user._id,
          role: user.role
        },
        SECRET,
        {
          expiresIn: '2h'
        })
    } else {
      // Invalid password - for security reasons can't state the fact
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true
    })

    // Send user data back
    res.json({
      success: true,
      message: 'Login successful',
      username: user.username,
      _id: user._id,
      role: user.role,
      divisions: user.divisions,
      ous: user.ous
    })
  } catch {
    return res.status(400).json({ message: 'Invalid username or password' })
  }
}

// Logout a user
const logoutUser = async (req, res) => {
  // Set token to none and expire immediately
  res.clearCookie('token')
  res.status(200).json({ success: true, message: 'User logged out successfully' })
}

module.exports = {
  registerUser, 
  loginUser,
  getUsers,
  getUser,
  updateUser,
  logoutUser
}

process.env



