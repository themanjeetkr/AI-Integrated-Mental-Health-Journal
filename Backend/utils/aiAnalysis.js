const axios = require("axios");

const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const EMOTION_API =
"https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base";

async function analyzeJournal(content) {
  try {

    const response = await axios.post(
      EMOTION_API,
      { inputs: content },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    const emotions = response.data[0];
    const sorted = emotions.sort((a,b)=>b.score-a.score);

    const primaryEmotion = sorted[0].label;
    const secondaryEmotions = sorted.slice(1,3).map(e=>e.label);

    const negative = ["sadness","anger","fear","disgust"];
    const sentimentScore = negative.includes(primaryEmotion) ? -0.5 : 0.5;

    return {
      sentimentScore,
      primaryEmotion,
      secondaryEmotions,
      riskLevel: sentimentScore < 0 ? "medium":"low",
      recommendations: ["Take a short mindful break."]
    };

  } catch (err) {
    console.error("HF AI error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = analyzeJournal;