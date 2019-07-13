// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    // standard风格的依赖包
    "standard",
    // standard风格的依赖包
    "promise"
  ],
  // add your custom rules here
  'rules': {
    // 代码块中定义functions
    "no-inner-declarations": 0,
    // 允许 use ==
    "eqeqeq": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    "space-before-function-paren": 0,
    "prefer-promise-reject-errors": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 0 : 0
  }
}
