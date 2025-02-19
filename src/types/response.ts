export interface Response<T> {
	success: boolean; // Indica si la operación fue exitosa
	data?: T; // Los datos retornados en caso de éxito
	error?: string | string[]; // Permite un string o un array de strings
	message?: string; // Mensaje adicional opcional
}
