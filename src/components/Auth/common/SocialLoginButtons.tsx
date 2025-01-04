'use client';
import React from 'react';

interface SocialLoginButtonsProps {
	name: string; // Texto que aparece en el botón
	provider: string; // Nombre del proveedor, usado para manejar el login
	icon: React.ReactNode; // Icono a mostrar (puede ser un componente SVG o cualquier nodo React)
	onLoginWithProvider?: (
		provider: string,
		email?: string,
		password?: string
	) => Promise<void>; // Función de login
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
	name,
	provider,
	icon,
	onLoginWithProvider: onLogin,
}) => {
	const handleClick = async () => {
		console.log(`login clicked`);
		if (onLogin) {
			await onLogin(provider);
		}
	};

	return (
		<button
			onClick={handleClick}
			className="btn btn-outline w-full gap-2"
			aria-label={`Login with ${provider}`}
		>
			{icon}
			{name}
		</button>
	);
};
