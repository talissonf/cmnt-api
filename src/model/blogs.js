const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

let schema = {
  created_at: {
    type: Date,
    default: Date.now
  },
  uid: {
    type: String,
    required: 'userid field is required.'
  },
  title: {
    type: String,
    required: 'blog title is riquired.'
  },
  count: {
    comments: {
      type: Number
    },
    articles: {
      type: Number
    },
    followes: {
      type: Number
    },
    views: {
      total: {
        type: Number
      },
      unique: {
        type: Number
      }
    }
  },
  pictures: {
    small: {
      type: String
    },
    large: {
      type: String
    }
  },
  slug: {
    type: String,
    required: 'Slug name is riquired',
    unique: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}

let modelSchema = new MongoSchema(schema)
module.exports = mongoose.model('blogs', modelSchema)
