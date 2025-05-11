import { Outlet } from "react-router-dom";

export default function MeltviewLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* You can add shared layout stuff here, like a sidebar or logo */}
      
      <Outlet /> {/* Renders nested routes here */}
    </div>
  );
}
