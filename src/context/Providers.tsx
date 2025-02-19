'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { DictionaryProvider } from '@/context/DictionaryContext';
import { useState } from 'react';
import { SessionStorageIni } from '@/components/shared/SessionStorageIni';
import { DictionaryStorageIni } from '@/components/shared/DictionaryStorageIni';

export function Providers({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState('en');
	const [dictionary, setDictionary] = useState<Record<string, string>>({});

	return (
		<SessionProvider>
			<AuthProvider>
				<UserProvider>
					<SessionStorageIni setLanguage={setLanguage} />
					<DictionaryStorageIni setDictionary={setDictionary} />

					<DictionaryProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</DictionaryProvider>
				</UserProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
