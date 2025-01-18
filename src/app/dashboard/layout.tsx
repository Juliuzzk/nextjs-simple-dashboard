'use client';

import '../globals.css';
import { TopNav } from '@/components/Dashboard/navigation/navbar/TopNav';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession'; // Importa el hook personalizado
import { CustomLoader } from '@/components/shared/Loader';
import { themeChange } from 'theme-change';
import { Sidebar } from '@/components/Dashboard/navigation/sidebar/Sidebar';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	// Usar el hook personalizado para manejar la sesión
	const { session, status } = useAuthenticatedSession();

	const onLogout = async () => {
		try {
			await signOut({
				callbackUrl: '/auth/signin', // Redirige al usuario después de cerrar sesión
			});
		} catch (error) {
			console.error('Error during sign out:', error);
		}
	};
	useEffect(() => {
		themeChange(); // `false` para desactivar el logging en consola
	}, []);

	//TODO:check if this loading page is util here..

	// Mostrar un estado de carga mientras se valida la sesión
	if (status === 'loading') {
		return <CustomLoader />;
	}

	// Renderizar el layout solo si el usuario está autenticado
	return (
		<div className="h-screen flex overflow-hidden">
			<Sidebar isCollapsed={isCollapsed} handleLogout={onLogout} />
			<div className="flex-1 flex flex-col">
				<TopNav
					isCollapsed={isCollapsed}
					onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
				/>
				<main className="flex-1 p-8 bg-base-100 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
