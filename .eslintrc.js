module.exports = {
  extends: 'signavio',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/*.test.js',
        ]
      },
    ]
  },
}
