/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const COVERAGE_THRESHOLD = 80;

const config: Config = {

  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  // Enforce coverage thresholds
  coverageThreshold: {
    global: {
      branches: COVERAGE_THRESHOLD,
      functions: COVERAGE_THRESHOLD,
      lines: COVERAGE_THRESHOLD,
      statements: COVERAGE_THRESHOLD,
    },
  },
};

export default config;
