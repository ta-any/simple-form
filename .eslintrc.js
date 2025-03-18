module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: 'vue-eslint-parser', // Парсер для Vue
    parserOptions: {
        parser: '@typescript-eslint/parser', // Парсер для TypeScript
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    extends: [
        'plugin:vue/vue3-recommended', // Правила для Vue 3
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // Правила для TypeScript
    ],
    rules: {
        // Ваши кастомные правила ESLint
    },
};