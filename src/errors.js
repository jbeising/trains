class HttpError extends Error {
  constructor({ message, statusCode = 500 }) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }
}

class MissingEntityError extends HttpError {
  constructor ({ message = 'Entity not found', entityId }) {
    super(message, 404)
    this.name = 'MissingEntityError'
    if (entityId) this.details = {entityId}
  }
}

Object.assign(module.exports, {
  HttpError,
  MissingEntityError,
})
