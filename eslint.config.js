// eslint.config.js
const { defineConfig } = require("eslint/config");
const standard = require("eslint-config-standard");
const importPlugin = require("eslint-plugin-import");
const n = require("eslint-plugin-n");
const promise = require("eslint-plugin-promise");
const { rules: standardRules } = standard;
const globals = require("globals");

module.exports = defineConfig([
	{
    files: ["src/**/*.js"],
    plugins: {
      "import": importPlugin,
      "n": n,
      "promise": promise,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node
      }
    },
    rules: {
      ...standardRules,
    },
	},
]);
