'use client';

import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { UserTable } from '@/components/Dashboard/users/UserTable';
import { UserFilters } from '@/components/Dashboard/users/UserFilters';
import { useApi } from '@/hooks/useApi';
import { useUsers } from '@/hooks/useUsers';

export default function UsersPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const { users, isLoading } = useUsers();

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Users</h1>
				<button className="btn btn-primary">
					<Plus size={20} />
					Add User
				</button>
			</div>

			{/* <div className="flex gap-4 items-center"> */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="flex-1 relative">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60"
						size={20}
					/>
					<input
						type="text"
						placeholder="Search users..."
						className="input input-bordered w-full pl-10"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<button
					className={`btn ${showFilters ? 'btn-primary' : 'btn-ghost'}`}
					onClick={() => setShowFilters(!showFilters)}
				>
					<Filter size={20} />
					Filters
				</button>
			</div>

			{showFilters && <UserFilters />}
			<UserTable users={users} searchQuery={searchQuery} />
		</div>
	);
}
