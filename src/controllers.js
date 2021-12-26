const HealthCtrl = require('./modules/health/health.ctrl')

module.exports = (dependencies) => ({
  healthCtrl: HealthCtrl(dependencies),
})
