const Meal = require("../models/Meal");
const { analyzeMealText } = require("../services/usdaService");

const round = (value) => Math.round((Number(value) || 0) * 10) / 10;

exports.analyzeMeal = async (req, res) => {
  try {
    const { mealText } = req.body;

    if (!mealText || !mealText.trim()) {
      return res.status(400).json({ message: "Meal text is required." });
    }

    const analysis = await analyzeMealText(mealText);
    res.json(analysis);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Failed to analyze meal.",
    });
  }
};

exports.saveMeal = async (req, res) => {
  try {
    const { foods, totalCalories, totalProtein, totalCarbohydrates, totalFat, totalFiber } = req.body;

    if (!Array.isArray(foods) || foods.length === 0) {
      return res.status(400).json({ message: "Meal foods are required." });
    }

    const meal = await Meal.create({
      user: req.user._id,
      foods,
      totalCalories,
      totalProtein,
      totalCarbohydrates,
      totalFat,
      totalFiber,
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to save meal." });
  }
};

exports.getMealHistory = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(100);
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch meal history." });
  }
};

exports.getTodaySummary = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const [summary] = await Meal.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: null,
          totalCalories: { $sum: "$totalCalories" },
          totalProtein: { $sum: "$totalProtein" },
          totalCarbohydrates: { $sum: "$totalCarbohydrates" },
          totalFat: { $sum: "$totalFat" },
          totalFiber: { $sum: "$totalFiber" },
          totalMeals: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalCalories: round(summary?.totalCalories),
      totalProtein: round(summary?.totalProtein),
      totalCarbohydrates: round(summary?.totalCarbohydrates),
      totalFat: round(summary?.totalFat),
      totalFiber: round(summary?.totalFiber),
      totalMeals: summary?.totalMeals || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch today's summary." });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    res.json({ message: "Meal deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete meal." });
  }
};
