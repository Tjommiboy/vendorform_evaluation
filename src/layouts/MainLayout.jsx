import { Outlet, NavLink } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  `transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white"}`;

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-slate-950 text-slate-200 shadow-sm">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4 max-w-6xl">
          <div className="text-lg font-semibold text-white">
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
