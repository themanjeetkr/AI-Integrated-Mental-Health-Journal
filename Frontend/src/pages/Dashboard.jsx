import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import {
  BookOpen, Brain, Flame, Sparkles, PenLine, ArrowRight,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import JournalCard from "../components/ui/JournalCard";
import { useAuth } from "../context/AuthContext";
import { useJournals } from "../context/JournalContext";

const moodToScore = { happy: 9, excited: 10, calm: 8, neutral: 5, anxious: 4, sad: 3, angry: 2 };

function getWeekLabel(date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function generateWeekData(journals) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { day: getWeekLabel(d), date: d.toDateString(), entries: 0, mood: 0 };
  });
  journals.forEach((j) => {
    const date = new Date(j.createdAt).toDateString();
    const idx = days.findIndex((d) => d.date === date);
    if (idx !== -1) {
      days[idx].entries += 1;
      days[idx].mood = moodToScore[j.mood?.toLowerCase()] || 5;
    }
  });
  return days;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs"
      style={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-ink-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const { journals, fetchJournals, loading } = useJournals();
  const navigate = useNavigate();
  const [now] = useState(() => Date.now());

  useEffect(() => { fetchJournals(); }, [fetchJournals]);

  const weekData = useMemo(() => generateWeekData(journals), [journals]);
  const recent = useMemo(() => journals.slice(0, 4), [journals]);

  const avgMood = useMemo(() => {
    const scores = journals.map((j) => moodToScore[j.mood?.toLowerCase()] || 5);
    return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "—";
  }, [journals]);

  const thisWeek = useMemo(() => {
    const weekAgo = now - 7 * 86400000;
    return journals.filter((j) => new Date(j.createdAt) > weekAgo).length;
  }, [journals, now]);

  const aiInsights = [
    { title: "Mood Pattern", text: "You tend to feel more positive on weekdays. Consider what's different on weekends.", color: "#6aab99" },
    { title: "Consistency", text: `You've written ${journals.length} entries total. Journaling regularly helps build self-awareness.`, color: "#e89a52" },
    { title: "Recommendation", text: "Try adding a gratitude section to your next entry to boost your mood score.", color: "#d4697b" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-display text-xl font-semibold text-ink-100 sm:text-2xl">
          {greeting}, <span className="text-gradient-sage">{firstName}</span> ✨
        </h2>
        <p className="text-ink-500 text-sm mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard icon={BookOpen} label="Total Journals" value={journals.length} change={12} changeLabel="vs last month" color="sage" delay={0} />
        <StatCard icon={Brain} label="Avg Mood Score" value={avgMood} color="amber" delay={100} />
        <StatCard icon={Flame} label="This Week" value={thisWeek} change={thisWeek > 3 ? 20 : -10} color="rose" delay={200} />
        <StatCard icon={Sparkles} label="AI Insights" value={aiInsights.length} color="blue" delay={300} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="font-display font-semibold text-ink-200 mb-4">Mood Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weekData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4e8c7c" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4e8c7c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#4a4a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fill: "#4a4a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mood" name="Mood" stroke="#4e8c7c" strokeWidth={2} fill="url(#moodGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5"
          style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="font-display font-semibold text-ink-200 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weekData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#4a4a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: "#4a4a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="entries" name="Entries" fill="#d97c2e" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-ink-200">Recent Entries</h3>
            <button onClick={() => navigate("/journals")}
              className="flex items-center gap-1 text-xs text-sage-400 hover:text-sage-300 transition-colors">
              View all <ArrowRight size={12} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl animate-pulse"
                  style={{ background: "rgba(255,255,255,0.04)" }} />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="rounded-2xl p-8 text-center"
              style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-ink-500 text-sm mb-4">No entries yet. Start your journey!</p>
              <button onClick={() => navigate("/journals/new")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm btn-primary">
                <PenLine size={14} /> Write first entry
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((j) => <JournalCard key={j._id} journal={j} />)}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display font-semibold text-ink-200 mb-4">AI Insights</h3>
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div key={insight.title} className="rounded-2xl p-4"
                style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={13} style={{ color: insight.color }} />
                  <p className="text-xs font-semibold" style={{ color: insight.color }}>{insight.title}</p>
                </div>
                <p className="text-xs text-ink-400 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/journals/new")}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium btn-primary">
            <PenLine size={15} /> New Journal Entry
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
