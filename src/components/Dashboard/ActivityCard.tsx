interface Activity {
	user: string;
	action: string;
	time: string;
}

interface ActivityCardProps {
	activities: Activity[];
}

export function ActivityCard({ activities }: ActivityCardProps) {
	return (
		<div className="card bg-base-200 shadow-xl">
			<div className="card-body">
				<h2 className="card-title mb-4">Recent Activity</h2>
				<div className="space-y-4">
					{activities.map((activity, index) => (
						<div key={index} className="flex items-center gap-4">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
							<div>
								<p className="font-medium">
									{activity.user}{' '}
									<span className="text-base-content/60">
										{activity.action}
									</span>
								</p>
								<p className="text-sm text-base-content/60">{activity.time}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
