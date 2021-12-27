const Db = require('./services/db')

module.exports = () => ({
  db: Db(),
})
