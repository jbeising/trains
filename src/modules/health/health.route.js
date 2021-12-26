const express = require('express')

module.exports = (dependencies) => express.Router()
  .get('/liveness', getLiveness(dependencies))

const getLiveness = ({ healthCtrl }) =>
  (req, res, next) =>
    healthCtrl.getLiveness()
      .then((result) => res.json(result))
      .catch(next)
