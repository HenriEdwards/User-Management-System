require('dotenv').config()
const Division = require('../models/divisionModel')
const ou = require('../models/ouModel')

// Retrieve all divisions & ous
const getDivisions = async (req, res) => {

  try {
  const divisions = await Division.find()
    .populate('ou')
    
    // Return all divisions with pupulated ous
    res.json(divisions)
  } catch {
    res.status(500).json({ error: 'An error occurred' })
  }
}

module.exports = {
  getDivisions
}

process.env



