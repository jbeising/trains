const express = require('express')

const HealthRoute = require('./modules/health/health.route')

module.exports = (dependencies) => express.Router()
  .use('/health', HealthRoute(dependencies))
