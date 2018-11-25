const model = require('./../model/articles')

module.exports = {
  post: (request, response) => {
    let article = new model(request.body)
    article.save((err) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'Erro: ' + err }))
      }
      response.status(201)
      return response.json({ message: 'Article created.' })
    })
  },
  put: (request, response) => {
    model.findById(request.params.id, (err, article) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'Article not found.' }))
      }
      // ..

      article.save(err => {
        if (err) {
          response.status(400)
          return response.send(JSON.stringify({ erro: 'Erro with article update.' }))
        }
        // se atualizar retorna 204 como statusCode
        return response.status(204)
      })
    })
  },
  get: (request, response) => {
    model.findById(request.params.id, (err, article) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'Article not found.' }))
      }
      response.status(200)
      return response.send(article)
    })
  },
  getAll: (request, response) => {
    model.find((erro, article) => {
      if (erro) {
        response.status(400)
        return response.send(erro)
      }
      response.status(200)
      return response.json(article)
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