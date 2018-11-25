const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

let schema = {
  created_at: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  hash: {
    type: String,
    required: 'Passwood is required'
  },
  birthdate: {
    year: {
      type: Number,
      min: 1900,
      max: 2020
    },
    month: {
      type: Number,
      min: 1,
      max: 12
    },
    day: {
      type: Number,
      min: 1,
      max: 31
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

const hashIsValid = (hash, next) => {
  let user = this

  if (!user.isModified('hash')) {
    return next()
  }

  bcrypt.genSalt(5, (err, salt) => {
    if (err) {
      return next()
    }
    bcrypt.hash(user.hash, salt, null, (erro, pass) => {
      if (err) {
        return next()
      }
      user.hash = pass
      next()
    })
  })
}

modelSchema.pre('save', hashIsValid)
modelSchema.methods.checkHash = (hash, next) => {
  bcrypt.compare(hash, this.hash, (err, isMatch) => {
    if (err) {
      return next(err)
    }
    next(isMatch)
  })
}

module.exports = mongoose.model('users', modelSchema)
