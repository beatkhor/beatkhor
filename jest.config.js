module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '**/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!./jest.config.js',
        '!**/src/main.ts',
        '!**/**module.ts'
    ],
};
