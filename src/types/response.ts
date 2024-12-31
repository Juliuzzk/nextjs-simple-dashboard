export interface Response<T> {
	success: boolean; // Indica si la operación fue exitosa o no
	data?: T; // Los datos retornados en caso de éxito
	error?: string; // Mensaje de error en caso de fallo
	message?: string; // Mensaje adicional opcional
}
