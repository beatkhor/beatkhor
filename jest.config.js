const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '**/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/models/**',
        '!./jest.config.js',
        '!**/src/main.ts',
        '!**/**module.ts'
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ["<rootDir>"],
};
