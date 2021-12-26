const { LivenessResult } = require('./health.models')

module.exports = (dependencies) =>
  Object.entries(module.exports)
    .reduce((acc, [fnName, fn]) => ({
      ...acc,
      [fnName]: fn.bind(null, dependencies),
    }), {})

const getLiveness = async ({ config }) => {
  const liveness = new LivenessResult({
    appName: config.app.name,
    appVersion: config.app.version,
  })

  return liveness.toDto()
}

Object.assign(module.exports, {
  getLiveness,
})
