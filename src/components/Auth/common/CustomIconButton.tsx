'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string; // Texto que aparece en el botón
	icon?: React.ReactNode; // Icono opcional a mostrar
}

const Button: React.FC<ButtonProps> = ({ label, icon, ...rest }) => {
	return (
		<button
			{...rest} // Propaga todas las props adicionales al botón
			className="btn btn-outline w-full gap-2"
			aria-label={label}
		>
			{icon}
			{label}
		</button>
	);
};

export default Button;
