export function UserFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-base-200 rounded-lg">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Role</span>
        </label>
        <select className="select select-bordered w-full">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select className="select select-bordered w-full">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Last Login</span>
        </label>
        <select className="select select-bordered w-full">
          <option value="">Any time</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>
    </div>
  );
}