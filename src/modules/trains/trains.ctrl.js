const { Train, TrainStation } = require('./trains.models')
const { MissingEntityError, ForbiddenError } = require('../../errors')

module.exports = (dependencies) =>
  Object.entries(module.exports)
    .reduce((acc, [fnName, fn]) => ({
      ...acc,
      [fnName]: fn.bind(null, dependencies),
    }), {})

const addTrain = async ({ db }, requestData) => {
  const newTrain = new Train(requestData)

  const existingTrain = db.get(newTrain.id)

  if (existingTrain) {
    throw new ForbiddenError({
      message: 'A train already exists with the given id',
      entityId: existingTrain.id,
    })
  }

  db.set(newTrain.id, newTrain.toDbSchema())

  return newTrain.toDto()
}

const getTrain = async ({ db }, { id }) => {
  const train = db.get(id)

  if (!train) {
    throw new MissingEntityError({
      message: 'Train not found',
      entityId: id,
    })
  }

  return new Train(train).toDto()
}

const nextTrains = async ({ db }) => {
  const trains = db.keys().map((key) => db.get(key))

  const station = new TrainStation({ trains })

  return station.toDto()
}

Object.assign(module.exports, {
  addTrain,
  getTrain,
  nextTrains,
})
