import { query } from '@/lib/database/db';

/**
 * Obtiene un mensaje del diccionario basado en código e idioma.
 * @param code Código único del mensaje.
 * @param language Idioma (por ejemplo, "en", "es").
 * @returns Mensaje traducido o un mensaje por defecto si no se encuentra.
 */
export async function getMessage(
	code: string,
	language: string = 'en'
): Promise<string> {
	try {
		const { rows } = await query(
			'SELECT message FROM dictionary WHERE code = $1 AND language = $2',
			[code, language]
		);

		if (rows.length > 0) {
			return rows[0].message;
		} else {
			// Fallback si no se encuentra el mensaje
			return `Message not found for code: ${code} in language: ${language}`;
		}
	} catch (error) {
		console.error('Error fetching message:', error);
		return 'Error fetching message.';
	}
}
