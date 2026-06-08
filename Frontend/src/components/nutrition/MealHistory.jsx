import { format } from "date-fns";
import { Trash2 } from "lucide-react";

const formatNumber = (value) => Number(value || 0).toFixed(value % 1 ? 1 : 0);

export default function MealHistory({ meals = [], loading, onDelete }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  if (!meals.length) {
    return (
      <div className="rounded-2xl p-6 text-center text-sm text-ink-500"
        style={{ background: "rgba(28,28,40,0.54)", border: "1px solid rgba(255,255,255,0.06)" }}>
        Saved meals will appear here after you log your first analysis.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {meals.map((meal) => (
        <article
          key={meal._id}
          className="rounded-2xl p-4"
          style={{ background: "rgba(28,28,40,0.62)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-100">
                {formatNumber(meal.totalCalories)} kcal
                <span className="ml-2 text-xs font-medium text-ink-500">
                  {meal.foods?.length || 0} foods
                </span>
              </p>
              <p className="mt-1 text-xs text-ink-500">
                {format(new Date(meal.createdAt), "MMM d, yyyy - h:mm a")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(meal._id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-ink-500 transition-colors hover:bg-rose-600/10 hover:text-rose-400"
              aria-label="Delete meal"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {meal.foods?.map((food, index) => (
              <span key={`${food.name}-${index}`} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-ink-400">
                {food.name}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink-400 sm:grid-cols-4">
            <span>Protein {formatNumber(meal.totalProtein)}g</span>
            <span>Carbs {formatNumber(meal.totalCarbohydrates)}g</span>
            <span>Fat {formatNumber(meal.totalFat)}g</span>
            <span>Fiber {formatNumber(meal.totalFiber)}g</span>
          </div>
        </article>
      ))}
    </div>
  );
}
