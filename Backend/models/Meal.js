const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
  },
  { _id: false }
);

const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  foods: {
    type: [foodSchema],
    required: true,
    validate: {
      validator: (foods) => foods.length > 0,
      message: "A meal must include at least one food item.",
    },
  },
  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbohydrates: { type: Number, default: 0 },
  totalFat: { type: Number, default: 0 },
  totalFiber: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

mealSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Meal", mealSchema);
