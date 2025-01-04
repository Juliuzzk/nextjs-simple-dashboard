import React, { useState } from 'react';
import CustomIconButton from '../common/CustomIconButton';
import Link from 'next/link';

interface RegisterCredentials {
	email: string;
	password: string;
	repeatPassword: string;
}

interface RegisterFormProps {
	// handleLogin: () => Promise<void>; // Función de login
	handleRegister: () => Promise<void>; // Función de login
	// loading: boolean; // Indica si la operación está en curso
	// error?: string; // Mensaje de error opcional
}

const RegisterForm: React.FC<RegisterFormProps> = ({
	handleRegister: handleRegister,
}) => {
	const [credentials, setCredentials] = useState<RegisterCredentials>({
		email: '',
		password: '',
		repeatPassword: '',
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
		console.log('Quiero registrarme!!');
		// await handleRegister();
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
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								name="email"
								placeholder="correo@ejemplo.com"
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
								type="repeatPassword"
								name="repeatPassword"
								placeholder="********"
								className="input input-bordered w-full"
								value={credentials.repeatPassword}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary">
								Registrar
							</button>
						</div>

						<div className="divider">O</div>
						<div className="form-control mt-6">
							<Link
								href={'/auth/signin'}
								type="submit"
								className="btn btn-outline"
							>
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
