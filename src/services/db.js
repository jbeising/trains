module.exports = () => {
  const dbStore = new Map()

  return {
    set(key, val) {
      dbStore.set(key, val)
    },
    get(key) {
      return dbStore.get(key)
    },
    keys() {
      if (!dbStore.size) return []

      return [ ...dbStore.keys() ]
    },
  }
}
