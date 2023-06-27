module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.css$': '<rootDir>/config/cssTransform.js', 
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!react-datepicker)',
        '/node_modules/(?!(react-datepicker)/)',
      ],
  };
