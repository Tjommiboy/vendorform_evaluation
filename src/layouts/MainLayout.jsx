import { Outlet, NavLink } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  `transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-blue-100 hover:text-white"}`;

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#1A1F2E]">
      <nav className="bg-[#1B4F8A] text-white shadow-sm">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4 max-w-6xl">
          <div className="text-lg font-semibold text-white tracking-[0.08em]">
            Vendor Evaluation
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
