const router = require('express').Router()
const validateToken = require('./services/token')
const users = require('./resources/users')
const blogs = require('./resources/blogs')
const articles = require('./resources/articles')
const comments = require('./resources/comments')

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

/**
 * Blogs
 */
router.route('/blogs')
  .post(validateToken, blogs.post)

router.route('/blogs/:id')
  .get(validateToken, blogs.get)
  .put(validateToken, blogs.put)
  .delete(validateToken, blogs.delete)
/**
 * Articles
 */
router.route('/articles')
  .post(validateToken, articles.post)

router.route('/articles/:id')
  .post(validateToken, articles.post)
  .get(validateToken, articles.get)
  .put(validateToken, articles.put)
  .delete(validateToken, articles.delete)
/**
 * Comments
 */
router.route('/comments')
  .post(validateToken, comments.post)

router.route('/comments/:id')
  .post(validateToken, comments.post)
  .get(validateToken, comments.get)
  .put(validateToken, comments.put)
  .delete(validateToken, comments.delete)

module.exports = router
