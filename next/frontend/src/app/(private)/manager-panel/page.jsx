export default function ManagerPanel() {
  // Basic static dashboard layout — replace placeholders with real data fetching later
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-3xl font-semibold">1,234</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">Active Sessions</div>
          <div className="text-3xl font-semibold">87</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-500">Open Requests</div>
          <div className="text-3xl font-semibold">12</div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Signups</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3">Jane Doe</td>
              <td className="py-3">jane@example.com</td>
              <td className="py-3">User</td>
            </tr>
            <tr className="border-t">
              <td className="py-3">John Smith</td>
              <td className="py-3">john@example.com</td>
              <td className="py-3">Manager</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}