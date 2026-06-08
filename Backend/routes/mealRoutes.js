const express = require("express");
const protect = require("../middlewares/authMiddlewares");
const {
  analyzeMeal,
  saveMeal,
  getMealHistory,
  getTodaySummary,
  deleteMeal,
} = require("../controllers/mealController");

const router = express.Router();

router.post("/analyze", protect, analyzeMeal);
router.post("/save", protect, saveMeal);
router.get("/history", protect, getMealHistory);
router.get("/today-summary", protect, getTodaySummary);
router.delete("/:id", protect, deleteMeal);

module.exports = router;
