module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/**/*.test.(ts|js)'],
    testEnvironment: 'node',
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/api/**/*.controller*.{ts,js}',
        'src/api/**/*.resolver*.{ts,js}',
        'src/api/**/schemaDirectives/*.{ts,js}',
        '!src/api/**/schemaDirectives/index.{ts,js}',
    ],
}
