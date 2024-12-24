import { auth, signIn, signOut } from '@/auth';

export default async function SignIn() {
	const session = await auth();

	if (!session) {
		return (
			<>
				<form
					action={async () => {
						'use server';
						await signIn('github');
					}}
				>
					<button type="submit">Signin with GitHub</button>
				</form>
				<form
					action={async (formData) => {
						'use server';
						await signIn('credentials', formData);
					}}
				>
					<label>
						Email
						<input name="email" type="email" />
					</label>
					<label>
						Password
						<input name="password" type="password" />
					</label>
					<button>Sign In</button>
				</form>
				)<div>Not authenticated</div>
			</>
		);
	}

	return (
		<>
			<div className="container">
				<pre>{JSON.stringify(session, null, 2)}</pre>
			</div>
			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<button type="submit">Signout</button>
			</form>
		</>
	);
}
