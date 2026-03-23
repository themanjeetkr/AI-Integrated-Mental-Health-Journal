import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login, register, loading } = useAuth();  // ← from context, no props
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ok;
    if (mode === "login") {
      ok = await login(email, password);
    } else {
      ok = await register(name, email, password);
    }
    if (ok) navigate("/dashboard");  // ← navigates after success
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #4e8c7c, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #d97c2e, transparent)" }} />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #4e8c7c, #3d6b5e)" }}>
            <Moon size={22} color="white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink-100">
            Mind<span className="text-gradient-sage">Scribe</span>
          </h1>
          <p className="text-sm text-ink-500 mt-1">Your AI-powered mental health journal</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6"
          style={{
            background: "rgba(28,28,40,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}>

          {/* Tab toggle */}
          <div className="flex gap-1 p-1 rounded-xl mb-6"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            {["login", "register"].map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-sage-600/20 text-sage-300"
                    : "text-ink-500 hover:text-ink-300"
                }`}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" required
                  className="input-dark w-full px-4 py-2.5 rounded-xl text-sm" />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="input-dark w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="input-dark w-full px-4 pr-10 py-2.5 rounded-xl text-sm" />
                <button type="button" onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-50">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-xs text-center text-ink-600 mt-4">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sage-400 hover:text-sage-300 transition-colors">
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}