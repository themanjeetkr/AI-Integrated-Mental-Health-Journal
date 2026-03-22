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

export default function JournalEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addJournal, editJournal, fetchJournalById } = useJournals();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("neutral");
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (isEdit) {
      fetchJournalById(id).then((j) => {
        if (j) { setTitle(j.title || ""); setContent(j.content || ""); setMood(j.mood || "neutral"); }
      });
    }
  }, [id]);

  useEffect(() => {
    setWordCount(content.trim() ? content.trim().split(/\s+/).length : 0);
  }, [content]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    setSaving(true);
    const data = { title: title.trim() || "Untitled", content, mood };
    const result = isEdit ? await editJournal(id, data) : await addJournal(data);
    setSaving(false);
    if (result) navigate("/journals");
  };

  return (
    <DashboardLayout title={isEdit ? "Edit Entry" : "New Entry"}>
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-300 transition-colors mb-6"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="rounded-2xl overflow-hidden animate-fade-up opacity-0-init"
          style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", animationFillMode: "forwards" }}>
          
          {/* Title */}
          <div className="px-6 pt-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this entry a title…"
              className="w-full bg-transparent font-display text-2xl font-semibold text-ink-100 placeholder-ink-700 outline-none"
            />
            <p className="text-xs text-ink-600 mt-1">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Mood selector */}
          <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-xs text-ink-500 mb-2 font-medium uppercase tracking-wider">How are you feeling?</p>
            <div className="flex gap-2 flex-wrap">
              {moods.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    mood === m.value
                      ? "bg-sage-600/20 text-sage-300 border border-sage-600/30 scale-105"
                      : "btn-ghost text-ink-500"
                  }`}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind today? Write freely…"
              rows={14}
              className="w-full bg-transparent text-sm text-ink-300 placeholder-ink-700 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-xs text-ink-600">{wordCount} words</p>
            <button
              onClick={handleSave}
              disabled={saving || (!title.trim() && !content.trim())}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Saving…" : "Save Entry"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
