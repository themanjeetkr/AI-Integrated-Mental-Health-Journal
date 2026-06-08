const nutrients = [
  { key: "calories", label: "Calories", unit: "kcal" },
  { key: "protein", label: "Protein", unit: "g" },
  { key: "carbohydrates", label: "Carbs", unit: "g" },
  { key: "fat", label: "Fat", unit: "g" },
  { key: "fiber", label: "Fiber", unit: "g" },
];

const formatValue = (value) => Number(value || 0).toFixed(value % 1 ? 1 : 0);

export default function MealBreakdown({ foods = [] }) {
  if (!foods.length) {
    return (
      <div className="rounded-2xl p-6 text-center text-sm text-ink-500"
        style={{ background: "rgba(28,28,40,0.54)", border: "1px solid rgba(255,255,255,0.06)" }}>
        Add foods and analyze your meal to see a nutrition breakdown.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl"
      style={{ background: "rgba(28,28,40,0.62)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="hidden grid-cols-[1.4fr_repeat(5,1fr)] gap-3 border-b border-white/[0.06] px-4 py-3 text-xs font-semibold text-ink-400 md:grid">
        <span>Food</span>
        {nutrients.map((nutrient) => <span key={nutrient.key}>{nutrient.label}</span>)}
      </div>

      <div className="divide-y divide-white/[0.06]">
        {foods.map((food, index) => (
          <div key={`${food.name}-${index}`} className="grid gap-3 px-4 py-4 md:grid-cols-[1.4fr_repeat(5,1fr)] md:items-center">
            <div>
              <p className="text-sm font-semibold text-ink-100">{food.name}</p>
              <p className="text-xs text-ink-500">USDA FoodData Central match</p>
            </div>

            <div className="grid grid-cols-2 gap-2 min-[460px]:grid-cols-5 md:contents">
              {nutrients.map(({ key, label, unit }) => (
                <div key={key} className="rounded-xl bg-white/[0.035] px-3 py-2 md:bg-transparent md:p-0">
                  <p className="text-[11px] font-medium text-ink-500 md:hidden">{label}</p>
                  <p className="text-sm font-semibold text-ink-200">
                    {formatValue(food[key])}
                    <span className="ml-1 text-[11px] text-ink-500">{unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
