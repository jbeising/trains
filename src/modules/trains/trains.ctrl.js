module.exports = (dependencies) =>
  Object.entries(module.exports)
    .reduce((acc, [fnName, fn]) => ({
      ...acc,
      [fnName]: fn.bind(null, dependencies),
    }), {})

const addTrain = async () => {

}

const getTrain = async () => {

}

const nextTrains = async () => {

}

Object.assign(module.exports, {
  addTrain,
  getTrain,
  nextTrains,
})
