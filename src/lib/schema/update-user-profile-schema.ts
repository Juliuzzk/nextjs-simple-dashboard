import { z } from 'zod';

// Esquema para el objeto "updates"
const updatesSchema = z.object({
	first_name: z
		.string()
		.min(1, 'First name is required')
		.max(50, 'First name is too long'),
	last_name: z
		.string()
		.min(1, 'Last name is required')
		.max(50, 'Last name is too long'),
	phone_number: z
		.string()
		.min(10, 'Phone number must be at least 10 digits')
		.max(15, 'Phone number is too long')
		.optional(),
	address: z.string().max(100, 'Address is too long').optional(),
	bio: z.string().max(500, 'Bio is too long').optional(),
});

// Esquema para el cuerpo completo de la solicitud
export const updateUserProfileSchema = z.object({
	id: z.number().int().positive(), // Validar que el ID sea un número entero positivo
	updates: updatesSchema, // Validar el objeto "updates"
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
