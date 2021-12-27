const TrainsCtrl = require('../../../src/modules/trains/trains.ctrl')
const { MissingEntityError } = require('../../../src/errors')

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
