export default function Manager() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Manager Tools & Dashboard</h1>
        <p className="text-gray-600">Everything a manager needs in one place — user insights, quick actions, and team management tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Team Overview</h3>
          <p className="text-gray-600 text-sm">Quickly see team activity, latest signups and outstanding tasks.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Manager Panel</h3>
          <p className="text-gray-600 text-sm">Access your manager dashboard to take action on user requests.</p>
          <div className="mt-4">
            <a href="/manager-panel" className="inline-block px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Open Manager Panel</a>
          </div>
        </div>
      </div>
    </div>
  );
}