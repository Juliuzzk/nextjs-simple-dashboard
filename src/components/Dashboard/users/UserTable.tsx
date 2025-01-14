import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

interface User {
	id?: string;
	name: string;
	email: string;
	role?: string;
	status?: 'active' | 'inactive';
	lastLogin?: string;
	image?: string;
	created_at?: Date;
}

// const mockUsers: User[] = [
// 	{
// 		id: '1',
// 		name: 'John Doe',
// 		email: 'john@example.com',
// 		role: 'Admin',
// 		status: 'active',
// 		lastLogin: '2024-02-20 10:30',
// 	},
// ];

// interface User {
// 	name: string;
// 	email: string;
// 	image: string;
// 	created_at: Date;
// }

interface UserTableProps {
	users: User[];
	searchQuery: string;
}

export function UserTable({ users, searchQuery }: UserTableProps) {
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="overflow-x-auto bg-base-200 rounded-lg">
			<table className="table">
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<th>
							<div className="flex items-center gap-1 cursor-pointer">
								Name
								<ArrowUpDown size={16} />
							</div>
						</th>
						<th>Email</th>
						{/* <th>Role</th> */}
						<th>Status</th>
						<th>Last Login</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr key={index}>
							<td>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</td>
							<td>
								<div className="flex items-center gap-3">
									<div className="avatar">
										<div className="w-8 h-8 rounded-full">
											<Image
												src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
												alt={user.name}
												width={32}
												height={32}
											/>
										</div>
									</div>
									<div>{user.name}</div>
								</div>
							</td>
							<td>{user.email}</td>
							{/* <td> */}
							{/* 	<div className="badge badge-ghost">{user.role}</div> */}
							{/* </td> */}
							<td>
								<div
									className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}
								>
									{user.status}
								</div>
							</td>
							<td>{user.lastLogin}</td>
							<td>
								<div className="dropdown dropdown-end">
									<button className="btn btn-ghost btn-sm">
										<MoreHorizontal size={16} />
									</button>
									<ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
										<li>
											<a>Edit</a>
										</li>
										<li>
											<a>Disable</a>
										</li>
										<li>
											<a className="text-error">Delete</a>
										</li>
									</ul>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
