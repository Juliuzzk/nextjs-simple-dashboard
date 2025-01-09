'use client';

import '../globals.css';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession'; // Importa el hook personalizado
import { CustomLoader } from '@/components/shared/Loader';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Usar el hook personalizado para manejar la sesión
	const { session, status } = useAuthenticatedSession();

	// Mostrar un estado de carga mientras se valida la sesión
	if (status === 'loading') {
		return <CustomLoader />;
	}

	// Renderizar el layout solo si el usuario está autenticado
	return <main className="">{children}</main>;
}
