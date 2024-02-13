require('dotenv').config()

// Require
const express = require('express')
const cookieParser = require('cookie-parser')
const {connectToDatabase} = require('./database/database')

// Retrieve port via .env file
const PORT = process.env.PORT

// Routes
const userRoutes = require('./routes/user')
const credentialRoutes = require('./routes/credential')
const divisionRoutes = require('./routes/divisions')

// Express app
const app = express()

// Cookies
app.use(cookieParser()) 

// Middelware checks for data
app.use(express.json())

// Output all requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Handle user related routes
app.use('/api/users', userRoutes)

// Handle credentials related routes
app.use('/api/users/credential-repo', credentialRoutes)

// Handle ou/divisions related routes
app.use('/api', divisionRoutes)

// Connect to DB
connectToDatabase()

// Listen for requests
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

process.env