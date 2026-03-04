const Journal = require("../models/Journal");
const analyzeJournal = require("../utils/aiAnalysis");

exports.createJournal = async (req, res) => {
  try {
    const { title, content, moodScore, tags } = req.body;

    // 1️⃣ Save journal first
    const journal = await Journal.create({
      userId: req.user._id,
      title,
      content,
      moodScore,
      tags
    });

    // 2️⃣ Run AI in background
    analyzeJournal(content).then(async (aiResult) => {

      console.log("AI RESULT:", aiResult);

      if (!aiResult) return;

      await Journal.findByIdAndUpdate(journal._id, {
        aiInsights: aiResult
      });

    }).catch(err => console.error("AI async error:", err));

    // 3️⃣ Return immediately (no waiting)
    res.status(201).json(journal);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json({ message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
