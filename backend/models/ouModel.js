const mongoose = require('mongoose')

// Create schema
const ouSchema = new mongoose.Schema({
  name: { 
    type: String, 
    enum: ['News management', 'Software reviews', 'Hardware reviews', 'Opinion publishing'], 
    required: true 
  }
})

// Create model
const OU = mongoose.model('ous', ouSchema)

// Export model
module.exports = OU