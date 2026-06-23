import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-300 text-white p-4 flex gap-4">
        <NavLink to="/" className="hover:underline">
          Home
        </NavLink>
        <NavLink to="/about" className="hover:underline">
          About
        </NavLink>
      </nav>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
