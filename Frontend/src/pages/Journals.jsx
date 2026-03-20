import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenLine, Search, SlidersHorizontal } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import JournalCard from "../components/ui/JournalCard";
import { useJournals } from "../context/JournalContext";

const moods = ["All", "Happy", "Sad", "Anxious", "Angry", "Neutral", "Excited", "Calm"];

export default function Journals() {
  const { journals, fetchJournals, loading } = useJournals();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("All");

  useEffect(() => { fetchJournals(); }, [fetchJournals]);

  const filtered = journals.filter((j) => {
    const matchSearch =
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.content?.toLowerCase().includes(search.toLowerCase());
    const matchMood = mood === "All" || j.mood?.toLowerCase() === mood.toLowerCase();
    return matchSearch && matchMood;
  });

  return (
    <DashboardLayout title="Journals">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your entries…"
            className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
        <button
          onClick={() => navigate("/journals/new")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium btn-primary whitespace-nowrap"
        >
          <PenLine size={15} /> New Entry
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <SlidersHorizontal size={14} className="text-ink-500 flex-shrink-0" />
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              mood === m
                ? "bg-sage-600/20 text-sage-300 border border-sage-600/30"
                : "btn-ghost text-ink-500"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <p className="text-xs text-ink-500 mb-4">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-36 rounded-2xl animate-pulse"
              style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-500 text-sm mb-4">
            {search || mood !== "All"
              ? "No entries match your filters."
              : "No journal entries yet."}
          </p>
          {!search && mood === "All" && (
            <button
              onClick={() => navigate("/journals/new")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm btn-primary"
            >
              <PenLine size={15} /> Write your first entry
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((j, i) => (
            <div
              key={j._id}
              className="animate-fade-up opacity-0-init"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <JournalCard journal={j} />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}