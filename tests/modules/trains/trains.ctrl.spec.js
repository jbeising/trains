const TrainsCtrl = require('../../../src/modules/trains/trains.ctrl')
const { MissingEntityError, ForbiddenError } = require('../../../src/errors')

describe('Trains Controller', () => {
  let deps
  beforeEach(() => {
    deps = {
      db: {
        get: jest.fn().mockReturnValue({
          id: 'test',
          arrivalTimes: [500, 1000, 1300],
        }),
        set: jest.fn(),
        keys: jest.fn(),
      },
    }
  })

  describe('addTrain', () => {
    it('should add a train if not already in the db', async () => {
      deps.db.get.mockReturnValueOnce(undefined)

      await TrainsCtrl.addTrain(deps, {})

      expect(deps.db.set).toHaveBeenCalled()
    })

    it('should throw a "ForbiddenError" if the train already exists', async () => {
      const thrownError = await TrainsCtrl.addTrain(deps, {})
        .catch((error) => error)

      expect(thrownError).toBeInstanceOf(ForbiddenError)
      expect(thrownError).toHaveProperty('statusCode', 403)
    })
  })

  describe('getTrain', () => {
    it('should return the train if found', async () => {
      const train = await TrainsCtrl.getTrain(deps, { id: 'test' })

      expect(train).toHaveProperty('id', 'test')
    })

    it('should throw a "MissingEntityError" if not found', async () => {
      deps.db.get.mockReturnValueOnce(undefined)

      const thrownError = await TrainsCtrl.getTrain(deps, { id: 'test' })
        .catch((error) => error)

      expect(thrownError).toBeInstanceOf(MissingEntityError)
      expect(thrownError).toHaveProperty('statusCode', 404)
    })
  })
})
