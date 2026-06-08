import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { format } from "date-fns";
import DashboardLayout from "../components/layout/DashboardLayout";
import MoodBadge from "../components/ui/MoodBadge";
import { useJournals } from "../context/JournalContext";

export default function JournalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentJournal, fetchJournalById, removeJournal, loading } = useJournals();

  useEffect(() => { fetchJournalById(id); }, [id, fetchJournalById]);

  if (loading) {
    return (
      <DashboardLayout title="Entry">
        <div className="max-w-2xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (!currentJournal) {
    return (
      <DashboardLayout title="Not Found">
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-ink-500">Entry not found.</p>
          <button onClick={() => navigate("/journals")} className="mt-4 text-sage-400 text-sm hover:text-sage-300">
            ← Back to journals
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const handleDelete = async () => {
    await removeJournal(currentJournal._id);
    navigate("/journals");
  };

  return (
    <DashboardLayout title="Entry">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/journals")}
          className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-300 transition-colors mb-6">
          <ArrowLeft size={15} /> All journals
        </button>

        <div className="rounded-2xl overflow-hidden animate-fade-up opacity-0-init"
          style={{ background: "rgba(28,28,40,0.6)", border: "1px solid rgba(255,255,255,0.06)", animationFillMode: "forwards" }}>
          <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-display text-2xl font-semibold text-ink-100">
                {currentJournal.title || "Untitled"}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/journals/${id}/edit`)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center btn-ghost"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={handleDelete}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-400 hover:bg-rose-600/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentJournal.createdAt && (
                <p className="text-xs text-ink-500">
                  {format(new Date(currentJournal.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              )}
              {currentJournal.mood && <MoodBadge mood={currentJournal.mood} />}
            </div>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-ink-300 leading-relaxed whitespace-pre-wrap">
              {currentJournal.content || "No content."}
            </p>

            {currentJournal.aiReply && (
              <div className="mt-5 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3">
                <p className="text-sm leading-6 text-ink-200">
                  {currentJournal.aiReply}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
