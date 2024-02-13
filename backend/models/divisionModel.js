const mongoose = require('mongoose')

// Create schema
const divisionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  ou: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ous', 
    required: true 
  }
})

// Create model
const Division = mongoose.model('divisions', divisionSchema)

// Export model
module.exports = Division