'use client';

import { TopNav } from '@/components/dashboard/navigation/navbar/TopNav';
import { Sidebar } from '@/components/dashboard/navigation/sidebar/Sidebar';
import { CustomLoader } from '@/components/shared/Loader';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession'; // Importa el hook personalizado
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import '../globals.css';
import { Session } from 'next-auth';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	// Usar el hook personalizado para manejar la sesión
	const { status, session } = useAuthenticatedSession();
	const user = session?.user as Session['user'];

	const onLogout = async () => {
		try {
			await signOut({
				callbackUrl: '/auth/signin', // Redirige al usuario después de cerrar sesión
			});
		} catch (error) {
			console.error('Error during sign out:', error);
		}
	};

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
					user={user}
				/>
				<main className="flex-1 p-8 bg-base-100 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
