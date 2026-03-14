import { useNavigate } from "react-router-dom";
import {
  Moon, Sparkles, Brain, Shield, TrendingUp,
  PenLine, BarChart2, Lightbulb, ArrowRight,
  Star, CheckCircle2, ChevronRight,
} from "lucide-react";

const features = [
  { icon: PenLine, color: "#6aab99", bg: "rgba(78,140,124,0.1)", title: "Daily Journaling", desc: "Capture your thoughts, feelings, and reflections in a beautiful, distraction-free writing space." },
  { icon: Brain, color: "#e89a52", bg: "rgba(217,124,46,0.1)", title: "AI-Powered Insights", desc: "Our AI analyzes your entries to reveal emotional patterns and provide personalized mental wellness guidance." },
  { icon: BarChart2, color: "#abc0e3", bg: "rgba(99,130,201,0.1)", title: "Mood Analytics", desc: "Visualize your emotional journey with beautiful charts and track your mood trends over time." },
  { icon: Shield, color: "#d4697b", bg: "rgba(192,77,97,0.1)", title: "Private & Secure", desc: "Your entries are encrypted and completely private. Only you can access your personal thoughts." },
  { icon: TrendingUp, color: "#92c4b6", bg: "rgba(146,196,182,0.1)", title: "Growth Tracking", desc: "Set wellness goals and watch your mental health improve with weekly progress reports." },
  { icon: Lightbulb, color: "#f2b87a", bg: "rgba(242,184,122,0.1)", title: "Smart Prompts", desc: "Overcome writer's block with AI-generated prompts tailored to your current emotional state." },
];

const steps = [
  { num: "01", title: "Create your account", desc: "Sign up in seconds. No credit card required." },
  { num: "02", title: "Write your first entry", desc: "Pour your thoughts into the editor. Choose your mood and let it flow." },
  { num: "03", title: "Get AI insights", desc: "Our AI reads between the lines to surface patterns you might miss." },
  { num: "04", title: "Grow over time", desc: "Track your emotional journey and build lasting mental resilience." },
];

const testimonials = [
  { name: "Aisha K.", role: "Graduate Student", text: "MindScribe helped me spot my anxiety triggers I never noticed before. The AI insights are genuinely eye-opening.", rating: 5 },
  { name: "Marco R.", role: "Software Engineer", text: "I tried 6 journaling apps. This is the only one I actually stick with. The design is calming and the insights are real.", rating: 5 },
  { name: "Priya M.", role: "Therapist", text: "I recommend MindScribe to clients who struggle with self-reflection. The mood tracking has been transformative for many of them.", rating: 5 },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#e89a52" color="#e89a52" />
      ))}
    </div>
  );
}

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mesh text-ink-100 font-body overflow-x-hidden">
      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 glass"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <div className="flex items-center gap-2.5 mr-auto">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4e8c7c, #3d6b5e)" }}>
              <Moon size={14} color="white" />
            </div>
            <span className="font-display text-lg font-semibold">
              Mind<span className="text-gradient-sage">Scribe</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 mr-8">
            {["Features", "How It Works", "Testimonials"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-ink-400 hover:text-ink-200 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg text-sm btn-ghost">
              Sign In
            </button>
            <button onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg text-sm font-medium btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 blur-3xl rounded-full"
            style={{ background: "radial-gradient(ellipse, #4e8c7c 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 animate-fade-up opacity-0-init"
            style={{
              background: "rgba(78,140,124,0.1)",
              border: "1px solid rgba(78,140,124,0.2)",
              color: "#6aab99",
              animationFillMode: "forwards",
            }}>
            <Sparkles size={11} />
            AI-powered mental wellness journaling
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-up opacity-0-init"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            Write. Reflect.{" "}
            <span className="text-gradient-sage italic">Understand</span>{" "}
            yourself.
          </h1>

          <p className="text-lg text-ink-400 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up opacity-0-init"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            MindScribe is your private journaling space with AI that reads between the lines — surfacing patterns, moods, and insights to help you grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up opacity-0-init"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            <button onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold btn-primary">
              Start journaling free <ArrowRight size={16} />
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base btn-ghost">
              See how it works <ChevronRight size={16} />
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 text-xs text-ink-500 animate-fade-up opacity-0-init"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            {["10,000+ entries written", "98% feel better in 30 days", "Free to start"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={11} style={{ color: "#4e8c7c" }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Preview card */}
        <div className="mt-16 max-w-3xl mx-auto animate-fade-up opacity-0-init"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
          <div className="rounded-3xl overflow-hidden p-1"
            style={{
              background: "linear-gradient(135deg, rgba(78,140,124,0.2), rgba(217,124,46,0.1), rgba(192,77,97,0.15))",
            }}>
            <div className="rounded-2xl p-6"
              style={{ background: "#12121a", border: "1px solid rgba(255,255,255,0.04)" }}>
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  {["#d4697b", "#e89a52", "#4e8c7c"].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-1 h-4 rounded-full mx-2"
                  style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
              {/* Mock dashboard preview */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Entries", val: "42", color: "#6aab99" },
                  { label: "Avg Mood", val: "7.8", color: "#f2b87a" },
                  { label: "This Week", val: "5", color: "#d4697b" },
                  { label: "Insights", val: "12", color: "#abc0e3" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-3 text-left"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="font-display text-xl font-bold" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-[10px] text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-ink-400">Today's Entry</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(78,140,124,0.12)", color: "#6aab99" }}>😌 Calm</span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed italic">
                  "Today I noticed I'm most creative in the morning, right after coffee. The AI insight surprised me — it found a pattern I'd never seen myself…"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage-400 mb-3">Features</p>
            <h2 className="font-display text-4xl font-bold text-ink-100 mb-4">
              Everything you need to know yourself
            </h2>
            <p className="text-ink-400 max-w-md mx-auto">
              From simple daily entries to deep AI analysis — MindScribe grows with your mental wellness practice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title}
                className="rounded-2xl p-5 hover:translate-y-[-3px] transition-all duration-300"
                style={{
                  background: "rgba(28,28,40,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.bg }}>
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3 className="font-display font-semibold text-ink-100 mb-2">{f.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6"
        style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Process</p>
            <h2 className="font-display text-4xl font-bold text-ink-100 mb-4">How it works</h2>
            <p className="text-ink-400">Four simple steps to transform your mental wellness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="flex gap-5 p-5 rounded-2xl"
                style={{ background: "rgba(28,28,40,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="font-display text-4xl font-bold flex-shrink-0 leading-none"
                  style={{ color: i % 2 === 0 ? "rgba(78,140,124,0.3)" : "rgba(217,124,46,0.3)" }}>
                  {s.num}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-ink-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-ink-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Testimonials</p>
            <h2 className="font-display text-4xl font-bold text-ink-100 mb-4">Real stories, real growth</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl p-5"
                style={{ background: "rgba(28,28,40,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Stars count={t.rating} />
                <p className="text-sm text-ink-400 leading-relaxed my-4 italic">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-ink-200">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(78,140,124,0.15), rgba(217,124,46,0.08))",
              border: "1px solid rgba(78,140,124,0.2)",
            }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
                style={{ background: "radial-gradient(circle, #4e8c7c, transparent)" }} />
            </div>
            <div className="relative">
              <Moon size={36} className="mx-auto mb-4" style={{ color: "#6aab99" }} />
              <h2 className="font-display text-3xl font-bold text-ink-100 mb-3">
                Start your journey today
              </h2>
              <p className="text-ink-400 mb-8 text-sm">
                Join thousands discovering themselves through mindful writing. Free forever for personal use.
              </p>
              <button onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-primary">
                Create free account <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4e8c7c, #3d6b5e)" }}>
              <Moon size={12} color="white" />
            </div>
            <span className="font-display text-sm font-semibold text-ink-400">
              Mind<span className="text-gradient-sage">Scribe</span>
            </span>
          </div>
          <p className="text-xs text-ink-600">© {new Date().getFullYear()} MindScribe. Your thoughts, your space.</p>
          <div className="flex gap-5 text-xs text-ink-600">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-ink-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
