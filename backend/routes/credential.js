const express = require('express')
const {
  getCredentials,
  updateCredentials,
  addCredential
} = require('../controllers/credentialController')

const {cookieJwtAuth} = require('../middleware/cookieJwtAuth')

// Router instance
const router = express.Router()

// Apply authentication middleware to the routes below
router.use(cookieJwtAuth)

// Update credentials for a specific divisions repo
router.patch('/update-credential', updateCredentials)

// Get credentials of a specific repo
router.post('/', getCredentials)

// Add credentials for a specific repo
router.patch('/add-credential', addCredential)

module.exports = router