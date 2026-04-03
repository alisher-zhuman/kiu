import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import {
  createBarrelImportConfig,
  createSameLayerImportConfig,
  createSelfLayerImportConfig,
} from "./eslint/helpers/internal-imports.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
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
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/consistent-type-exports": [
        "error",
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "simple-import-sort/imports": [
        "error",
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
      "simple-import-sort/exports": "error",
    },
  },
  createSelfLayerImportConfig("shared"),
  createSelfLayerImportConfig("app"),
  createSameLayerImportConfig("entities"),
  createSameLayerImportConfig("features"),
  createSameLayerImportConfig("widgets"),
  createBarrelImportConfig({
    files: ["src/app/**/*.{ts,tsx}"],
    layer: "widgets",
    pattern: "*/*",
    message: "Use widget barrel exports.",
  }),
  createBarrelImportConfig({
    files: ["src/**/*.{ts,tsx}"],
    layer: "features",
    pattern: "*/*",
    message: "Use feature barrel exports.",
  }),
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/entities/*/ui/*",
                "@entities/*/ui/*",
                "@/entities/*/hooks/*",
                "@entities/*/hooks/*",
              ],
              message: "Use entity barrel exports.",
            },
          ],
        },
      ],
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
