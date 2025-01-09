'use client';

import { CustomLoader } from '@/components/shared/Loader';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const { session, status } = useAuthenticatedSession();
	const router = useRouter();

	// if (status === 'loading') {
	// 	return <CustomLoader />;
	// }

	if (status === 'unauthenticated') {
		console.log(status);
		router.push('/auth/signin');
		return null;
	}

	return null;
}
