/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from 'react-hot-toast';

export function useCustomToast() {
	const showSuccessToast = (message: string) => {
		const toastId = toast.custom((t: any) => (
			<div
				className={`toast toast-top toast-end transition-all duration-300 ${
					t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
				}`}
			>
				<div className="alert alert-success shadow-lg flex items-center justify-between gap-4 p-4">
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
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{message}</span>

					<button
						className="btn btn-sm btn-ghost"
						onClick={() => toast.dismiss(toastId)}
					>
						✖
					</button>
				</div>
			</div>
		));
	};

	const showErrorToast = (message: string) => {
		const toastId = toast.custom((t: any) => (
			<div
				className={`toast toast-top toast-end transition-all duration-300 ${
					t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
				}`}
			>
				<div className="alert alert-error shadow-lg flex items-center justify-between gap-4 p-4">
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
					<span>{message}</span>
					<button
						className="btn btn-sm btn-ghost"
						onClick={() => toast.dismiss(toastId)}
					>
						✖
					</button>
				</div>
			</div>
		));
	};

	return { showSuccessToast, showErrorToast };
}
