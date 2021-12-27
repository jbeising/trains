const Train = require('./trains.models')

const { MissingEntityError } = require('../../errors')

module.exports = (dependencies) =>
  Object.entries(module.exports)
    .reduce((acc, [fnName, fn]) => ({
      ...acc,
      [fnName]: fn.bind(null, dependencies),
    }), {})

const addTrain = async () => {

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

const nextTrains = async () => {

}

Object.assign(module.exports, {
  addTrain,
  getTrain,
  nextTrains,
})
