const Journal = require("../models/Journal");
const analyzeJournal = require("../utils/aiAnalysis");

// 🔥 AI → Mood mapping
const emotionMap = {
  joy: "happy",
  happiness: "happy",
  excitement: "excited",
  calmness: "calm",
  anxiety: "anxious",
  fear: "anxious",
  sadness: "sad",
  anger: "angry",
  neutral: "neutral",
};

// ---------------- CREATE ----------------
exports.createJournal = async (req, res) => {
  try {
    const { title, content, mood, moodScore, tags } = req.body;

    console.log("REQ BODY:", req.body); // 🔍 debug

    // 🔥 Save initial journal (with mood)
    const journal = await Journal.create({
      userId: req.user._id,
      title,
      content,
      mood, // ✅ FIXED
      moodScore,
      tags,
    });

    // 🔥 Run AI in background
    analyzeJournal(content)
      .then(async (aiResult) => {
        console.log("AI RESULT:", aiResult);

        if (!aiResult) return;

        // 🔥 Map AI emotion → mood
        const mappedMood =
          emotionMap[aiResult.primaryEmotion?.toLowerCase()] ||
          journal.mood ||
          "neutral";

        await Journal.findByIdAndUpdate(journal._id, {
          aiInsights: aiResult,
          mood: mappedMood, // 🔥 UPDATE MOOD FROM AI
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
    const limit = 5;
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