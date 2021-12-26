require('dotenv').config()

const Package = require('../package.json')

const bool = (str = '') =>
  str &&
  typeof str === 'string' &&
  (str === '1' || str.toLowerCase() === 'true')

module.exports = () => ({
  app: {
    name: Package.name,
    version: Package.version,
    debug: bool(process.env.APP_DEBUG),
  },
  httpServer: {
    port: parseInt(process.env.HTTP_PORT || '3000', 10),
  },
})
