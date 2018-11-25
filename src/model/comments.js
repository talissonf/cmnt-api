const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

let schema = {
  created_at: {
    type: Date,
    default: Date.now
  },
  user: {
    id: {
      type: String,
      required: 'user id is riquired'
    },
    name: {
      type: String
    }
  },
  body: {
    type: String,
    required: 'body of comment is riquired.'
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}

let modelSchema = new MongoSchema(schema)
module.exports = mongoose.model('comments', modelSchema)
