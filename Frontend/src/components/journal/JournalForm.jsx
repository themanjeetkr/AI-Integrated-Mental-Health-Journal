import { useState } from "react";
import { createJournal } from "../../services/api";

const MOODS = [
  { label: "Happy", emoji: "😊", score: 8 },
  { label: "Excited", emoji: "😄", score: 9 },
  { label: "Calm", emoji: "😌", score: 7 },
  { label: "Neutral", emoji: "😐", score: 5 },
  { label: "Anxious", emoji: "😰", score: 3 },
  { label: "Sad", emoji: "😢", score: 2 },
  { label: "Angry", emoji: "😠", score: 1 },
];

export default function CreateJournalForm({ token, refresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(null); // ← no default mood

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await createJournal(
      {
        title: title.trim() || "Reflection",
        content,
        moodScore: selectedMood ? selectedMood.score : 5, // ← dynamic score
        mood: selectedMood ? selectedMood.label : "Neutral", // ← dynamic mood
        tags: [],
      },
      token
    );

    setTitle("");
    setContent("");
    setSelectedMood(null);
    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
      {/* Title Input */}
      <input
        type="text"
        className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Give this entry a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Mood Selector */}
      <p className="text-sm font-semibold text-gray-500 mb-2">HOW ARE YOU FEELING?</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood)} // ← updates state on click
            className={`px-4 py-2 rounded-full border text-sm flex items-center gap-1 transition
              ${selectedMood?.label === mood.label
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
          >
            {mood.emoji} {mood.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <textarea
        rows="4"
        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="What's on your mind today? Write freely..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
      >
        Save Entry
      </button>
    </div>
  );
}