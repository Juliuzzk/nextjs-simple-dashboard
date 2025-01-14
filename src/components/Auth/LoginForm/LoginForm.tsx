import React, { useState } from 'react';
import CustomIconButton from '../common/CustomIconButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginCredentials {
	email: string;
	password: string;
}

interface LoginFormProps {
	// handleLogin: () => Promise<void>; // Función de login
	handleLogin: (
		provider: string,
		email?: string,
		password?: string
	) => Promise<void>; // Función de login
	registerRoute: string;
	// loading: boolean; // Indica si la operación está en curso
	error: string | null; // Mensaje de error opcional
}

const LoginForm: React.FC<LoginFormProps> = ({
	handleLogin,
	registerRoute,
	error,
}) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState<LoginCredentials>({
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent, provider: string) => {
		console.log('provider es: ', provider);
		e.preventDefault();
		await handleLogin(provider, credentials.email, credentials.password);
	};

	const handleSocialButton = async (provider: string) => {
		console.log('provider es: ', provider);
		await handleLogin(provider);
	};

	return (
		<div className="min-h-screen bg-base-200 flex items-center justify-center">
			<div className="card w-[32rem] bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl font-bold text-center mb-4">
						Login
					</h2>

					<form
						onSubmit={(e) => {
							handleSubmit(e, 'credentials');
						}}
					>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								name="email"
								placeholder="usuario@dominio.com"
								className="input input-bordered w-full"
								value={credentials.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-control w-full mt-4">
							<label className="label">
								<span className="label-text">Contraseña</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="********"
								className="input input-bordered w-full"
								value={credentials.password}
								onChange={handleChange}
								required
							/>
							<label className="label">
								<a href="#" className="label-text-alt link link-hover">
									¿Olvidaste tu contraseña?
								</a>
							</label>
						</div>
						{error && (
							<div className="alert alert-error mt-4">
								<span>{error}</span>
							</div>
						)}

						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary">
								Iniciar Sesión
							</button>
						</div>
					</form>
					<div className="divider">O</div>

					<CustomIconButton
						label="Continuar con GitHub"
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
							</svg>
						}
						onClick={() => {
							handleSocialButton('github');
						}}
					/>

					{registerRoute && (
						<div className="form-control mt-4">
							<Link href={registerRoute} className="btn btn-outline">
								Registrarse
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
