import { useState } from "react";
import { createJournal } from "../../services/api";

export default function CreateJournalForm({ token, refresh }) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await createJournal(
      {
        title: "Reflection",
        content,
        moodScore: 3,
        tags: [],
      },
      token
    );

    setContent("");
    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
      <textarea
        rows="4"
        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="How are you feeling today?"
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