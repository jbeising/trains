const swaggerJsDoc = require('swagger-jsdoc')

module.exports = (dependencies) =>
  Object.entries(module.exports)
    .reduce((acc, [fnName, fn]) => ({
      ...acc,
      [fnName]: fn.bind(null, dependencies),
    }), {})

const setupSwagger = ({ config, models }) => swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.app.name,
      version: config.app.version,
    },
    servers: [
      { url: `http://localhost:${config.httpServer.port}`, description: 'local' },
    ],
    components: {
      schemas: {
        LivenessResult: models.LivenessResult.definition(),
      },
    },
  },
  apis: [
    './src/modules/**/*.js',
  ],
})

Object.assign(module.exports, {
  setupSwagger,
})
