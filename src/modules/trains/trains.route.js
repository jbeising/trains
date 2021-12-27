const express = require('express')

const validate = require('../../middleware/validation.middleware')
const validation = require('./trains.validation')

module.exports = ({ trainsCtrl }) => express.Router()
  .post('/', validate(validation.addTrain), addTrain({ trainsCtrl }))
  .get('/next', nextTrains({ trainsCtrl }))
  /**
   * @openapi
   *
   *  /trains/{id}:
   *    get:
   *      tags:
   *        - Trains
   *      summary: Get a train by id
   *      parameters:
   *        - name: id
   *          in: path
   *          description: Train identifier
   *          required: true
   *          schema:
   *            type: string
   *            minLength: 1
   *            maxLength: 4
   *      responses:
   *        200:
   *          content:
   *            application:json:
   *              schema:
   *                $ref: "#/components/schemas/Train"
   */
  .get('/:id', validate(validation.getTrain), getTrain({ trainsCtrl }))

const addTrain = ({ trainsCtrl }) =>
  (req, res, next) =>
    trainsCtrl.addTrain(req.cleanData)
      .then((result) => res.json(result))
      .catch(next)

const nextTrains = ({ trainsCtrl }) =>
  (req, res, next) =>
    trainsCtrl.nextTrains()
      .then((result) => res.json(result))
      .catch(next)

const getTrain = ({ trainsCtrl }) =>
  (req, res, next) =>
    trainsCtrl.getTrain(req.cleanData)
      .then((result) => res.json(result))
      .catch(next)
