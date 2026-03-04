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
    moodScore: {
      type: Number,
      min: -5,
      max: 5
    },
    tags: [String],

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

// Important index for performance
journalSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Journal", journalSchema);
