'use client';

import { redirect, useRouter } from 'next/navigation';

export default function DashboardPage() {
	const router = useRouter();

	router.push('/dashboard/home');
}
