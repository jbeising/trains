const dbStore = {}

module.exports = () => ({
  set(key, val) {
    dbStore[key] = val
  },
  get(key) {
    return dbStore[key]
  },
  keys() {
    const dbKeys = Object.keys(dbStore)
    if (dbKeys.length) return dbKeys

    return []
  },
})
