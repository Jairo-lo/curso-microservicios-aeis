// Configuracion Flat de ESLint 
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["node_modules/", "dist/"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];