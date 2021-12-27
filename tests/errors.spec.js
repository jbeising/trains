const { HttpError, MissingEntityError, ForbiddenError } = require('../src/errors')

describe('errors', () => {
  describe('HttpError', () => {
    it('should default the status code to 500', () => {
      const err = new HttpError({ message: 'Uh oh' })

      expect(err).toHaveProperty('statusCode', 500)
    })
  })

  describe('MissingEntityError', () => {
    it('should default the status code to 404', () => {
      const err = new MissingEntityError({ message: 'Uh oh' })

      expect(err).toHaveProperty('statusCode', 404)
    })

    it('should default the message to "Entity not found"', () => {
      const err = new MissingEntityError()

      expect(err).toHaveProperty('message', 'Entity not found')
    })

    it('should add details if there is an entityId', () => {
      const err = new MissingEntityError({ message: 'Uh oh', entityId: 'abc-123'})

      expect(err).toHaveProperty('details', { entityId: 'abc-123' })
    })
  })

  describe('ForbiddenError', () => {
    it('should default the status code to 403', () => {
      const err = new ForbiddenError({ message: 'Uh oh' })

      expect(err).toHaveProperty('statusCode', 403)
    })

    it('should default the message to "Forbidden operation"', () => {
      const err = new ForbiddenError()

      expect(err).toHaveProperty('message', 'Forbidden operation')
    })

    it('should add details if there is an entityId', () => {
      const err = new ForbiddenError({ message: 'Uh oh', entityId: 'abc-123'})

      expect(err).toHaveProperty('details', { entityId: 'abc-123' })
    })
  })
})
