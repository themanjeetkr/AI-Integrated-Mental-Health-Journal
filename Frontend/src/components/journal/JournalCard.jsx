import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import MoodBadge from "./MoodBadge";
import { useJournals } from "../../context/JournalContext";

export default function JournalCard({ journal, compact = false }) {
  const { removeJournal } = useJournals();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const timeAgo = journal.createdAt
    ? formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true })
    : "";

  return (
    <div
      className="group rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
      style={{
        background: "rgba(28, 28, 40, 0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onClick={() => navigate(`/journals/${journal._id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-ink-100 truncate">
            {journal.title || "Untitled Entry"}
          </h3>
          <p className="text-xs text-ink-500 mt-0.5">{timeAgo}</p>
        </div>
        <div className="relative ml-2">
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg flex items-center justify-center btn-ghost"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-36 rounded-xl overflow-hidden z-10"
              style={{
                background: "#1c1c28",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink-400 hover:text-ink-200 hover:bg-white/[0.04] transition-all"
                onClick={() => { navigate(`/journals/${journal._id}/edit`); setMenuOpen(false); }}
              >
                <Edit3 size={13} /> Edit
              </button>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-600/10 transition-all"
                onClick={() => { removeJournal(journal._id); setMenuOpen(false); }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {!compact && journal.content && (
        <p className="text-sm text-ink-400 line-clamp-2 mb-3 leading-relaxed">
          {journal.content}
        </p>
      )}

      {journal.mood && <MoodBadge mood={journal.mood} />}
    </div>
  );
}
