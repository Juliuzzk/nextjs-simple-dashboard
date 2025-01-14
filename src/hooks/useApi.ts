import { useState } from 'react';
import { Response } from '../types/response'; // Asegúrate de que el path sea correcto

type ErrorHandlingMode = 'single' | 'all';

export function useApi<T>() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errors, setErrors] = useState<string[] | null>(null);
	const [data, setData] = useState<T | null>(null);

	const callApi = async (
		url: string,
		options?: RequestInit,
		errorMode: ErrorHandlingMode = 'single'
	): Promise<Response<T>> => {
		setLoading(true);
		setError(null);
		setErrors(null);

		try {
			const response = await fetch(url, options);
			const json: Response<T> = await response.json();

			if (json.success) {
				setData(json.data || null);
			} else {
				processErrors(json, errorMode);
				setData(null);
			}

			return json;
		} catch (err: any) {
			const error = err.message || 'An unknown error occurred';
			setError(error);
			setErrors([error]);
			return {
				success: false,
				error: error,
			};
		} finally {
			setLoading(false);
		}
	};

	// Helper para procesar errores según el modo
	const processErrors = (response: Response<T>, mode: ErrorHandlingMode) => {
		if (response.data && Array.isArray(response.data)) {
			// Manejo de errores cuando `data` es un array
			const errorMessages = response.data.map((err: any) =>
				err.message ? err.message : String(err)
			);
			if (mode === 'single') {
				// Establece solo el primer error en `setError`
				setError(errorMessages[0]);
			} else if (mode === 'all') {
				// Establece todos los errores en `setErrors`
				setErrors(errorMessages);
			}
		} else {
			// Si `data` no es un array, maneja como un único error
			const singleError = response.error || 'An unknown error occurred';
			setError(singleError);
			setErrors([singleError]);
		}
	};

	return { callApi, data, error, errors, loading };
}
