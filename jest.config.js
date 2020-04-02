module.exports = {
  clearMocks: true,

  collectCoverageFrom: [
    'src/**/*.{js,jsx}',

    '!**/src/__mocks__/**',

    '!**/src/__tests__/**',

    '!**/src/index.js',

    '!**/enzyme.config.js',

    '!**/jest.config.js',

    '!**/src/pages/auth/Login/index.js',

    '!**src/pages/forgetPassword/index.js',

    '!**src/pages/resetPassword/index.js',
    
    '!**src/utils/helpers/success.js',

    '!**src/utils/helpers/errorHandle.js',

    '!**/webpack.config.js',

    '!**/server.js',
  ],

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__'],

  coverageReporters: ['json', 'text', 'lcov', 'clover'],

  moduleDirectories: ['node_modules'],

  moduleFileExtensions: ['js', 'json', 'jsx'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',

    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },

  setupFiles: ['<rootDir>/enzyme.config.js'],

  snapshotSerializers: ['enzyme-to-json/serializer'],

  testEnvironment: 'jsdom',

  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  testURL: 'http://localhost',

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  verbose: false,

  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './coverage/html-report',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],

  collectCoverage: true,
};
