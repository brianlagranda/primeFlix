import { defineConfig } from 'eslint-define-config';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginTypescript from '@typescript-eslint/eslint-plugin';

export default defineConfig({
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    plugins: {
        react: pluginReact,
        '@typescript-eslint': pluginTypescript,
        'react-hooks': pluginReactHooks,
    },
    parser: '@typescript-eslint/parser',
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parserOptions: {
                project: './tsconfig.json',
            },
            rules: {
                '@typescript-eslint/no-unused-vars': ['warn'],
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'react/react-in-jsx-scope': 'off',
    },
});
