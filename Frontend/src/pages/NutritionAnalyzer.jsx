import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, subDays } from "date-fns";
import { BarChart3, Loader2, Save, Utensils } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import MealBreakdown from "../components/nutrition/MealBreakdown";
import MealHistory from "../components/nutrition/MealHistory";
import NutritionSummary from "../components/nutrition/NutritionSummary";
import {
  analyzeMealRequest,
  deleteMealRequest,
  getMealHistoryRequest,
  getTodayNutritionSummaryRequest,
  saveMealRequest,
} from "../services/api";

const emptySummary = {
  totalCalories: 0,
  totalProtein: 0,
  totalCarbohydrates: 0,
  totalFat: 0,
  totalFiber: 0,
  totalMeals: 0,
};

const exampleMeal = "2 bananas\n1 apple\n1 glass milk";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl px-3 py-2 text-xs"
      style={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="mb-1 text-ink-400">{label}</p>
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>
          {item.name}: {Number(item.value || 0).toFixed(0)}
        </p>
      ))}
    </div>
  );
};

function buildDailyTrend(meals) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = subDays(new Date(), 6 - index);
    return {
      label: format(date, "EEE"),
      key: format(date, "yyyy-MM-dd"),
      calories: 0,
      meals: 0,
    };
  });

  meals.forEach((meal) => {
    const key = format(new Date(meal.createdAt), "yyyy-MM-dd");
    const match = days.find((day) => day.key === key);
    if (match) {
      match.calories += Number(meal.totalCalories) || 0;
      match.meals += 1;
    }
  });

  return days.map((day) => ({
    ...day,
    calories: Math.round(day.calories),
  }));
}

function buildWeeklyTrend(meals) {
  const weeks = Array.from({ length: 4 }, (_, index) => ({
    label: `Week ${index + 1}`,
    start: subDays(new Date(), (3 - index) * 7 + 6),
    end: subDays(new Date(), (3 - index) * 7),
    calories: 0,
  }));

  meals.forEach((meal) => {
    const created = new Date(meal.createdAt);
    const match = weeks.find((week) => created >= week.start && created <= week.end);
    if (match) match.calories += Number(meal.totalCalories) || 0;
  });

  return weeks.map((week) => ({
    label: week.label,
    calories: Math.round(week.calories),
  }));
}

export default function NutritionAnalyzer() {
  const [mealText, setMealText] = useState(exampleMeal);
  const [analysis, setAnalysis] = useState(null);
  const [todaySummary, setTodaySummary] = useState(emptySummary);
  const [history, setHistory] = useState([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [saving, setSaving] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchNutritionData = useCallback(async () => {
    if (!token) return;

    setHistoryLoading(true);
    try {
      const [historyData, summaryData] = await Promise.all([
        getMealHistoryRequest(token),
        getTodayNutritionSummaryRequest(token),
      ]);
      setHistory(Array.isArray(historyData) ? historyData : []);
      setTodaySummary(summaryData || emptySummary);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load nutrition data.");
    } finally {
      setHistoryLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNutritionData();
  }, [fetchNutritionData]);

  const dailyTrend = useMemo(() => buildDailyTrend(history), [history]);
  const weeklyTrend = useMemo(() => buildWeeklyTrend(history), [history]);

  const totalMeals = history.length;
  const averageCalories = totalMeals
    ? Math.round(history.reduce((sum, meal) => sum + Number(meal.totalCalories || 0), 0) / totalMeals)
    : 0;

  const handleAnalyze = async (event) => {
    event.preventDefault();

    if (!mealText.trim()) {
      setError("Add at least one food item before analyzing.");
      return;
    }

    setLoadingAnalysis(true);
    setError("");

    try {
      const data = await analyzeMealRequest(mealText, token);
      setAnalysis(data);
      toast.success("Meal analyzed");
    } catch (err) {
      const message = err.response?.data?.message || "Unable to analyze this meal.";
      setError(message);
      toast.error(message);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleSave = async () => {
    if (!analysis) return;

    setSaving(true);
    try {
      await saveMealRequest(analysis, token);
      toast.success("Meal saved");
      setAnalysis(null);
      await fetchNutritionData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save meal.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMealRequest(id, token);
      toast.success("Meal deleted");
      await fetchNutritionData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete meal.");
    }
  };

  return (
    <DashboardLayout title="Nutrition & Meal Analyzer">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-100 sm:text-2xl">
            Nutrition & Meal Analyzer
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Analyze meals, save nutrition history, and track daily intake.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white/[0.04] px-3 py-2 text-xs text-ink-400">
          <Utensils size={15} className="text-sage-400" />
          USDA FoodData Central
        </div>
      </div>

      <div className="mb-6">
        <NutritionSummary summary={todaySummary} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <section className="space-y-5">
          <form
            onSubmit={handleAnalyze}
            className="rounded-2xl p-5"
            style={{ background: "rgba(28,28,40,0.64)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-ink-100">Analyze Meal</h3>
                <p className="mt-1 text-xs text-ink-500">Enter one food item per line.</p>
              </div>
              <button
                type="button"
                onClick={() => setMealText(exampleMeal)}
                className="rounded-xl px-3 py-2 text-xs font-medium text-sage-300 transition-colors hover:bg-sage-600/10"
              >
                Use Example
              </button>
            </div>

            <textarea
              value={mealText}
              onChange={(event) => setMealText(event.target.value)}
              rows={7}
              className="input-dark resize-none text-ink-100 outline-none transition-colors focus:border-sage-500/60"
              placeholder={"banana\napple\nmilk"}
            />

            {error && (
              <p className="mt-3 rounded-xl border border-rose-600/20 bg-rose-600/10 px-3 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loadingAnalysis}
                className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingAnalysis ? <Loader2 size={16} className="animate-spin" /> : <BarChart3 size={16} />}
                Analyze Meal
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!analysis || saving}
                className="btn-secondary inline-flex min-h-11 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Meal
              </button>
            </div>
          </form>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-ink-100">Food Breakdown</h3>
              {analysis?.foods?.length > 0 && (
                <span className="text-xs text-ink-500">{analysis.foods.length} foods analyzed</span>
              )}
            </div>
            <MealBreakdown foods={analysis?.foods || []} />
          </div>

          {analysis && (
            <div>
              <h3 className="mb-3 font-display text-base font-semibold text-ink-100">Meal Totals</h3>
              <NutritionSummary summary={analysis} compact />
            </div>
          )}
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl p-5"
            style={{ background: "rgba(28,28,40,0.64)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="font-display text-base font-semibold text-ink-100">Analytics</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-ink-500">Total Meals Logged</p>
                <p className="mt-2 font-display text-2xl font-semibold text-sage-300">{totalMeals}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-ink-500">Average Calories</p>
                <p className="mt-2 font-display text-2xl font-semibold text-amber-300">{averageCalories}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold text-ink-400">Daily Calories Trend</p>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={dailyTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="nutritionDaily" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6aab99" stopOpacity={0.36} />
                      <stop offset="100%" stopColor="#6aab99" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" tick={{ fill: "#6e6e96", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6e6e96", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="calories" name="Calories" stroke="#6aab99" strokeWidth={2} fill="url(#nutritionDaily)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold text-ink-400">Weekly Calories Trend</p>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={weeklyTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" tick={{ fill: "#6e6e96", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6e6e96", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="calories" name="Calories" fill="#e89a52" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-display text-base font-semibold text-ink-100">Meal History</h3>
            <MealHistory meals={history} loading={historyLoading} onDelete={handleDelete} />
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
