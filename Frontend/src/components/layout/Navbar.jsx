import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Search, Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";

export default function Navbar({ title = "Dashboard" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="h-16 flex items-center px-6 gap-4"
      style={{
        background: "rgba(10,10,15,0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}>
      <h1 className="font-display text-lg font-semibold text-ink-100 mr-auto">{title}</h1>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
        <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search entries…"
          className="input-dark pl-8 pr-4 py-2 rounded-lg text-sm w-52" />
      </div>

      {/* Bell */}
      <button className="relative w-9 h-9 rounded-lg flex items-center justify-center btn-ghost">
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
      </button>

      {/* Profile */}
      <div className="relative">
        <button onClick={() => setProfileOpen((p) => !p)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg btn-ghost">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
            style={{ background: "linear-gradient(135deg, #4e8c7c, #6aab99)" }}>
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </div>
          <span className="text-sm font-medium text-ink-200 hidden md:block">
            {user?.name?.split(" ")[0] || "Account"}
          </span>
          <ChevronDown size={13} className={`text-ink-500 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden"
            style={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm font-medium text-ink-100">{user?.name}</p>
              <p className="text-xs text-ink-500 truncate">{user?.email}</p>
            </div>
            <div className="p-1.5">
              <button onClick={() => { navigate("/settings"); setProfileOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-ink-200 hover:bg-white/[0.04] transition-all text-left">
                <Settings size={14} /> Settings
              </button>
              <button onClick={() => { logout(); setProfileOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-600/10 transition-all text-left">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}