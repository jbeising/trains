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
        },
        arrivalTimes: {
          type: 'array',
          items: {
            type: 'string',
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
}

module.exports = Train
