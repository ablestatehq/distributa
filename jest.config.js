
export default {
  transform: {
    "^.+\\.(ts|js|tsx|jsx)?$": "babel-jest"
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-pdf|react-pdf)/)'
  ]
};

