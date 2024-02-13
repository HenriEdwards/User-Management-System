const mongoose = require('mongoose')

// Create schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8,
  },
  role: { 
    type: String, 
    enum: ['Normal', 'Management', 'Admin'], 
    default: 'Normal' 
  },
  divisions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'divisions' 
  }],
  ous: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ous' 
  }]
})

// Create model
const User = mongoose.model('users', userSchema)

// Export model
module.exports = User