import commonConfig from './jest.config.base';

export default {
    ...commonConfig,
    testMatch: ['**/__tests__/integration/**/*.ts'],
};
