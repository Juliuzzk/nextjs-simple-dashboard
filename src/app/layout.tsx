import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/context/Providers';
import { Toaster } from 'react-hot-toast';
import { DictionaryStorageIni } from '@/components/shared/DictionaryStorageIni';
import { SessionStorageIni } from '@/components/shared/SessionStorageIni';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<Toaster position="top-right" />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
