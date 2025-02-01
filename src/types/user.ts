export interface User {
	id: number; // Clave primaria, siempre presente
	firstName?: string; // Opcional
	lastName?: string; // Opcional
	email?: string; // Opcional
	password?: string; // Opcional
	emailVerified?: string | null; // Puede ser nulo
	image?: string | null; // Puede ser nulo
	createdAt?: string; // Fecha de creación (puede ser opcional si no se requiere)
	lastLogin?: string | null; // Último inicio de sesión
	phoneNumber?: string; // Opcional, con formato validado
	address?: string | null; // Puede ser nulo
	bio?: string | null; // Puede ser nulo
	status: 'ACT' | 'INACT' | 'BANNED' | string; // `user_status`, valor por defecto 'ACT'
}
