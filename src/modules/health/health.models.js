class LivenessResult {
  constructor({ appName, appVersion }) {
    this.app = {
      name: appName,
      status: 'OK',
      version: appVersion,
    }
  }

  toDto() {
    return this.app
  }
}

Object.assign(module.exports, {
  LivenessResult,
})
