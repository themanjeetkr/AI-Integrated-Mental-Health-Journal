const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    // 🔥 ADD THIS (VERY IMPORTANT)
    mood: {
      type: String,
      enum: ["happy", "excited", "calm", "neutral", "anxious", "sad", "angry"],
      default: "neutral"
    },

    moodScore: {
      type: Number,
      min: -5,
      max: 5
    },

    tags: [String],

    aiReply: String,

    aiInsights: {
      sentimentScore: Number,
      primaryEmotion: String,
      secondaryEmotions: [String],
      riskLevel: String,
      recommendations: [String]
    }
  },
  { timestamps: true }
);

journalSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Journal", journalSchema);
