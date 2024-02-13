require('dotenv').config()

const mongoose = require('mongoose')

// Import database URL from .env file
const MONGODB_URL = process.env.MONGODB_URL

// Database connection
const connectToDatabase = () => {
  mongoose.connect(MONGODB_URL)
    .then(() => {
      console.log(`Connected to the database...`)
    })
    .catch((error) => {
      console.log('Database connection failed...')
      console.log(error)
    })
}

// Export the connection
module.exports = {
  connectToDatabase,
}

process.env