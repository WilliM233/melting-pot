import { Link } from "react-router-dom";

export default function Home() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white flex-col">
        {/* HERO */}
        <div className="px-4 py-20 sm:py-24 md:py-32 text-center">
          <h1 className="lg:text-6xl text-4xl font-bold mb-4 tracking-wider">THE MELTING POT</h1>
          <h3 className="text-lg text-gray-300 max-w-xl">The cultural hub for <span className="text-orange-400 font-medium">Meltview</span>, The Lizzy Lens, and beyond.</h3>
        </div>

        {/* NAV SECTION */}
        <div className="w-full px-6 pb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Explore the Platform</h2>
          <div className="text-center sm:text-left grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="https://thelizzylens.com/" target="_blank" rel="noopener noreferrer"
               className="block p-6 bg-gray-800 rounded-xl shadow hover:bg-gray-700 hover:scale-105 transform transition-transform duration-200">
                    🔍<span className="ml-2 font-semibold text-lg">The Lizzy Lens</span></a>
            <Link to="/meltview" className="block p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
              🎞️ <span className="ml-2 font-semibold text-lg">Meltview</span>
            </Link>
            <div className="block p-6 bg-gray-800 rounded-xl opacity-60 cursor-not-allowed">
                    🧠 <span className="ml-2 font-semibold text-lg">The Melting Muse</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
  