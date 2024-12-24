/**
 * Determina el idioma a usar basado en la preferencia del usuario, encabezados HTTP o el idioma por defecto.
 * @param headers Encabezados HTTP de la solicitud.
 * @param defaultLanguage Idioma por defecto (por ejemplo, "en").
 * @returns Idioma determinado (por ejemplo, "es" o "en").
 */
export function getLanguage(
	headers: Headers,
	defaultLanguage: string = 'en'
): string {
	// 1. Intentar obtener el idioma del encabezado Accept-Language
	const acceptLanguage = headers.get('Accept-Language')?.toLowerCase();
	if (acceptLanguage) {
		return acceptLanguage.split(',')[0].split('-')[0]; // Extraer el idioma principal
	}
	// 2. Si no hay encabezado, usar el idioma por defecto
	return defaultLanguage;
}
