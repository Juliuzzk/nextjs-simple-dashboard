import { z } from 'zod';

// Esquema para el objeto "updates"
const updatesSchema = z.object({
	first_name: z
		.string()
		.min(1, 'FIRST_NAME_REQUIRED')
		.max(50, 'FIRST_NAME_TOO_LONG'),
	last_name: z
		.string()
		.min(1, 'LAST_NAME_REQUIRED')
		.max(50, 'LAST_NAME_TOO_LONG'),
	phone_number: z
		.string()
		.max(15, 'PHONE_NUMBER_TOO_LONG')
		.min(10, 'PHONE_NUMBER_TOO_SHORT')
		.optional(),
	image: z.string(),
	address: z.string().max(100, 'ADDRESS_TOO_LONG').optional(),
	bio: z.string().max(500, 'BIO_TOO_LONG').optional(),
});

// Esquema para el cuerpo completo de la solicitud
export const updateUserProfileSchema = z.object({
	id: z.number().int().positive(), // Validar que el ID sea un número entero positivo
	updates: updatesSchema, // Validar el objeto "updates"
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
