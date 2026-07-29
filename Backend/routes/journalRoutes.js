const express = require("express");
const protect = require("../middlewares/authMiddlewares");
const {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getJournalSuggestions
} = require("../controllers/journalController");

const router = express.Router();


router.post("/", protect, createJournal);
router.get("/", protect, getJournals);
router.post("/suggest", protect, getJournalSuggestions);
router.get("/:id", protect, getJournalById);
router.put("/:id", protect, updateJournal);
router.delete("/:id", protect, deleteJournal);

module.exports = router;
