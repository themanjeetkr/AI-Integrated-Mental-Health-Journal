const axios = require("axios");

const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const EMOTION_API =
"https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base";

function getRecommendation(emotion) {
  switch (emotion) {
    
    case "joy":
      return ["Keep doing what makes you feel happy and productive."];

    case "sadness":
      return ["Consider talking to a friend or writing down what you're feeling."];

    case "anger":
      return ["Take a few deep breaths and step away for a moment."];

    case "fear":
      return ["Try a short breathing or grounding exercise."];

    case "surprise":
      return ["Reflect on what caused this feeling and what you learned."];

    case "neutral":
      return ["Take a moment to reflect on something positive today."];

    default:
      return ["Take a short mindful break."];
  }
}

const moodToEmotion = {
  happy: "joy",
  excited: "joy",
  calm: "neutral",
  neutral: "neutral",
  anxious: "fear",
  sad: "sadness",
  angry: "anger",
};

const emotionToMood = {
  joy: "happy",
  happiness: "happy",
  excitement: "excited",
  calmness: "calm",
  anxiety: "anxious",
  fear: "anxious",
  sadness: "sad",
  anger: "angry",
  disgust: "angry",
  neutral: "neutral",
};

function detectEmotionFromText(content) {
  const text = ` ${String(content || "").toLowerCase()} `;

  const rules = [
    {
      emotion: "anger",
      words: [
        " angry ",
        " mad ",
        " rage ",
        " furious ",
        " fight ",
        " fought ",
        " beat ",
        " hit ",
        " punch ",
        " slapped ",
        " hate ",
        " annoyed ",
        " irritated ",
      ],
    },
    {
      emotion: "sadness",
      words: [
        " sad ",
        " cried ",
        " cry ",
        " lonely ",
        " depressed ",
        " hopeless ",
        " hurt ",
        " broken ",
        " lost ",
      ],
    },
    {
      emotion: "fear",
      words: [
        " scared ",
        " afraid ",
        " anxious ",
        " anxiety ",
        " worried ",
        " panic ",
        " nervous ",
        " stress ",
        " stressed ",
      ],
    },
    {
      emotion: "joy",
      words: [
        " happy ",
        " excited ",
        " proud ",
        " grateful ",
        " great ",
        " awesome ",
        " won ",
        " achieved ",
      ],
    },
  ];

  return rules.find((rule) => rule.words.some((word) => text.includes(word)))
    ?.emotion;
}

function resolveJournalMood(content, selectedMood, aiResult) {
  const normalizedSelectedMood = selectedMood?.toLowerCase();
  const keywordEmotion = detectEmotionFromText(content);
  const aiEmotion = aiResult?.primaryEmotion?.toLowerCase();
  const aiConfidence = Number(aiResult?.confidence || 0);
  const wordCount = String(content || "").trim().split(/\s+/).filter(Boolean).length;

  if (keywordEmotion) {
    return emotionToMood[keywordEmotion] || normalizedSelectedMood || "neutral";
  }

  if (normalizedSelectedMood && (wordCount < 12 || aiConfidence < 0.65)) {
    return normalizedSelectedMood;
  }

  return emotionToMood[aiEmotion] || normalizedSelectedMood || "neutral";
}

function buildJournalReply(content, mood, aiResult) {
  const detectedMood = mood || resolveJournalMood(content, null, aiResult);

  switch (detectedMood) {
    case "angry":
      return "I hear anger in this entry. Before reacting, pause for a moment, breathe slowly, and write what boundary or need is underneath that feeling.";
    case "sad":
      return "This sounds heavy. Try writing one sentence about what hurt most, then one small kind thing you can do for yourself next.";
    case "anxious":
      return "It sounds like your mind is carrying worry. Name what is in your control right now, then choose one tiny next step.";
    case "happy":
    case "excited":
      return "There is positive energy here. Capture what made this moment work so you can recognize and repeat it later.";
    case "calm":
      return "This entry feels steady. Notice what helped you feel calm and how you can protect a little more of that space.";
    default:
      return "Thanks for writing this down. Add one more detail about what happened, what you felt, and what you want to do next.";
  }
}

function buildJournalSuggestions(content, aiResult, selectedMood) {
  const text = (content || "").trim();
  const lowerText = text.toLowerCase();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const resolvedMood = resolveJournalMood(content, selectedMood, aiResult);
  const emotion = moodToEmotion[resolvedMood] || aiResult?.primaryEmotion?.toLowerCase() || "neutral";
  const recommendations = getRecommendation(emotion);

  const suggestions = [
    ...recommendations,
  ];

  if (wordCount < 25) {
    suggestions.push("Add a few more details about what happened and how it affected you.");
  } else {
    suggestions.push("Notice one pattern in this entry that you might want to carry into tomorrow.");
  }

  if (!lowerText.includes("grateful") && !lowerText.includes("thank")) {
    suggestions.push("Write one small thing you appreciated today, even if the day was difficult.");
  }

  if (["sadness", "anger", "fear", "disgust"].includes(emotion)) {
    suggestions.push("Try naming one gentle next step you can take in the next 10 minutes.");
  } else if (["joy", "surprise"].includes(emotion)) {
    suggestions.push("Capture what helped this moment feel good so you can repeat it later.");
  }

  return {
    primaryEmotion: emotion,
    mood: resolvedMood,
    sentimentScore: aiResult?.sentimentScore ?? 0,
    riskLevel: aiResult?.riskLevel || "low",
    reply: buildJournalReply(content, resolvedMood, aiResult),
    suggestions: [...new Set(suggestions)].slice(0, 4),
  };
}

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

    const primaryEmotion = sorted[0].label.toLowerCase();
    const secondaryEmotions = sorted.slice(1,3).map(e=>e.label);
    const confidence = sorted[0].score;

    const negative = ["sadness","anger","fear","disgust"];
    const sentimentScore = negative.includes(primaryEmotion) ? -0.5 : 0.5;

    return {
      sentimentScore,
      primaryEmotion,
      confidence,
      secondaryEmotions,
      riskLevel: sentimentScore < 0 ? "medium":"low",
      recommendations: getRecommendation(primaryEmotion)
    };

  } catch (err) {
    console.error("HF AI error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = analyzeJournal;
module.exports.buildJournalSuggestions = buildJournalSuggestions;
module.exports.resolveJournalMood = resolveJournalMood;
