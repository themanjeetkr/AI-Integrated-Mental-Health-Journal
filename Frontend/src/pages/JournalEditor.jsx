import { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  Save,
  Loader2,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useJournals } from "../context/JournalContext";
import { getJournalSuggestions } from "../services/api";

const moods = [
  { value: "happy", label: "Happy" },
  { value: "excited", label: "Excited" },
  { value: "calm", label: "Calm" },
  { value: "neutral", label: "Neutral" },
  { value: "anxious", label: "Anxious" },
  { value: "sad", label: "Sad" },
  { value: "angry", label: "Angry" },
];

export default function JournalEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { addJournal, editJournal, fetchJournalById, fetchJournals } =
    useJournals();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [suggestionData, setSuggestionData] = useState(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");
  const lastReplyKey = useRef("");

  useEffect(() => {
    if (isEdit) {
      fetchJournalById(id).then((j) => {
        if (j) {
          setTitle(j.title || "");
          setContent(j.content || "");
          setMood(j.mood || "");
          setAiReply(j.aiReply || "");
        }
      });
    }
  }, [id, isEdit, fetchJournalById]);

  useEffect(() => {
    setWordCount(content.trim() ? content.trim().split(/\s+/).length : 0);
  }, [content]);

  const requestAIReply = useCallback(async () => {
    const trimmedContent = content.trim();

    if (trimmedContent.length < 20) {
      setSuggestionError("Write at least 20 characters to get an AI reply.");
      return;
    }

    setSuggestionLoading(true);
    setSuggestionError("");

    try {
      const token = localStorage.getItem("token");
      const data = await getJournalSuggestions(
        { title: title.trim(), content: trimmedContent, mood },
        token
      );

      lastReplyKey.current = `${title.trim()}|${trimmedContent}|${
        data.mood || mood
      }`;
      setSuggestionData(data);
      setAiReply(data.reply || "");

      if (data.mood) {
        setMood(data.mood);
      }
      return data;
    } catch (err) {
      setSuggestionError(err.message || "AI reply is unavailable.");
      return null;
    } finally {
      setSuggestionLoading(false);
    }
  }, [content, mood, title]);

  useEffect(() => {
    const trimmedContent = content.trim();
    const replyKey = `${title.trim()}|${trimmedContent}|${mood}`;

    if (trimmedContent.length < 40 || replyKey === lastReplyKey.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      requestAIReply();
    }, 1400);

    return () => clearTimeout(timeoutId);
  }, [content, mood, requestAIReply, title]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;

    if (!mood) {
      alert("Please select your mood");
      return;
    }

    setSaving(true);

    try {
      let finalReply = aiReply;
      let finalSuggestionData = suggestionData;

      if (!finalReply && content.trim().length >= 20) {
        finalSuggestionData = await requestAIReply();
        finalReply = finalSuggestionData?.reply || "";
      }

      const data = {
        title: title.trim() || "Untitled",
        content,
        mood: finalSuggestionData?.mood || mood || "neutral",
        aiReply: finalReply,
      };

      const result = isEdit
        ? await editJournal(id, data)
        : await addJournal(data);

      if (result) {
        await fetchJournals();
        navigate("/insights");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title={isEdit ? "Edit Entry" : "New Entry"}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-300 mb-6"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(28,28,40,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-6 pt-6">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give this entry a title..."
                className="w-full bg-transparent text-2xl font-semibold text-ink-100 outline-none"
              />
            </div>

            <div className="px-6 py-4 border-y border-white/5">
              <p className="text-xs text-ink-500 mb-2">How are you feeling?</p>

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
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setAiReply("");
                  setSuggestionError("");
                }}
                placeholder="Write your thoughts..."
                rows={12}
                className="w-full bg-transparent text-sm text-ink-300 outline-none resize-none"
              />

              {aiReply && (
                <div className="mt-4 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3">
                  <p className="text-sm leading-6 text-ink-200">{aiReply}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 flex justify-between items-center border-t border-white/5">
              <p className="text-xs text-ink-500">{wordCount} words</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving || suggestionLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white"
                >
                  {saving || suggestionLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>

          <aside
            className="rounded-2xl p-4 h-fit"
            style={{
              background: "rgba(18,18,28,0.72)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-ink-100">
                <Lightbulb size={16} className="text-green-300" />
                AI Suggestions
              </div>
              {suggestionLoading && (
                <Loader2 size={15} className="animate-spin text-ink-500" />
              )}
            </div>

            {suggestionError ? (
              <p className="text-xs leading-5 text-red-300">
                {suggestionError}
              </p>
            ) : suggestionData ? (
              <div className="space-y-3">
                <div className="text-xs text-ink-500">
                  Detected mood:{" "}
                  <span className="capitalize text-green-300">
                    {suggestionData.mood}
                  </span>
                </div>
                <ul className="space-y-2">
                  {suggestionData.suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="text-xs leading-5 text-ink-300 rounded-lg bg-white/5 px-3 py-2"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              null
            )}
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
