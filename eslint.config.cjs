const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const stylisticEslintPluginJs = require("@stylistic/eslint-plugin-js");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const _import = require("eslint-plugin-import");
const prettier = require("eslint-plugin-prettier");
const unusedImports = require("eslint-plugin-unused-imports");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "module",

        parserOptions: {
            project: true,
        },
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "rollup",
        "prettier",
    )),

    plugins: {
        "@stylistic/js": stylisticEslintPluginJs,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
        prettier: fixupPluginRules(prettier),
        "unused-imports": unusedImports,
    },

    rules: {
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-unused-vars": "off",
        camelcase: "off",
        "class-methods-use-this": "off",
        "import/no-unresolved": "error",

        "import/order": ["error", {
            alphabetize: {
                caseInsensitive: true,
                order: "asc",
            },

            groups: [
                "builtin",
                "external",
                "internal",
                ["sibling", "parent"],
                "index",
                "unknown",
            ],

            "newlines-between": "always",
        }],

        "no-undefined": "off",

        "sort-imports": ["error", {
            allowSeparatedGroups: true,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        }],

        "unused-imports/no-unused-imports": "error",
    },

    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
        },
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },
}]);
