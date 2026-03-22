import { useState } from "react";
import { User, Lock, Bell, Palette, Save } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [notifs, setNotifs] = useState({ daily: true, insights: true, weekly: false });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated (UI only — wire to your API)");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!currentPw || !newPw) return toast.error("Fill in both fields");
    toast.success("Password updated (UI only — wire to your API)");
    setCurrentPw(""); setNewPw("");
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="rounded-2xl overflow-hidden mb-5"
      style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(78,140,124,0.12)" }}>
          <Icon size={15} style={{ color: "#6aab99" }} />
        </div>
        <h3 className="font-display font-semibold text-ink-200">{title}</h3>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-lg mx-auto">
        {/* Profile */}
        <Section icon={User} title="Profile">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="input-dark w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                type="email" className="input-dark w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <button type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
              <Save size={14} /> Save Profile
            </button>
          </form>
        </Section>

        {/* Password */}
        <Section icon={Lock} title="Security">
          <form onSubmit={handleSavePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Current Password</label>
              <input value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                type="password" className="input-dark w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">New Password</label>
              <input value={newPw} onChange={(e) => setNewPw(e.target.value)}
                type="password" className="input-dark w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <button type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
              <Save size={14} /> Update Password
            </button>
          </form>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notifications">
          <div className="space-y-4">
            {[
              { key: "daily", label: "Daily journaling reminder", desc: "Get reminded to write every day" },
              { key: "insights", label: "Weekly AI insights", desc: "Receive your weekly emotional summary" },
              { key: "weekly", label: "Streak notifications", desc: "Alerts when your streak is at risk" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-200">{label}</p>
                  <p className="text-xs text-ink-500">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                  className={`relative w-10 h-5 rounded-full transition-all duration-200 ${notifs[key] ? "bg-sage-600" : "bg-ink-700"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${notifs[key] ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* Appearance */}
        <Section icon={Palette} title="Appearance">
          <p className="text-sm text-ink-500">Dark theme is active. Additional themes coming soon.</p>
          <div className="flex gap-3 mt-4">
            {["#4e8c7c", "#d97c2e", "#8faad4", "#d4697b"].map((c) => (
              <button key={c} className="w-8 h-8 rounded-full border-2 border-transparent hover:scale-110 transition-all"
                style={{ background: c, borderColor: c === "#4e8c7c" ? "white" : "transparent" }} />
            ))}
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}
