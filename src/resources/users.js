const model = require('./../model/users')

module.exports = {
  post: (request, response) => {
    let user = new model(request.body)
    user.save((err) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'Erro: ' + err }))
      }
      response.status(201)
      return response.json({ message: 'User created.' })
    })
  },
  put: (request, response) => {
    model.findById(request.params.id, (err, user) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'User not found.' }))
      }
      // ..

      user.save(err => {
        if (err) {
          response.status(400)
          return response.send(JSON.stringify({ erro: 'Erro with user update.' }))
        }
        // se atualizar retorna 204 como statusCode
        return response.status(204)
      })
    })
  },
  get: (request, response) => {
    model.findById(request.params.id, (err, user) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'User not found.' }))
      }
      response.status(200)
      return response.json(user)
    })
  },
  getAll: (request, response) => {
    model.find((erro, user) => {
      if (erro) {
        response.status(400)
        return response.send(erro)
      }
      response.status(200)
      return response.json(user)
    })
  },
  delete: (request, response) => {
    model.remove({ _id: request.params.id }, (err) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: err }))
      }
      // se deletar retorna 204
      return response.status(204)
    })
  }
}