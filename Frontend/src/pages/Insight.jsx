import { useEffect, useMemo } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend,
} from "recharts";
import { Sparkles, TrendingUp, Heart, Brain } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useJournals } from "../context/JournalContext";

const MOOD_COLORS = {
  happy: "#6aab99",
  excited: "#f2b87a",
  calm: "#92c4b6",
  neutral: "#9898b8",
  anxious: "#e89a52",
  sad: "#8faad4",
  angry: "#d4697b",
};

const moodToScore = { happy: 9, excited: 10, calm: 8, neutral: 5, anxious: 4, sad: 3, angry: 2 };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs" style={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.08)" }}>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.payload.fill || p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Insights() {
  const { journals, fetchJournals } = useJournals();
  useEffect(() => { fetchJournals(); }, [fetchJournals]);

  // Mood distribution for pie chart
  const moodDist = useMemo(() => {
    const counts = {};
    journals.forEach((j) => {
      const m = j.mood?.toLowerCase() || "neutral";
      counts[m] = (counts[m] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      fill: MOOD_COLORS[name] || "#9898b8",
    }));
  }, [journals]);

  // Radar: emotional balance
  const radarData = [
    { axis: "Joy", value: journals.filter((j) => ["happy", "excited"].includes(j.mood?.toLowerCase())).length },
    { axis: "Calm", value: journals.filter((j) => j.mood?.toLowerCase() === "calm").length },
    { axis: "Focus", value: Math.round(journals.length * 0.6) },
    { axis: "Anxiety", value: journals.filter((j) => j.mood?.toLowerCase() === "anxious").length },
    { axis: "Sadness", value: journals.filter((j) => j.mood?.toLowerCase() === "sad").length },
    { axis: "Anger", value: journals.filter((j) => j.mood?.toLowerCase() === "angry").length },
  ];

  const avgMood = useMemo(() => {
    const scores = journals.map((j) => moodToScore[j.mood?.toLowerCase()] || 5);
    return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
  }, [journals]);

  const aiInsightCards = [
    {
      icon: Brain,
      color: "#6aab99",
      bg: "rgba(78,140,124,0.08)",
      border: "rgba(78,140,124,0.15)",
      title: "Emotional Pattern",
      body: journals.length
        ? `Your dominant mood is "${moodDist[0]?.name || "Neutral"}". Awareness of patterns is the first step to growth.`
        : "Write more entries to unlock emotional pattern analysis.",
    },
    {
      icon: Heart,
      color: "#e89a52",
      bg: "rgba(217,124,46,0.08)",
      border: "rgba(217,124,46,0.15)",
      title: "Well-being Score",
      body: `Your average mood score is ${avgMood}/10. ${Number(avgMood) >= 7 ? "You're doing great — keep nurturing positive habits!" : "Consider activities that bring you joy to boost your overall score."}`,
    },
    {
      icon: TrendingUp,
      color: "#d4697b",
      bg: "rgba(192,77,97,0.08)",
      border: "rgba(192,77,97,0.15)",
      title: "Journaling Habit",
      body: `${journals.length} total entries recorded. Consistent journaling improves self-awareness and emotional regulation over time.`,
    },
    {
      icon: Sparkles,
      color: "#abc0e3",
      bg: "rgba(99,130,201,0.08)",
      border: "rgba(99,130,201,0.15)",
      title: "Recommendation",
      body: "Try the 5-minute gratitude exercise: write 3 things you're grateful for at the end of each day.",
    },
  ];

  return (
    <DashboardLayout title="Insights">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-up opacity-0-init" style={{ animationFillMode: "forwards" }}>
          <h2 className="font-display text-2xl font-semibold text-ink-100">Your Mental Landscape</h2>
          <p className="text-sm text-ink-500 mt-1">AI-generated insights based on your journal entries</p>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Mood distribution */}
          <div className="rounded-2xl p-5 animate-fade-up opacity-0-init"
            style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", animationDelay: "100ms", animationFillMode: "forwards" }}>
            <h3 className="font-display font-semibold text-ink-200 mb-4">Mood Distribution</h3>
            {moodDist.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-ink-600 text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={moodDist} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {moodDist.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value) => <span style={{ color: "#9898b8", fontSize: 11 }}>{value}</span>}
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Emotional balance radar */}
          <div className="rounded-2xl p-5 animate-fade-up opacity-0-init"
            style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", animationDelay: "150ms", animationFillMode: "forwards" }}>
            <h3 className="font-display font-semibold text-ink-200 mb-4">Emotional Balance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "#4a4a6a", fontSize: 11 }} />
                <Radar name="Emotions" dataKey="value" stroke="#4e8c7c" fill="#4e8c7c" fillOpacity={0.2} strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI insight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiInsightCards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl p-5 animate-fade-up opacity-0-init"
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                animationDelay: `${200 + i * 80}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <card.icon size={15} style={{ color: card.color }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: card.color }}>{card.title}</p>
              </div>
              <p className="text-sm text-ink-400 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
