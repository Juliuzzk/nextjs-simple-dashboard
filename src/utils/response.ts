import { Response } from '@/types/response';

export function createResponse<T>(
	success: boolean,
	payload: {
		data?: T;
		error?: string;
		message?: string;
	}
): Response<T> {
	return { success, ...payload };
}
