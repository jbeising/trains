const express = require('express')

const DocsRoute = require('./modules/docs/docs.route')
const HealthRoute = require('./modules/health/health.route')

module.exports = (dependencies) => express.Router()
  .use('/docs', DocsRoute(dependencies))
  .use('/health', HealthRoute(dependencies))
