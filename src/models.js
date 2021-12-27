const { LivenessResult } = require('./modules/health/health.models')
const { Train, TrainStation } = require('./modules/trains/trains.models')

module.exports = () => ({
  LivenessResult,
  Train,
  TrainStation,
})
