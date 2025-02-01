import { z } from 'zod';

export const registerSchema = z
	.object({
		firstName: z.string().min(1, { message: 'VALIDATION_STRING_MIN_NAME' }), // Código del diccionario
		lastName: z.string().min(1, { message: 'VALIDATION_STRING_MIN_NAME' }), // Código del diccionario
		email: z
			.string({ required_error: 'VALIDATION_STRING_REQUIRED_EMAIL' })
			.min(1, { message: 'VALIDATION_STRING_REQUIRED_EMAIL' })
			.email({ message: 'VALIDATION_INVALID_EMAIL' }), // Código del diccionario
		password: z
			.string({ required_error: 'VALIDATION_STRING_REQUIRED_PASSWORD' })
			.min(6, { message: 'VALIDATION_STRING_MIN_PASSWORD' }), // Código del diccionario
		confirmPassword: z
			.string({ required_error: 'VALIDATION_STRING_REQUIRED_CONFIRM_PASSWORD' })
			.min(1, { message: 'VALIDATION_STRING_REQUIRED_CONFIRM_PASSWORD' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'VALIDATION_PASSWORDS_DO_NOT_MATCH', // Código del diccionario
	});
