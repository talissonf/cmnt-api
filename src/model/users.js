const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// valida e-mail
const validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
// Esquema da coleção de usuários no mongo
// nome, tipo, obrigatório ?, validação?
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
// instância do mongo schema
let modelSchema = new MongoSchema(schema)
// cria hash bcrypt para a senha antes de salvar na coleção
const hashIsValid = (next) => {
  let user = this

  if (!user.isModified('hash')) {
    return next()
  }

  bcrypt.genSalt(5, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.hash, salt, null, (erro, pass) => {
      if (err) {
        return next(err)
      }
      user.hash = pass
      next()
    })
  })
}
// registra a função no schema
modelSchema.pre('save', hashIsValid)
// registra metodo para verifica se 
// se a senha informada no login bate com
// a que tem no mongo
modelSchema.methods.checkHash = (hash, next) => {
  bcrypt.compare(hash, this.hash, (err, isMatch) => {
    if (err) {
      return next(err)
    }
    next(isMatch)
  })
}
// exporta o módulo
module.exports = mongoose.model('users', modelSchema)
