class LivenessResult {
  constructor({ appName, appVersion }) {
    this.app = {
      name: appName,
      status: 'OK',
      version: appVersion,
    }
  }

  static definition() {
    return {
      properties: {
        app: {
          properties: {
            name: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
            version: {
              type: 'string',
            },
          },
        },

      },
    }
  }

  toDto() {
    return this.app
  }
}

Object.assign(module.exports, {
  LivenessResult,
})
