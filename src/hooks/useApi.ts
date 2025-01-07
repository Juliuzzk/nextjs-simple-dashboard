import { useState } from 'react';
import { Response } from '../types/response';

// Hook genérico para realizar llamadas a la API
export function useApi<T>() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	const callApi = async (
		url: string,
		options?: RequestInit // Configuración opcional (métodos, headers, body)
	): Promise<Response<T>> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(url, options);
			const json: Response<T> = await response.json();

			if (json.success) {
				setData(json.data || null);
			} else {
				setError(json.error || 'An unknown error occurred');
			}

			return json;
		} catch (err: any) {
			const errorMsg = err.message || 'An unknown error occurred';
			setError(errorMsg);
			return {
				success: false,
				error: errorMsg,
			};
		} finally {
			setLoading(false);
		}
	};

	return { callApi, data, error, loading };
}
