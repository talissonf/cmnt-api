const model = require('./../model/comments')

module.exports = {
  post: (request, response) => {
    let comment = new model(request.body)
    comment.save((err) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'Erro: ' + err }))
      }
      response.status(201)
      return response.json({ message: 'comment created.' })
    })
  },
  put: (request, response) => {
    model.findById(request.params.id, (err, comment) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'comment not found.' }))
      }
      // ..

      comment.save(err => {
        if (err) {
          response.status(400)
          return response.send(JSON.stringify({ erro: 'Erro with comment update.' }))
        }
        // se atualizar retorna 204 como statusCode
        return response.status(204)
      })
    })
  },
  get: (request, response) => {
    model.findById(request.params.id, (err, comment) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'comment not found.' }))
      }
      response.status(200)
      return response.send(comment)
    })
  },
  getAll: (request, response) => {
    model.find((erro, comment) => {
      if (erro) {
        response.status(400)
        return response.send(erro)
      }
      response.status(200)
      return response.json(comment)
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