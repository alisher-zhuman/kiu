import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-var": "error",
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^\\u0000"],
            [
              "^node:",
              "^react",
              "^next",
              "^(?!@(?:app|pages|widgets|features|entities|shared)(?:/|$))@?\\w",
            ],
            ["^@/i18n(?:/.*)?$", "^@i18n(?:/.*)?$"],
            ["^@app(?:/.*)?$", "^@/app(?:/.*)?$"],
            ["^@pages(?:/.*)?$", "^@/pages(?:/.*)?$"],
            ["^@widgets(?:/.*)?$", "^@/widgets(?:/.*)?$"],
            ["^@features(?:/.*)?$", "^@/features(?:/.*)?$"],
            ["^@entities(?:/.*)?$", "^@/entities(?:/.*)?$"],
            ["^@shared(?:/.*)?$", "^@/shared(?:/.*)?$"],
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
