import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const body = await req.json();
	const { email, password } = body;

	const credentialsProvider = authOptions.providers.find(
		(provider) => provider.id === 'credentials'
	);

	if (!credentialsProvider || !credentialsProvider.authorize) {
		return NextResponse.json(
			{ error: 'Credentials provider not configured' },
			{ status: 500 }
		);
	}

	try {
		// Llama a la función `authorize` directamente
		const user = await credentialsProvider.authorize({ email, password });

		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			);
		}

		// Generar token JWT compatible
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				roles: user.roles,
			},
			process.env.NEXTAUTH_SECRET as string,
			{ expiresIn: '1h' }
		);

		return NextResponse.json({
			message: 'Login successful',
			token,
		});
	} catch (error) {
		console.error('Error in login API:', error);
		return NextResponse.json(
			{ error: error.message || 'Internal server error' },
			{ status: 500 }
		);
	}
}
