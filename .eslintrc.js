module.exports = {
    parser: 'vue-eslint-parser', // Use vue-eslint-parser for Vue files
    parserOptions: {
        parser: '@typescript-eslint/parser', // Use @typescript-eslint/parser for TypeScript
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: ['@typescript-eslint', 'vue'], // Add 'vue' plugin
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:vue/recommended', // Vue recommended rules
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off', // Disable the rule
    },
};