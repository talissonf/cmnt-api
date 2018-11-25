const model = require('./../model/users') // Model usuários
const JWT = require('jwt-simple') // JWT 
const moment = require('moment') // moment
const SECRET = 'Wc7KtlMRm3ixpG7N1S5a0SrmRE4lTHu0ALTuCTBrAr64YIvxmiD8gX7TGcCN8QH' // segredo para gerar token

// realiza login
const login = (request, response) => { // instâncias request, response são passadas através do express quando o login é solicitado no resource
  let mail = request.body.email || '' // pega email do request.body da requisição ou seta como vazio
  let hash = request.body.hash || '' // pega senha do body da requisição ou seta como vazio
  // se o body for vazio retorna erro 401
  if (mail === '' || hash === '') {
    response.status(401) // não autorizado
    return response.send(JSON.stringify({ erro: 'Email or Hash is empty' })) // envia mensagem de erro
  }
  // se houve body busca o usuário no mongo através do e-mail informado
  model.findOne({ email: mail }, function (err, user) {
    if (err) { // se não houve usuário 
      response.status(401) // não autorizado
      return response.send(JSON.stringify({ erro: 'User not found.' })) // messagem de erro
    }
    // se houver checa se a senha informada bate com o bcrypt gerado na criação da conta
    user.checkHash(hash, (isMatch) => {
      if (!isMatch) { // se não bater a senha informada é inválida
        response.status(401) // não autorizada
        return response.send(JSON.stringify({ erro: 'Password not match.' })) // echo
      }
      // se bater as senhas gero o token
      // data de expiração do token
      let expires = moment().add(7, 'days').valueOf()
      // bearear 
      let token = JWT.encode({
        iss: user._id, // user._id
        exp: expires // validade do token
      }, SECRET) // segredo para criação do token
      // token gerado e enviado 
      return response.json({
        token: token,
        expires: expires,
        user: user.toJson()
      })
    })
  })
}

module.exports = login
