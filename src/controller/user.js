const User = require('./../model/users')
// Registra novo usuário
module.exports = (request, response) => {
  let user = new User(request.body)
  user.save(err => {
    if (err) {
      response.status(401)
      return response.send(err)
    }
    return response.json(user)
  })
}