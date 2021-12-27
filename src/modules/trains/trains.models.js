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
      arrivalTimes: this.arrivalTimes,
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

module.exports = Train
