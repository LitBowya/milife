const globals = require("globals");
const pluginJs = require("@eslint/js");

module.exports = {
  languageOptions: {
    globals: globals.browser,
  },
  ...pluginJs.configs.recommended,
  ignores: ["node_modules/", "build/", "dist/"],
  rules: {
    "no-undef": ["error", { typeof: true }],
    "no-process-env": "off",
  },
};
