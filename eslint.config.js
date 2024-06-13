const globals = require("globals");
const js = require("@eslint/js");

const OFF = 0, WARN = 1, ERROR = 2; // eslint-disable-line no-unused-vars

module.exports = [
  js.configs.recommended,
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {files: ["tests/**/*"], "env": {"jest": true}},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      "comma-dangle": [ERROR, "always-multiline"],
      "curly": [ERROR, "multi-line"],
      "default-case": [ERROR, {commentPattern: "^no\\sdefault\\srequired"}],
      "default-param-last": ERROR,
      "dot-notation": ERROR,
      "eqeqeq": [ERROR, "always"],
      "grouped-accessor-pairs": [ERROR, "getBeforeSet"],
      "new-cap": [ERROR, {
        capIsNew: true,
        newIsCap: true,
      }],
      "no-console": ERROR,
      "no-else-return": ERROR,
      "no-empty": ERROR,
      "no-empty-function": ERROR,
      "no-extra-bind": ERROR,
      "no-implicit-coercion": ERROR,
      "no-lone-blocks": ERROR,
      "no-lonely-if": ERROR,
      "no-magic-numbers": ERROR,
      "no-nested-ternary": ERROR,
      "no-param-reassign": WARN,
      "no-var": ERROR,
      "prefer-const": ERROR,
      "prefer-destructuring": ERROR,
      "prefer-object-has-own": ERROR,
      "prefer-object-spread": ERROR,
      "prefer-template": ERROR,
      "require-await": ERROR,
      "require-yield": ERROR,
    },
  },
];