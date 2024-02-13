const mongoose = require('mongoose')

// Create schema
const credentialSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true
  },
  credentials: [
    {
      application: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    }
  ]
})

// Create model
const Credential = mongoose.model('credentials', credentialSchema)

// Export model
module.exports = Credential