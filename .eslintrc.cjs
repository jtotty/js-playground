module.exports = {
    root: true,
    env: {
        es2024: true,
        browser: true,
    },
    extends: ['prettier', 'eslint:recommended'],
    plugins: ['prettier'],
    ignorePatterns: ['node_modules/', 'vendor/', 'public/'],
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        // Prettier
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],

        // Global Rules
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        quotes: ['error', 'single'],
        'func-call-spacing': 'off',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
    },
};
