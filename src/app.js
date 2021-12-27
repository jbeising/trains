const express = require('express')
const helmet = require('helmet')
const util = require('util')

const Router = require('./router')

module.exports = (dependencies) => {
  const app = express()

  loadMiddleware(app)

  const router = Router(dependencies)

  app
    .use(router)
    .use(errorHandler(dependencies))

  return app
}

const loadMiddleware = (app) => {
  app
    .use(helmet())
    .use(express.json())
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
  if (err.details) payload.details = err.details

  if (config.app.debug && err.stack) {
    payload.stack = err.stack
  }

  res.status(err.statusCode).json(payload)
}
