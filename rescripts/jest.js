module.exports = {
  jest: config => ({
    ...config,
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleNameMapper: {
      '.+\\.(svg|png|jpg)$': 'identity-obj-proxy',
    },
  }),
}
