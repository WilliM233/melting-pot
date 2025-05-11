import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { apiBase } from "../apiBase";
import { Settings } from "lucide-react";

export default function Meltview() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${apiBase}/api/logout`, {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      navigate("/meltview");
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {!isLoggedIn ? (
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Meltview</h1>
          <p className="text-gray-400 mb-6">
            Track, explore, and reflect on the stories that shape you.
          </p>
          <input
            type="text"
            placeholder="Search books, shows, or comics..."
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 mb-6"
          />
          <a
            href={`${apiBase}/auth/google`}
            className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
          >
            Sign in with Google
          </a>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            {/* Left: User Settings */}
            <div>
              <button
                onClick={() => navigate("/meltview/settings")}
                className="p-2 rounded hover:bg-gray-800 transition"
                title="User Settings">
                  <Settings className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Right: Logout */}
            <div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Body */}
          <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Your Shelves</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded">Want to Read</div>
              <div className="bg-gray-800 p-4 rounded">Reading</div>
              <div className="bg-gray-800 p-4 rounded">Owned</div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <div className="bg-gray-800 p-4 rounded">You rated "Watchmen" 9/10</div>
          </div>
        </div>
      )}
    </div>
  );
}
