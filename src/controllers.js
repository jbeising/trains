const DocsCtrl = require('./modules/docs/docs.ctrl')
const HealthCtrl = require('./modules/health/health.ctrl')
const TrainsCtrl = require('./modules/trains/trains.ctrl')

module.exports = (dependencies) => ({
  docsCtrl: DocsCtrl(dependencies),
  healthCtrl: HealthCtrl(dependencies),
  trainsCtrl: TrainsCtrl(dependencies),
})
