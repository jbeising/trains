const DocsCtrl = require('./modules/docs/docs.ctrl')
const HealthCtrl = require('./modules/health/health.ctrl')

module.exports = (dependencies) => ({
  docsCtrl: DocsCtrl(dependencies),
  healthCtrl: HealthCtrl(dependencies),
})
