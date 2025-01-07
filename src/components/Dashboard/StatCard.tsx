import { LucideIcon } from 'lucide-react';

interface StatCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	trend?: {
		value: number;
		isPositive: boolean;
	};
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
	return (
		<div className="card bg-base-200 shadow-xl">
			<div className="card-body">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="card-title text-base-content/60 text-sm mb-1">
							{title}
						</h3>
						<p className="text-2xl font-bold">{value}</p>
						{trend && (
							<span
								className={`text-sm ${trend.isPositive ? 'text-success' : 'text-error'}`}
							>
								{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
							</span>
						)}
					</div>
					<div className="bg-primary/10 p-3 rounded-lg">
						<Icon className="text-primary" size={24} />
					</div>
				</div>
			</div>
		</div>
	);
}
