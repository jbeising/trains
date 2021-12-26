const express = require('express')
const helmet = require('helmet')
const util = require('util')

const Router = require('./router')

module.exports = (dependencies) => {
  const app = express()

  loadMiddleware(dependencies, app)

  const router = Router(dependencies)

  app.use(router)

  return app
}

const loadMiddleware = (dependencies, app) => {
  app
    .use(helmet())
    .use(express.json())
    .use(errorHandler(dependencies))
}

/*
 * Handles errors passed to next() in Express. NOTE THAT `next` IS REQUIRED IN THE FUNCTION SIGNATURE,
 * EVEN THOUGH IT IS UNUSED. Otherwise Express will not recognize it as an error handler.
 */
const errorHandler = ({ config }) => (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (!err.statusCode) {
    err.statusCode = 500
  }

  if (err.statusCode === 500) {
    console.error(util.inspect(err))
  }

  const payload = { error: err.message }

  if (config.app.debug && err.stack) {
    payload.stack = err.stack
  }

  res.status(err.statusCode).json(payload)
}
