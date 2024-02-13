const express = require('express')
const {
  getDivisions
} = require('../controllers/divisionsController')

const {cookieJwtAuth} = require('../middleware/cookieJwtAuth')

// Router instance
const router = express.Router()

// Apply authentication middleware to the route below
router.use(cookieJwtAuth)

// Retrieve all divisions
router.get('/divisions', getDivisions)


module.exports = router