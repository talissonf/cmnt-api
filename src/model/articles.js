const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

let schema = {
  created_at: {
    type: Date,
    default: Date.now
  },
  blog_id: {
    type: String,
    required: 'blog_id field is required.'
  },
  title: {
    type: String,
    required: 'article title is riquired.'
  },
  body: {
    type: String,
    require: 'article body is required.'
  },
  html: {
    type: String
  },
  hits: {
    comments: {
      type: Number
    },
    votes: {
      type: {
        pos: {
          type: Number
        },
        neg: {
          type: Number
        }
      }
    }
  },
  taxonomies: {
    categories: {
      type: Array,
      require: 'article category no found.'
    },
    tags: {
      type: Array
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
    required: false
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}

let modelSchema = new MongoSchema(schema)
module.exports = mongoose.model('articles', modelSchema)
