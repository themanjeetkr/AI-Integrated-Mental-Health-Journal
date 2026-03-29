import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useJournals } from "../context/JournalContext";

const moods = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "excited", emoji: "🤩", label: "Excited" },
  { value: "calm", emoji: "😌", label: "Calm" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "anxious", emoji: "😰", label: "Anxious" },
  { value: "sad", emoji: "😢", label: "Sad" },
  { value: "angry", emoji: "😤", label: "Angry" },
];

// 🔥 AI → App Mood Mapping
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

export default function JournalEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const {
    addJournal,
    editJournal,
    fetchJournalById,
    fetchJournals,
  } = useJournals();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ❌ removed default "neutral"
  const [mood, setMood] = useState("");

  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // ---------------- LOAD EXISTING ----------------
  useEffect(() => {
    if (isEdit) {
      fetchJournalById(id).then((j) => {
        if (j) {
          setTitle(j.title || "");
          setContent(j.content || "");
          setMood(j.mood || "");
        }
      });
    }
  }, [id]);

  // ---------------- WORD COUNT ----------------
  useEffect(() => {
    setWordCount(
      content.trim() ? content.trim().split(/\s+/).length : 0
    );
  }, [content]);

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;

    // 🔥 FORCE USER TO SELECT MOOD
    if (!mood) {
      alert("Please select your mood");
      return;
    }

    setSaving(true);

    try {
      // 🔥 If you have AI result, replace this
      const aiResult = null;

      // 🔥 FINAL MOOD LOGIC
      const finalMood =
        (aiResult?.primaryEmotion &&
          emotionMap[aiResult.primaryEmotion.toLowerCase()]) ||
        mood ||
        "neutral";

      const data = {
        title: title.trim() || "Untitled",
        content,
        mood: finalMood,
      };

      console.log("Saving:", data); // debug

      const result = isEdit
        ? await editJournal(id, data)
        : await addJournal(data);

      console.log("Saved:", result);

      if (result) {
        await fetchJournals();     // ensure latest data
        navigate("/insights");     // go to insights directly
      }
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
  };

  return (
    <DashboardLayout title={isEdit ? "Edit Entry" : "New Entry"}>
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-300 mb-6"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(28,28,40,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >

          {/* Title */}
          <div className="px-6 pt-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this entry a title…"
              className="w-full bg-transparent text-2xl font-semibold text-ink-100 outline-none"
            />
          </div>

          {/* Mood Selector */}
          <div className="px-6 py-4 border-y border-white/5">
            <p className="text-xs text-ink-500 mb-2">
              How are you feeling?
            </p>

            <div className="flex gap-2 flex-wrap">
              {moods.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`px-3 py-1 rounded-full text-xs transition ${
                    mood === m.value
                      ? "bg-green-500/20 text-green-300 scale-105"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts..."
              rows={12}
              className="w-full bg-transparent text-sm text-ink-300 outline-none resize-none"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex justify-between items-center border-t border-white/5">
            <p className="text-xs text-ink-500">{wordCount} words</p>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}