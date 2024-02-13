const express = require('express')
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  logoutUser
} = require('../controllers/userController')

const {cookieJwtAuth} = require('../middleware/cookieJwtAuth')

// Router instance
const router = express.Router()

// Register a user
router.post('/register', registerUser)

// Login a user
router.post('/login', loginUser)

// Apply jwt authentication middleware to the routes below
router.use(cookieJwtAuth)

// Retrieve all users
router.get('/manage-users', getUsers)

// Retrieve a user
router.get('/user', getUser)

// Update a user
router.put('/update-user', updateUser)

// Logout a user
router.post('/logout', logoutUser)

module.exports = router