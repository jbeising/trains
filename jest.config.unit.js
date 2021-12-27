const genericJestConfig = require('./jest.config')

module.exports = {
  ...genericJestConfig,
  collectCoverage     : true,
  coverageReporters   : ['lcov', 'text-summary'],
  coverageDirectory   : 'coverage/',
  collectCoverageFrom : [
    'src/**/*.js',
  ],
  coverageThreshold : {
    global : {
      statements : 90,
      branches   : 90,
      functions  : 90,
      lines      : 90,
    },
  },
  testMatch : [
    '**/*.spec.js',
  ],
  testPathIgnorePatterns : [
    '/node_modules/',
  ],
  roots : [
    '<rootDir>/tests/',
  ],
}
