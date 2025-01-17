import { ActivityCard } from '@/components/Dashboard/ActivityCard';
import { ChartCard } from '@/components/Dashboard/ChartCard';
import { StatCard } from '@/components/Dashboard/StatCard';
import { CreditCard, ShoppingBag, TrendingUp, Users } from 'lucide-react';

const recentActivities = [
	{
		user: 'John Doe',
		action: 'created a new order #1234',
		time: '2 minutes ago',
	},
	{
		user: 'Jane Smith',
		action: 'updated their profile',
		time: '1 hour ago',
	},
	{
		user: 'Mike Johnson',
		action: 'added new product',
		time: '3 hours ago',
	},
];

export default function HomePage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Dashboard Overview</h1>
				<button className="btn btn-primary">Generate Report</button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Total Customers"
					value="2,420"
					icon={Users}
					trend={{ value: 12, isPositive: true }}
				/>
				<StatCard
					title="Total Products"
					value="1,210"
					icon={ShoppingBag}
					trend={{ value: 8, isPositive: true }}
				/>
				<StatCard
					title="Total Sales"
					value="$45,200"
					icon={CreditCard}
					trend={{ value: 15, isPositive: true }}
				/>
				<StatCard
					title="Revenue Growth"
					value="24%"
					icon={TrendingUp}
					trend={{ value: 3, isPositive: false }}
				/>
			</div>

			{/* Charts and Activity Section */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<ChartCard title="Sales Overview">
					<div className="h-[300px] flex items-center justify-center text-base-content/60">
						Chart placeholder
					</div>
				</ChartCard>
				<ChartCard title="Top Products">
					<div className="h-[300px] flex items-center justify-center text-base-content/60">
						Chart placeholder
					</div>
				</ChartCard>
				<ActivityCard activities={recentActivities} />
			</div>
		</div>
	);
}
