export default {
  testEnvironment: 'jest-environment-node',
  transform: {},
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/database/postgres/**/*.js', '!src/index.js']
}
