import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		files: ['**/*.ts', '**/*.tsx'], // Aplica a TypeScript
		rules: {
			'@typescript-eslint/no-explicit-any': 1, // Cambiar error a advertencia
			'@typescript-eslint/no-unused-vars': 1, // Cambiar error a advertencia
			'prefer-const': 1,
		},
	},
];

export default eslintConfig;
