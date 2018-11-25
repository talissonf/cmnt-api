const model = require('./../model/blogs')

module.exports = {
  post: (request, response) => {
    let blog = new model(request.body)
    blog.save((err) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'Erro: ' + err }))
      }
      response.status(201)
      return response.json({ message: 'blog created.' })
    })
  },
  put: (request, response) => {
    model.findById(request.params.id, (err, blog) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'blog not found.' }))
      }
      // ..

      blog.save(err => {
        if (err) {
          response.status(400)
          return response.send(JSON.stringify({ erro: 'Erro with blog update.' }))
        }
        // se atualizar retorna 204 como statusCode
        return response.status(204)
      })
    })
  },
  get: (request, response) => {
    model.findById(request.params.id, (err, blog) => {
      if (err) {
        response.status(400)
        return response.send(JSON.stringify({ erro: 'blog not found.' }))
      }
      response.status(200)
      return response.send(blog)
    })
  },
  getAll: (request, response) => {
    model.find((erro, blog) => {
      if (erro) {
        response.status(400)
        return response.send(erro)
      }
      response.status(200)
      return response.json(blog)
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