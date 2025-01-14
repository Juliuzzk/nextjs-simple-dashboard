import React, { useState } from 'react';
import Link from 'next/link';

interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface RegisterFormProps {
	handleRegister: (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	) => Promise<void>; // Función para registrar
	loading: boolean; // Indica si la operación está en curso
	error: string | null; // Mensaje de error opcional
}

const RegisterForm: React.FC<RegisterFormProps> = ({
	handleRegister,
	loading,
	error,
}) => {
	const [credentials, setCredentials] = useState<RegisterCredentials>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// if (credentials.password !== credentials.repeatPassword) {
		// 	alert('Las contraseñas no coinciden.');
		// 	return;
		// }
		await handleRegister(
			credentials.name,
			credentials.email,
			credentials.password,
			credentials.confirmPassword
		);
	};

	return (
		<div className="min-h-screen bg-base-200 flex items-center justify-center">
			<div className="card w-[32rem] bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl font-bold text-center mb-4">
						Register
					</h2>
					<form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Nombre</span>
							</label>
							<input
								type="text"
								name="name"
								placeholder="Ingresa tu nombre"
								className="input input-bordered w-full"
								value={credentials.name}
								onChange={handleChange}
								required
							/>
						</div>
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
						</div>

						<div className="form-control w-full mt-4">
							<label className="label">
								<span className="label-text">Repetir Contraseña</span>
							</label>
							<input
								type="password"
								name="confirmPassword"
								placeholder="********"
								className="input input-bordered w-full"
								value={credentials.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>

						{error && (
							<div className="alert alert-error mt-4">
								<span>{error}</span>
							</div>
						)}

						<div className="form-control mt-6">
							<button
								type="submit"
								className={`btn btn-primary ${loading ? 'loading' : ''}`}
								disabled={loading}
							>
								{loading ? 'Registrando...' : 'Registrar'}
							</button>
						</div>

						<div className="divider">O</div>
						<div className="form-control mt-6">
							<Link href={'/auth/signin'} className="btn btn-outline">
								Volver
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
