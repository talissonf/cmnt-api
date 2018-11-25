const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

let schema = {
  created_at: {
    type: Date,
    default: Date.now
  },
  user: {
    id: {
      type: String
    },
    name: {
      type: String
    }
  },
  body: {
    type: String
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}

let modelSchema = new MongoSchema(schema)
module.exports = mongoose.model('comments', modelSchema)
