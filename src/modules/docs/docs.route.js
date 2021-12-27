const express = require('express')
const swaggerUi = require('swagger-ui-express')

module.exports = ({ docsCtrl }) => express.Router()
  .use('/', swaggerUi.serve, swaggerUi.setup(docsCtrl.setupSwagger()))
