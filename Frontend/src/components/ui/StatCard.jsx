import { createElement } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorMap = {
  sage: {
    bg: "rgba(78, 140, 124, 0.08)",
    border: "rgba(78, 140, 124, 0.18)",
    icon: "rgba(78, 140, 124, 0.2)",
    iconText: "#6aab99",
    value: "#92c4b6",
  },
  amber: {
    bg: "rgba(217, 124, 46, 0.08)",
    border: "rgba(217, 124, 46, 0.18)",
    icon: "rgba(217, 124, 46, 0.2)",
    iconText: "#e89a52",
    value: "#f2b87a",
  },
  rose: {
    bg: "rgba(192, 77, 97, 0.08)",
    border: "rgba(192, 77, 97, 0.18)",
    icon: "rgba(192, 77, 97, 0.2)",
    iconText: "#d4697b",
    value: "#e490a0",
  },
  blue: {
    bg: "rgba(99, 130, 201, 0.08)",
    border: "rgba(99, 130, 201, 0.18)",
    icon: "rgba(99, 130, 201, 0.2)",
    iconText: "#8faad4",
    value: "#abc0e3",
  },
};

export default function StatCard({ icon, label, value, change, changeLabel, color = "sage", delay = 0 }) {
  const c = colorMap[color];
  const positive = change >= 0;

  return (
    <div
      className="rounded-2xl p-5 animate-fade-up opacity-0-init"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: c.icon }}>
          {createElement(icon, { size: 18, style: { color: c.iconText } })}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            positive ? "bg-sage-600/10 text-sage-400" : "bg-rose-600/10 text-rose-400"
          }`}>
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <p className="font-display text-3xl font-semibold mb-1" style={{ color: c.value }}>
        {value}
      </p>
      <p className="text-sm text-ink-400">{label}</p>
      {changeLabel && (
        <p className="text-xs text-ink-500 mt-1">{changeLabel}</p>
      )}
    </div>
  );
}
