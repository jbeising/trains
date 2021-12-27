const express = require('express')

const validate = require('../../middleware/validation.middleware')
const validation = require('./trains.validation')

module.exports = ({ trainsCtrl }) => express.Router()
  /**
   * @openapi
   *
   *  /trains:
   *    post:
   *      tags:
   *        - Trains
   *      summary: Add a train to the station
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                id:
   *                  type: string
   *                  required: true
   *                  minLength: 1
   *                  maxLength: 4
   *                  example: TOMO
   *                arrivalTimes:
   *                  type: array
   *                  required: true
   *                  items:
   *                    type: string
   *                    required: true
   *                    minLength: 4
   *                    maxLength: 4
   *                    example: 1400
   *      responses:
   *        200:
   *          content:
   *            application:json:
   *              schema:
   *                $ref: "#/components/schemas/Train"
   *        400:
   *          description: Validation error
   *          content:
   *            application:json:
   *              schema:
   *                type: string
   *        403:
   *          description: Train with given id already exists
   *          content:
   *            application:json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                  details:
   *                    description: Optional details about error
   *                    type: object
   */
  .post('/', validate(validation.addTrain), addTrain({ trainsCtrl }))
  /**
   * @openapi
   *
   *  /trains/next:
   *    get:
   *      tags:
   *        - Trains
   *      summary: Find the next time that more than one train departs
   *      description: Returns empty `nextTimeOverlap` object if no overlapping times are found
   *      responses:
   *        200:
   *          content:
   *            application:json:
   *              schema:
   *                $ref: "#/components/schemas/TrainStation"
   *        400:
   *          description: Validation error
   *          content:
   *            application:json:
   *              schema:
   *                type: string
   */
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
   *        400:
   *          description: Validation error
   *          content:
   *            application:json:
   *              schema:
   *                type: string
   *        404:
   *          description: Train with given id not found
   *          content:
   *            application:json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                  details:
   *                    description: Optional details about error
   *                    type: object
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
