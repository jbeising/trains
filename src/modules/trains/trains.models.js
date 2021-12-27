class Train {
  constructor({ id, arrivalTimes }) {
    this.id = id
    this.arrivalTimes = arrivalTimes
  }

  static definition() {
    return {
      properties: {
        id: {
          type: 'string',
          example: 'TOMO',
        },
        arrivalTimes: {
          type: 'array',
          items: {
            type: 'string',
            minLength: 4,
            maxLength: 4,
            example: '1800',
          },
        },
      },
    }
  }

  toDto() {
    return {
      id: this.id,
      arrivalTimes: this.arrivalTimes.sort(),
    }
  }

  toDbSchema() {
    return {
      id: this.id,
      arrivalTimes: this.arrivalTimes,
      createdAt: new Date(),
    }
  }
}

class TrainStation {
  constructor({ trains }) {
    this.name = 'TOMO Railroad Station'
    this.trains = trains.map((train) => new Train(train))
  }

  static definition() {
    return {
      properties: {
        name: {
          type: 'string',
          example: 'TOMO Railroad Station',
        },
        trains: {
          type: 'array',
          items: {
            '$ref': '#/components/schemas/Train',
          },
        },
        nextTimeOverlap: {
          type: 'object',
          properties: {
            time: {
              type: 'string',
              example: '1100',
            },
            trains: {
              type: 'array',
              items: {
                type: 'string',
                example: ['A1', 'A2', 'B7'],
              },
            },
          },
        },
      },
    }
  }

  findNextTimeOverlap() {
    const timeMap = this.trains.reduce((acc, train) => {
      train.arrivalTimes.forEach((time) => {
        if (!acc[time]) acc[time] = []
        acc[time].push(train.id)
      })

      return acc
    }, {})

    const overlaps = Object.entries(timeMap).reduce((acc, [time, trainIds]) => ({
      ...acc,
      ...trainIds.length > 1 && { [time]: trainIds },
    }), {})

    const now = new Date().toTimeString()
    const [hh, mm] = now.split(':')
    const HhMmNumber = parseInt(`${hh}${mm}`)

    const sortedTimes = Object.keys(overlaps).sort()

    let nextOverlapTime = sortedTimes.find((time) => HhMmNumber < parseInt(time))
    if (!nextOverlapTime) {
      const [ firstOverlapTime ] = sortedTimes
      nextOverlapTime = firstOverlapTime
    }

    return {
      ...nextOverlapTime && {
        time: nextOverlapTime,
        trains: overlaps[nextOverlapTime],
      },
    }
  }

  toDto() {
    return {
      name: this.name,
      trains: this.trains.map((train) => train.toDto()),
      nextTimeOverlap: this.findNextTimeOverlap(),
    }
  }
}

Object.assign(module.exports, {
  Train,
  TrainStation,
})
