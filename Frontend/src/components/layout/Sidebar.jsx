import { createElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Moon, PenLine } from "lucide-react";
import { navItems } from "./dashboardNav";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col lg:flex"
      style={{
        background: "linear-gradient(180deg, #12121a 0%, #0e0e16 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}>
      {/* Logo */}
      <div className="px-6 py-7 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #4e8c7c, #3d6b5e)" }}>
          <Moon size={16} color="white" />
        </div>
        <span className="font-display text-xl font-semibold text-ink-100">
          Mind<span className="text-gradient-sage">Scribe</span>
        </span>
      </div>

      {/* New Entry Button */}
      <div className="px-4 mb-6">
        <button onClick={() => navigate("/journals/new")}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium btn-primary">
          <PenLine size={15} />
          New Entry
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-sage-300 bg-sage-600/10 border border-sage-600/20"
                  : "text-ink-400 hover:text-ink-200 hover:bg-white/[0.04]"
              }`
            }>
            {createElement(icon, { size: 17 })}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #4e8c7c, #6aab99)" }}>
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-ink-200 truncate">{user?.name || "User"}</p>
            <p className="text-[11px] text-ink-500 truncate">{user?.email}</p>
          </div>
          <button onClick={logout}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-ink-500 hover:text-rose-400">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
