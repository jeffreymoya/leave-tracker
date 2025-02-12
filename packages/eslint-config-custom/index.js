module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type"
        ],
        "pathGroups": [
          {
            "pattern": "@/**",
            "group": "internal",
            "position": "before"
          }
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "import-alias/import-alias": [
      "error",
      {
        "relativeDepth": 0,
        "aliases": [
          { "alias": "@", "matcher": "^\\./(?!.*\\.(?:css|scss|svg|png|jpg|ico)$).*$" }
        ]
      }
    ],
    "@typescript-eslint/explicit-function-return-type": ["error", {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      allowFunctionsWithoutTypeParameters: true,
      allowedNames: ["DashboardPage", "RootLayout", "LeaveCalendar", "LeaveList", "Filters", "ProfileDropdown", "FloatingActionButton"]
    }],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" }
    ],
    "import/no-anonymous-default-export": "warn",
    "react/display-name": "off"
  },
  plugins: ["unused-imports", "import", "import-alias"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    }
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
}
