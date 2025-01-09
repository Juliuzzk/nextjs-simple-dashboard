type CustomError = {
	path: (string | number)[];
	message: string;
};

export function createCustomError(
	path: (string | number)[],
	message: string
): CustomError {
	return { path, message };
}
