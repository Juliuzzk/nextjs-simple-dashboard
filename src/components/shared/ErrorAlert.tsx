'use client';

import { useEffect, useState } from 'react';

interface ErrorAlertProps {
	messages: string[];
}

export function ErrorAlert({ messages }: ErrorAlertProps) {
	const [visibleErrors, setVisibleErrors] = useState(messages);

	useEffect(() => {
		setVisibleErrors(messages); // Actualiza el estado cuando cambia messages
	}, [messages]);

	const dismissError = () => {
		setVisibleErrors([]); // Cierra todos los errores
	};

	if (visibleErrors.length === 0) return null;

	return (
		<div className="alert alert-error flex justify-between items-start p-4 flex-col">
			<div className="flex justify-between w-full items-center">
				<div className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="font-bold">Se encontraron errores:</span>
				</div>
				<button className="btn btn-sm btn-ghost" onClick={dismissError}>
					✖
				</button>
			</div>
			<ul className="list-disc list-inside mt-2">
				{visibleErrors.map((message, index) => (
					<li key={index}>{message}</li>
				))}
			</ul>
		</div>
	);
}
