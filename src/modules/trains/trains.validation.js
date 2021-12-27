const Joi = require('Joi')

const TrainId = Joi.string().required().min(1).max(4).uppercase().trim()

const timeValidation = (value, helper) => {
  const parsed = parseInt(value)

  if (isNaN(parsed) || parsed < 0 || parsed > 2359) {
    return helper.message('Given times must be in 24 hour HHMM format and between \'0000\' and \'2359\'')
  }

  return value
}

module.exports = {
  addTrain: {
    schema: Joi.object({
      id: TrainId,
      arrivalTimes: Joi.array().required().min(1)
        .items(
          Joi.string().required().min(4).max(4).custom(timeValidation),
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
