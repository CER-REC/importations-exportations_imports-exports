const Express = require('express')
const Path = require('path')
const MustacheExpress = require('mustache-express')

const ApplicationRoot = require('../../ApplicationRoot.js')

const DevelopmentPageMiddleware = () => {
  const app = Express()

  // view engine setup
  app.engine('mustache', MustacheExpress())

  app.set('views', Path.join(ApplicationRoot, 'servers', 'views'))
  app.set('view engine', 'mustache')

  const router = Express.Router()

  router.get('/screenshot', (req, res) => {
    res.render('screenshot')
  })

  // Direct the root to the newer template
  router.get('/(\\w+)?', (req, res) => {
    res.render('app', { title: 'WET 4.0.20' })
  })

  app.use(router)

  // Turn off caching!
  app.disable('view cache')

  return app
}

module.exports = DevelopmentPageMiddleware
