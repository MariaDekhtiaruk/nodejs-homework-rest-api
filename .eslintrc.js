module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true, // Add the "jest" environment
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Allow using expect assertions in Jest tests
    'jest/expect-expect': 'error',
  },
  plugins: ['jest'], // Add the "jest" plugin
};
