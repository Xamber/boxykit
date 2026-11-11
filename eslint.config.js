import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["**/dist/**", "**/.next/**", "**/out/**", "**/generated/**", "**/next-env.d.ts"]),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ["**/*.tsx"],
    extends: [react.configs.flat.recommended, react.configs.flat["jsx-runtime"], jsxA11y.flatConfigs.strict],
    plugins: { "react-hooks": reactHooks },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/button-has-type": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/no-array-index-key": "error",
      "react/self-closing-comp": "error",
    },
  },
  // Code style: the same rules as swe-piha.
  {
    rules: {
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let"], next: "*" },
        { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
      ],
      "no-nested-ternary": "error",
      eqeqeq: "error",
      curly: ["error", "multi-line"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
  // The package: no frameworks, no runtime dependencies, no inline styles, named exports only.
  {
    files: ["packages/boxykit/src/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^(?!react($|/)|\\.)",
              message: "boxykit has no runtime dependencies: only react and relative imports.",
            },
          ],
        },
      ],
      "no-restricted-exports": ["error", { restrictDefaultExports: { direct: true, named: true, defaultFrom: true } }],
    },
  },
  {
    files: ["packages/boxykit/src/**/*.tsx"],
    rules: {
      "react/forbid-component-props": ["error", { forbid: ["style"] }],
      "react/forbid-dom-props": ["error", { forbid: ["style"] }],
    },
  },
  // Plain JS config and scripts: no type information.
  {
    files: ["**/*.js", "**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  // The docs app: Next.js pages are default exports, and examples read best without return types.
  {
    files: ["apps/docs/**"],
    rules: { "@typescript-eslint/explicit-module-boundary-types": "off" },
  },
]);
