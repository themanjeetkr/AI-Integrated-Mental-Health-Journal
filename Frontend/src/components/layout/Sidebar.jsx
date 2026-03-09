export default function Sidebar({ setToken }) {
  return (
    <div className="w-64 bg-white shadow-md p-6 flex flex-col">
      <h1 className="text-xl font-semibold mb-8">MindJournal</h1>

      <nav className="space-y-4 text-gray-600">
        <p className="cursor-pointer hover:text-black">Dashboard</p>
        <p className="cursor-pointer hover:text-black">Analytics</p>
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
        className="mt-auto bg-gray-100 p-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}