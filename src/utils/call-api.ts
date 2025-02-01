import { Response } from '@/types/response';

export type ErrorHandlingMode = 'single' | 'all';

export async function callApi<T>(
	url: string,
	options?: RequestInit,
	errorMode: ErrorHandlingMode = 'single'
): Promise<Response<T>> {
	try {
		const response = await fetch(url, options);
		const json: Response<T> = await response.json();

		if (!json.success) {
			return processErrors(json, errorMode);
		}

		return json;
	} catch (err: any) {
		return {
			success: false,
			error: err.message || 'An unknown error occurred',
		};
	}
}

// Función auxiliar para manejar errores
function processErrors<T>(
	response: Response<T>,
	mode: ErrorHandlingMode
): Response<T> {
	if (response.data && Array.isArray(response.data)) {
		const errorMessages = response.data.map(
			(err: any) => err.message ?? String(err)
		);
		return {
			success: false,
			error: mode === 'single' ? errorMessages[0] : errorMessages.join(', '),
		};
	}

	return {
		success: false,
		error: response.error || 'An unknown error occurred',
	};
}
