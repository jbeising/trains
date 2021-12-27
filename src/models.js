const { LivenessResult } = require('./modules/health/health.models')
const { Train } = require('./modules/trains/trains.models')

module.exports = () => ({
  LivenessResult,
  Train,
})
