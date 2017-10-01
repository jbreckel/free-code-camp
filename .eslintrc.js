module.exports = {
  extends: 'react-app',

  rules: {
    'prettier/prettier': ['error', require('./prettier.config')],
  },
  plugins: ['prettier'],
}
