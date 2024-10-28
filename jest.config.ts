import type { Config } from 'jest';

const COVERAGE_THRESHOLD = 80;

const config: Config = {
  clearMocks: true,

  // indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: "jsdom",

  // enforce coverage thresholds
  coverageThreshold: {
    global: {
      // branches: COVERAGE_THRESHOLD,
      // functions: COVERAGE_THRESHOLD,
      lines: COVERAGE_THRESHOLD,
      statements: COVERAGE_THRESHOLD,
    },
  },

  // add Babel support for transforming JavaScript, TypeScript, and JSX files during testing
  transform: {
    '^.+\\.(ts|tsx)$': ["babel-jest", { configFile: "./test-babel.config.js" }],
    '^.+\\.(js|jsx)$': ["babel-jest", { configFile: "./test-babel.config.js" }],
  },

  // allow Jest to handle these file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',   // Mock CSS modules
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Handle other styles
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock images and static assets
  },

  testPathIgnorePatterns: [
    '/node_modules/',          // Default ignored folder
    '/e2e/',             // Example: ignore e2e-tests folder
    '/dist/',                  // Example: ignore dist folder for build files
  ],

  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;