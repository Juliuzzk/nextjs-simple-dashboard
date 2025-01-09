import { ZodError } from 'zod';

type GetMessageFunction = (code: string, lang: string) => Promise<string>;
type CustomError = {
	path: (string | number)[];
	message: string;
};

export async function translateZodErrors(
	error: ZodError,
	language: string = 'en', // Idioma predeterminado
	getMessage: GetMessageFunction
) {
	// Mapeo de errores traducidos
	return await Promise.all(
		error.errors.map(async (err) => {
			const translatedMessage = await getMessage(err.message, language);
			return {
				path: err.path, // Indica el campo que falló
				message: translatedMessage || err.message, // Mensaje traducido o el original
			};
		})
	);
}

export function createCustomError(
	path: (string | number)[],
	message: string
): CustomError {
	return { path, message };
}

export async function handleErrors(
	zodError: ZodError | null,
	customErrors: CustomError[] = [],
	language: string,
	getMessage: GetMessageFunction
) {
	// Traduce los errores de Zod si existen
	const zodErrors = zodError
		? await translateZodErrors(zodError, language, getMessage)
		: [];

	// Combina errores de Zod y custom
	const combinedErrors = [
		...zodErrors,
		...customErrors.map((err) => ({
			...err,
			message: err.message, // Los mensajes de custom errors ya deberían estar traducidos
		})),
	];

	return combinedErrors;
}
