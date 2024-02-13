require('dotenv').config()

const Credential = require('../models/credentialModel')

// Get a specific division's credential repo
const getCredentials = async (req, res) => { 
  const { id } = req.body

  try {
    const repo = await Credential.find({division: id})
    res.json(repo)
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

// Update credential
const updateCredentials = async (req, res) => {
  const { id, index, application, username,  password } = req.body
  
  const updateCredential = {
    application: application,
    username: username,
    password: password,
  }
  
  // Construct the update query using credential index
  const updateQuery = {
    $set: {
      [`credentials.${index}`]: updateCredential,
    },
  }
  try {
    // Update specified credential
    const updatedCredentials = await Credential.findOneAndUpdate(
      { _id: id },
      updateQuery,
      { new: true }
    )

    if (!updatedCredentials) {
      return res.status(404).json({ error: 'Error updating credential.' })
    }
    
    res.json(updatedCredentials.credentials[index])
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

// Add a credential to a divisions credential repo
const addCredential = async (req, res) => {
  const { id, newCredential } = req.body

  try {
    const updatedRepo = await Credential.findByIdAndUpdate(
      id,
      { $push: { credentials: newCredential } },
      { new: true }
    )

    res.json(updatedRepo)
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

module.exports = {
  getCredentials,
  updateCredentials,
  addCredential
}

process.env