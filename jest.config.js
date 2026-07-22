const { resolve } = require('path');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': resolve(__dirname, './src/$1'),
    '^react-native-safe-area-context$': resolve(
      __dirname,
      './node_modules/react-native-safe-area-context/jest/mock.tsx'
    ),
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.expo/',
    '/android/',
    '/ios/',
    '/dist/',
  ],
  collectCoverageFrom: [
    'src/features/conversations/utils/filter-conversations.ts',
    'src/features/conversations/utils/filter-users.ts',
    'src/lib/routes.ts',
    'src/lib/theme.ts',
  ],
  coverageReporters: ['text', 'text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
