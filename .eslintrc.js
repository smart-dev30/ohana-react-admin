const fs = require("fs");

const isProduction =
  process.env.NODE_ENV === "production" || process.env.CI === "true";

const prettierOptions = JSON.parse(fs.readFileSync(".prettierrc", "utf8"));

module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true
  },
  plugins: ["prettier", "json"],
  rules: {
    "prettier/prettier": [1, prettierOptions],
    "no-console": isProduction ? 2 : 1,
    "no-debugger": isProduction ? 2 : 1,
    "react/forbid-prop-types": 0,
    "react/jsx-no-bind": 2,
    "react/jsx-boolean-value": 2,
    "react/jsx-handler-names": 2,
    "react/jsx-filename-extension": [2, { extensions: [".js"] }],
    "react/jsx-sort-props": [2, { callbacksLast: true }],
    "react/sort-prop-types": [2, { callbacksLast: true }],
    "react/prop-types": 2
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true
    }
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"]
      }
    }
  }
};
