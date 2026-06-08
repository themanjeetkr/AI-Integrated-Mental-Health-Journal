import { createElement } from "react";
import { Activity, Flame, Utensils, Wheat } from "lucide-react";

const cards = [
  { key: "totalCalories", label: "Total Calories", unit: "kcal", icon: Flame, color: "#e89a52" },
  { key: "totalProtein", label: "Total Protein", unit: "g", icon: Activity, color: "#6aab99" },
  { key: "totalCarbohydrates", label: "Total Carbs", unit: "g", icon: Wheat, color: "#8faad4" },
  { key: "totalFat", label: "Total Fat", unit: "g", icon: Utensils, color: "#d4697b" },
  { key: "totalFiber", label: "Total Fiber", unit: "g", icon: Activity, color: "#83ead6" },
];

const formatValue = (value) => Number(value || 0).toFixed(value % 1 ? 1 : 0);

export default function NutritionSummary({ summary, compact = false }) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-5"}`}>
      {cards.map(({ key, label, unit, icon, color }) => (
        <div
          key={key}
          className="rounded-2xl p-4"
          style={{ background: "rgba(28,28,40,0.62)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-ink-400">{label}</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `${color}22`, color }}>
              {createElement(icon, { size: 16 })}
            </span>
          </div>
          <p className="font-display text-2xl font-semibold text-ink-100">
            {formatValue(summary?.[key])}
            <span className="ml-1 text-xs font-medium text-ink-500">{unit}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
