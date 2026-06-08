const axios = require("axios");

const USDA_SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

const NUTRIENT_MAP = {
  calories: ["Energy", "Energy (Atwater General Factors)", "Energy (Atwater Specific Factors)"],
  protein: ["Protein"],
  carbohydrates: ["Carbohydrate, by difference"],
  fat: ["Total lipid (fat)"],
  fiber: ["Fiber, total dietary"],
};

const COMMON_UNITS = new Set([
  "cup",
  "cups",
  "glass",
  "glasses",
  "bowl",
  "bowls",
  "tbsp",
  "tablespoon",
  "tablespoons",
  "tsp",
  "teaspoon",
  "teaspoons",
  "piece",
  "pieces",
  "slice",
  "slices",
  "serving",
  "servings",
  "small",
  "medium",
  "large",
]);

const round = (value) => Math.round((Number(value) || 0) * 10) / 10;

function parseMealLine(line) {
  const cleaned = line.trim().replace(/\s+/g, " ");
  const match = cleaned.match(/^(\d+(?:\.\d+)?|\d+\/\d+)\s+(.+)$/);

  let quantity = 1;
  let foodText = cleaned;

  if (match) {
    const rawQuantity = match[1];
    quantity = rawQuantity.includes("/")
      ? rawQuantity.split("/").reduce((a, b) => Number(a) / Number(b))
      : Number(rawQuantity);
    foodText = match[2];
  }

  const terms = foodText
    .split(" ")
    .filter((term, index) => index !== 0 || !COMMON_UNITS.has(term.toLowerCase()));

  return {
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    query: terms.join(" ").trim() || foodText,
    original: cleaned,
  };
}

function getNutrientValue(food, aliases) {
  const nutrient = food.foodNutrients?.find((item) =>
    aliases.some((name) => item.nutrientName?.toLowerCase() === name.toLowerCase())
  );

  return Number(nutrient?.value) || 0;
}

function normalizeFood(food, quantity, fallbackName) {
  const base = {
    name: food.description || fallbackName,
    calories: getNutrientValue(food, NUTRIENT_MAP.calories),
    protein: getNutrientValue(food, NUTRIENT_MAP.protein),
    carbohydrates: getNutrientValue(food, NUTRIENT_MAP.carbohydrates),
    fat: getNutrientValue(food, NUTRIENT_MAP.fat),
    fiber: getNutrientValue(food, NUTRIENT_MAP.fiber),
  };

  return {
    name: base.name
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    calories: round(base.calories * quantity),
    protein: round(base.protein * quantity),
    carbohydrates: round(base.carbohydrates * quantity),
    fat: round(base.fat * quantity),
    fiber: round(base.fiber * quantity),
  };
}

async function searchFood(query, quantity = 1) {
  const apiKey = process.env.USDA_API_KEY;

  if (!apiKey) {
    const error = new Error("USDA_API_KEY is not configured");
    error.statusCode = 500;
    throw error;
  }

  const { data } = await axios.get(USDA_SEARCH_URL, {
    params: {
      api_key: apiKey,
      query,
      pageSize: 1,
    },
    timeout: 12000,
  });

  const food = data.foods?.[0];

  if (!food) {
    const error = new Error(`No USDA match found for "${query}"`);
    error.statusCode = 404;
    throw error;
  }

  return normalizeFood(food, quantity, query);
}

async function analyzeMealText(mealText) {
  const lines = mealText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    const error = new Error("Add at least one food item to analyze.");
    error.statusCode = 400;
    throw error;
  }

  const foods = await Promise.all(
    lines.map(async (line) => {
      const parsed = parseMealLine(line);
      return searchFood(parsed.query, parsed.quantity);
    })
  );

  const totals = foods.reduce(
    (acc, food) => ({
      totalCalories: acc.totalCalories + food.calories,
      totalProtein: acc.totalProtein + food.protein,
      totalCarbohydrates: acc.totalCarbohydrates + food.carbohydrates,
      totalFat: acc.totalFat + food.fat,
      totalFiber: acc.totalFiber + food.fiber,
    }),
    {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrates: 0,
      totalFat: 0,
      totalFiber: 0,
    }
  );

  return {
    foods,
    totalCalories: round(totals.totalCalories),
    totalProtein: round(totals.totalProtein),
    totalCarbohydrates: round(totals.totalCarbohydrates),
    totalFat: round(totals.totalFat),
    totalFiber: round(totals.totalFiber),
  };
}

module.exports = {
  analyzeMealText,
};
