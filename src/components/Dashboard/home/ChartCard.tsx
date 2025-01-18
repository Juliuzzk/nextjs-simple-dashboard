interface ChartCardProps {
	title: string;
	children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
	return (
		<div className="card bg-base-200 shadow-xl">
			<div className="card-body">
				<h2 className="card-title mb-4">{title}</h2>
				{children}
			</div>
		</div>
	);
}
