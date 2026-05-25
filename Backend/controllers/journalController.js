const Journal = require("../models/Journal");
const analyzeJournal = require("../utils/aiAnalysis");
const {
  buildJournalSuggestions,
  resolveJournalMood,
} = require("../utils/aiAnalysis");

// ---------------- CREATE ----------------
exports.createJournal = async (req, res) => {
  try {
    const { title, content, mood, moodScore, tags, aiReply } = req.body;

    const journal = await Journal.create({
      userId: req.user._id,
      title,
      content,
      mood: mood || "neutral",
      moodScore,
      tags,
      aiReply,
    });

    analyzeJournal(content)
      .then(async (aiResult) => {
        if (!aiResult) return;

        const mappedMood = resolveJournalMood(content, journal.mood, aiResult);

        await Journal.findByIdAndUpdate(journal._id, {
          aiInsights: aiResult,
          mood: mappedMood,
        });
      })
      .catch((err) => console.error("AI async error:", err));

    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET ALL ----------------
exports.getJournals = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 100, 200);
    const skip = (page - 1) * limit;

    const journals = await Journal.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET ONE ----------------
exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- UPDATE ----------------
exports.updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- DELETE ----------------
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json({ message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- AI SUGGESTIONS ----------------
exports.getJournalSuggestions = async (req, res) => {
  try {
    const { content, mood } = req.body;

    if (!content || content.trim().length < 20) {
      return res.status(400).json({
        message: "Write at least 20 characters to get an AI reply.",
      });
    }

    const aiResult = await analyzeJournal(content);
    const suggestions = buildJournalSuggestions(content, aiResult, mood);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
