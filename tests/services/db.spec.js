const Db = require('../../src/services/db')

describe('Db', () => {
  describe('set', () => {
    it('should set a key/val', () => {
      const db = Db()

      expect(db.keys().length).toBe(0)

      db.set('hi', 'hello')

      expect(db.keys().length).toBe(1)
      expect(db.keys().includes('hi')).toBe(true)
    })
  })

  describe('get', () => {
    it('should get a val by the provided key', () => {
      const db = Db()

      const key = 'hi'
      const val = 'hello'

      db.set(key, val)

      const returnedVal = db.get(key)

      expect(returnedVal).toBe(val)
    })

    it('should return undefined if the key is not found', () => {
      const db = Db()

      const key = 'hi'
      const returnedVal = db.get(key)

      expect(returnedVal).toBeUndefined()
    })
  })

  describe('keys', () => {
    it('should return an empty array if the db is empty', () => {
      const db = Db()

      const keys = db.keys()

      expect(keys.length).toBe(0)
    })

    it('should return the list of keys', () => {
      const db = Db()

      const keysToAdd = [1, 2, 3]

      keysToAdd.forEach((key) => db.set(key, 'a'))

      const keys = db.keys()

      expect(keys.length).toBe(keysToAdd.length)
      expect(keys.every((key) => keysToAdd.includes(key)))
    })
  })
})
