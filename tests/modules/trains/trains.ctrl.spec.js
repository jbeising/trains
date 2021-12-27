const TrainsCtrl = require('../../../src/modules/trains/trains.ctrl')
const { MissingEntityError, ForbiddenError } = require('../../../src/errors')

describe('Trains Controller', () => {
  let deps
  beforeEach(() => {
    deps = {
      db: {
        get: jest.fn().mockImplementation((id) => ({
          id,
          arrivalTimes: ['1000'],
        })),
        set: jest.fn(),
        keys: jest.fn().mockReturnValue(['1', '2']),
      },
    }
  })

  it('should return an object with functions', () => {
    const ctrl = TrainsCtrl(deps)
    const [ firstFnName ] = Object.keys(ctrl)

    expect(ctrl).toBeInstanceOf(Object)
    expect(ctrl[firstFnName]).toBeInstanceOf(Function)
  })

  describe('addTrain', () => {
    it('should add a train if not already in the db', async () => {
      deps.db.get.mockReturnValueOnce(undefined)

      await TrainsCtrl.addTrain(deps, {
        id: '1',
        arrivalTimes: ['1000'],
      })

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

  describe('nextTrains', () => {
    it('should return the time and trains information for the next time overlap', async () => {
      const nextTrains = await TrainsCtrl.nextTrains(deps)

      expect(nextTrains).toHaveProperty('nextTimeOverlap')
      expect(nextTrains.nextTimeOverlap).toMatchObject({
        time: '1000',
        trains: ['1', '2'],
      })
    })

    // Note, I'm expecting that this test will never be run before 1am :)
    it('should return the next available time if none are found for today', async () => {
      deps.db.get
        .mockReturnValueOnce({ id: '1', arrivalTimes: ['0100'] })
        .mockReturnValueOnce({ id: '2', arrivalTimes: ['0100', '0400'] })

      const nextTrains = await TrainsCtrl.nextTrains(deps)

      expect(nextTrains).toHaveProperty('nextTimeOverlap')
      expect(nextTrains.nextTimeOverlap).toMatchObject({
        time: '0100',
        trains: ['1', '2'],
      })
    })
  })
})
