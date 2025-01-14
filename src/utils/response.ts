import { Response } from '@/types/response';

export function createResponse<T>(
	success: boolean,
	payload: {
		// para devolver toda la datqa
		data?: T;
		// Para mensajes de error
		error?: string;
		// Para warning o informacion adicional
		message?: string;
	}
): Response<T> {
	return { success, ...payload };
}
