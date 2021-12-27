const express = require('express')

module.exports = (dependencies) => express.Router()
  /**
   * @openapi
   *
   *  /liveness:
   *    get:
   *      tags:
   *        - Health
   *      summary: Server liveness check
   *      responses:
   *        200:
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/components/schemas/LivenessResult"
   *
   *
   */
  .get('/liveness', getLiveness(dependencies))

const getLiveness = ({ healthCtrl }) =>
  (req, res, next) =>
    healthCtrl.getLiveness()
      .then((result) => res.json(result))
      .catch(next)
