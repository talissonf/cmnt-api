const model = require('./../model/users')
const JWT = require('jwt-simple')
const SECRET = 'Wc7KtlMRm3ixpG7N1S5a0SrmRE4lTHu0ALTuCTBrAr64YIvxmiD8gX7TGcCN8QH' // segredo para gerar token
/**
 * Middleware para validar o token informado nas requisições.
 */
const tokenIsValid = (request, response, next) => {
  // verifico se o access_token foi enviado de alguma forma
  // no body, como querystring ou informado no headers da requisição
  let token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['x-access-token']
  // se for infomado
  if (token) {
    try {
      // tento decoficado o token informado
      let tokenDecoded = JWT.decode(token, SECRET)

      // verifico se a data de expiração do token 
      // é menor ou igual a atual
      if (tokenDecoded.exp <= Date.now()) { // se for o token expirou
        response.status(401) // não autorizado
        return response.json(JSON.stringify({ erro: 'Token expired.' })) // echo
      }
      // se o token não estiver expirado
      model.findOne({ _id: tokenDecoded.iss }, (err, user) => {
        // se não houver usuário vinculado ao objectId
        // informado no token
        // invalida a requisição
        if (err) {
          response.status(401)
          return response.send(JSON.stringify({ erro: 'Token invalid.' }))
        }
        // se houver seta o usuário na requisição
        request.user = user
        // chama próxima função do express
        return next()
      })

    } catch (error) {
      response.status(401)
      return response.json(JSON.stringify({ erro: 'Token invalidérrimo. Refaça login.' }))
    }
  }
  // se o token não for informado
  // retorna erro
  response.status(401)
  return response.send(JSON.stringify({ erro: 'Token not found.' }))
}
// exporta o middleware como módulo
module.exports = tokenIsValid
