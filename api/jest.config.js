module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '\\.test\\.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
