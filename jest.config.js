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
};
