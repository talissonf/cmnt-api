const router = require('express').Router()
const validateToken = require('./services/token')
const users = require('./resources/users')
// função next para debug rotas
router.use((request, response, next) => {
  console.log('%s em : api%s', request.method, request.path) //debug
  next()
})

router.post('/login', require('./controller/login'))
/**
 * Usuários
 */
router.route('/users')
  .get(users.getAll)
  .post(users.post)

router.route('/users/:id')
  .get(validateToken, users.get)
  .put(validateToken, users.put)
  .delete(validateToken, users.delete)

module.exports = router
