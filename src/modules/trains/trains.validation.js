const Joi = require('Joi')

const TrainId = Joi.string().required().min(1).max(4).uppercase().trim()

module.exports = {
  addTrain: {
    schema: Joi.object({
      id: TrainId,
      times: Joi.array().required().min(1)
        .items(
          Joi.string().required().min(5).max(8).trim(),
        ),
    }),
    getData: (req) => req.body,
  },
  getTrain: {
    schema: Joi.object({
      id: TrainId,
    }),
    getData: (req) => req.params,
  },
}
