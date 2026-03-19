const moods = {
  happy: { emoji: "😊", label: "Happy", color: "#6aab99", bg: "rgba(78,140,124,0.12)" },
  sad: { emoji: "😢", label: "Sad", color: "#8faad4", bg: "rgba(99,130,201,0.12)" },
  anxious: { emoji: "😰", label: "Anxious", color: "#e89a52", bg: "rgba(217,124,46,0.12)" },
  angry: { emoji: "😤", label: "Angry", color: "#d4697b", bg: "rgba(192,77,97,0.12)" },
  neutral: { emoji: "😐", label: "Neutral", color: "#9898b8", bg: "rgba(152,152,184,0.12)" },
  excited: { emoji: "🤩", label: "Excited", color: "#f2b87a", bg: "rgba(242,184,122,0.12)" },
  calm: { emoji: "😌", label: "Calm", color: "#92c4b6", bg: "rgba(146,196,182,0.12)" },
};

export default function MoodBadge({ mood, size = "sm" }) {
  const m = moods[mood?.toLowerCase()] || moods.neutral;
  const sizes = { sm: "text-xs px-2 py-0.5", md: "text-sm px-3 py-1" };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizes[size]}`}
      style={{ background: m.bg, color: m.color }}
    >
      <span>{m.emoji}</span>
      {m.label}
    </span>
  );
}

export { moods };
