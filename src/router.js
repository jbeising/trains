const express = require('express')

const DocsRoute = require('./modules/docs/docs.route')
const HealthRoute = require('./modules/health/health.route')
const TrainsRoute = require('./modules/trains/trains.route')

module.exports = (dependencies) => express.Router()
  .use('/docs', DocsRoute(dependencies))
  .use('/health', HealthRoute(dependencies))
  .use('/trains', TrainsRoute(dependencies))
