// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    //parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["plugin:vue/recommended"],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    "linebreak-style": [1, "unix"],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    quotes: [1, "double"],

    "no-unused-vars": [1],
    semi: [1, "always", { omitLastInOneLineBlock: true }],
    "spaced-comment": [0],
    "space-before-function-paren": [
      1,
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }
    ]
  }
};
