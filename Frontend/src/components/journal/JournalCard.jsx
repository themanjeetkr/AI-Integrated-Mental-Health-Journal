import { emojiMap } from "../../utils/emojiMap";

const colorMap = {
  joy: "bg-joy",
  sadness: "bg-sadness",
  fear: "bg-fear",
  anger: "bg-anger",
  neutral: "bg-neutral"
};

export default function JournalCard({ journal }) {
  const emotion = journal.aiInsights?.primaryEmotion || "neutral";

  return (
    <div className={`${colorMap[emotion]} p-6 rounded-2xl shadow-sm`}>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-lg">
          {emojiMap[emotion]} {journal.title}
        </h3>

        <span className="text-sm text-gray-500">
          {new Date(journal.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-700">{journal.content}</p>

      {journal.aiInsights?.recommendations?.length > 0 && (
        <div className="mt-4 bg-white/60 p-3 rounded-xl text-sm">
          💡 {journal.aiInsights.recommendations[0]}
        </div>
      )}
    </div>
  );
}