export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    moduleFileExtensions: ['ts', 'js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
};
