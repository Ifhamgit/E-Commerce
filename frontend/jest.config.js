// jest.config.js
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "transform": {
      "^.+\\.(js|jsx)$": "esm/jest"
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
  