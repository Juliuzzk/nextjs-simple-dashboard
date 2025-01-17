'use client';

import '../globals.css';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession'; // Importa el hook personalizado
import { CustomLoader } from '@/components/shared/Loader';
import { useEffect } from 'react';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Usar el hook personalizado para manejar la sesión
	const { session, status } = useAuthenticatedSession();

	useEffect(() => {
		const savedTheme =
			(localStorage.getItem('theme') as 'light' | 'dark') || 'light';
		document.documentElement.setAttribute('data-theme', savedTheme);
	}, []);

	// Mostrar un estado de carga mientras se valida la sesión
	if (status === 'loading') {
		return <CustomLoader />;
	}

	// Renderizar el layout solo si el usuario está autenticado
	return <main className="">{children}</main>;
}
