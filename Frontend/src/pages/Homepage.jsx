import { createElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartPulse,
  LockKeyhole,
  MessageCircleHeart,
  Moon,
  PenLine,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Private AI journaling",
    desc: "Write freely in a calm editor that turns messy thoughts into clear emotional signals.",
  },
  {
    icon: Brain,
    title: "Pattern discovery",
    desc: "Spot recurring stressors, energy dips, and positive routines before they become invisible.",
  },
  {
    icon: BarChart3,
    title: "Mood intelligence",
    desc: "See your emotional rhythm with weekly trends, entry streaks, and practical next steps.",
  },
  {
    icon: ShieldCheck,
    title: "Designed for trust",
    desc: "Your journal stays personal, protected, and built around reflection instead of judgment.",
  },
];

const productStats = [
  { value: "2 min", label: "average check-in" },
  { value: "86%", label: "users notice patterns" },
  { value: "24/7", label: "private reflection space" },
];

const timeline = [
  "I felt tense before standup again.",
  "Your entries mention pressure before team meetings 4 times this month.",
  "Try a 90-second breathing reset before tomorrow's meeting.",
];

const testimonials = [
  {
    name: "Naina Kapoor",
    role: "UX designer, Bengaluru",
    initials: "NK",
    mood: "less overthinking",
    text:
      "WellSync made my thoughts feel organized without making therapy-style claims. After two weeks, I could see my Sunday anxiety pattern and finally planned around it.",
    detail: "32 entries written",
  },
  {
    name: "Arjun Mehta",
    role: "Founder, remote team",
    initials: "AM",
    mood: "better sleep routine",
    text:
      "The insights feel personal because they connect to what I actually write. I use it at night, and it has become the one habit that helps me close the day cleanly.",
    detail: "18 day streak",
  },
  {
    name: "Sofia Ramirez",
    role: "Graduate student",
    initials: "SR",
    mood: "calmer mornings",
    text:
      "Most apps ask me to track too much. This one lets me write naturally, then gives me one useful observation instead of a wall of advice.",
    detail: "4.9 mood lift",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="#f5b75b" color="#f5b75b" />
      ))}
    </div>
  );
}

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-premium text-ink-100 font-body overflow-x-hidden">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5 md:px-8">
          <button
            onClick={() => navigate("/")}
            className="mr-auto flex items-center gap-3"
            aria-label="WellSync home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#5dd6bd,#3d7bff)] shadow-[0_16px_40px_rgba(93,214,189,0.28)]">
              <Moon size={18} color="white" />
            </span>
            <span className="font-display text-xl font-semibold">
              Mind<span className="text-gradient-luxe">Scribe</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {["Features", "How it works", "Stories"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="text-sm text-ink-300 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="ml-4 flex items-center gap-2 md:ml-8">
            <button onClick={() => navigate("/login")} className="btn-link hidden sm:inline-flex">
              Sign in
            </button>
            <button onClick={() => navigate("/login")} className="btn-premium">
              Start free
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-mint-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Sparkles size={13} />
                AI mental wellness journal for daily clarity
              </div>

              <h1 className="font-display text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                Understand your mind before the day understands you.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-300">
                WellSync turns private journaling into clear emotional insight, helping you
                notice patterns, reduce overwhelm, and build a healthier reflection habit.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => navigate("/login")} className="btn-premium btn-large">
                  Create your private journal <ArrowRight size={18} />
                </button>
                <a href="#how-it-works" className="btn-secondary btn-large">
                  See the product <ChevronRight size={18} />
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {productStats.map((stat) => (
                  <div key={stat.label} className="premium-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="app-showcase">
                <div className="showcase-topbar">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-mint-300" />
                  </div>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-ink-300">
                    Today, 9:42 PM
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-ink-300">Mood today</span>
                        <span className="rounded-full bg-mint-300/10 px-2.5 py-1 text-xs text-mint-200">
                          Calm
                        </span>
                      </div>
                      <div className="flex items-end gap-2">
                        {[42, 58, 38, 76, 64, 82, 71].map((height, i) => (
                          <span
                            key={i}
                            className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,#5dd6bd,#3d7bff)] opacity-90"
                            style={{ height }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#101622]/90 p-4">
                      <div className="mb-3 flex items-center gap-2 text-mint-200">
                        <HeartPulse size={16} />
                        <span className="text-xs font-semibold">Wellness pulse</span>
                      </div>
                      <p className="text-3xl font-semibold text-white">7.8</p>
                      <p className="mt-1 text-xs text-ink-400">up 12% from last week</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-ink-400">AI reflection</p>
                        <h3 className="mt-1 font-display text-xl font-semibold text-white">
                          Meeting anxiety pattern
                        </h3>
                      </div>
                      <Brain className="text-mint-200" size={24} />
                    </div>

                    <div className="space-y-3">
                      {timeline.map((line, i) => (
                        <div key={line} className="flex gap-3">
                          <span className="mt-1 grid h-6 w-6 flex-none place-items-center rounded-full bg-white/[0.08] text-[11px] text-mint-200">
                            {i + 1}
                          </span>
                          <p className="rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm leading-6 text-ink-200">
                            {line}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow">Premium UX</p>
              <h2 className="section-title">A mental health product that feels calm, capable, and expensive.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon, title, desc }) => (
                <article key={title} className="feature-card">
                  <span className="feature-icon">
                    {createElement(icon, { size: 20 })}
                  </span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-title">From a rough thought to a useful insight in one flow.</h2>
              <p className="mt-4 text-ink-300">
                The experience is designed for real people: quick enough for busy days, thoughtful
                enough for deep reflection.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Write naturally", "Capture what happened, how it felt, and what you want to remember."],
                ["Let AI connect signals", "WellSync summarizes emotional patterns without overwhelming you."],
                ["Act with clarity", "Get one small next step that feels realistic for tomorrow."],
              ].map(([title, desc], index) => (
                <article key={title} className="process-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Realistic stories</p>
                <h2 className="section-title">People use WellSync when life is full, not perfect.</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-ink-300">
                <LockKeyhole size={15} />
                Private by design
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {testimonials.map((t) => (
                <article key={t.name} className="testimonial-card">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="avatar">{t.initials}</span>
                      <div>
                        <h3>{t.name}</h3>
                        <p>{t.role}</p>
                      </div>
                    </div>
                    <Stars />
                  </div>
                  <blockquote>"{t.text}"</blockquote>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="pill">
                      <CheckCircle2 size={13} /> {t.detail}
                    </span>
                    <span className="pill">
                      <MessageCircleHeart size={13} /> {t.mood}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8">
          <div className="cta-panel mx-auto max-w-5xl">
            <div>
              <p className="eyebrow">Start today</p>
              <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
                Build the habit your future self will thank you for.
              </h2>
              <p className="mt-4 max-w-2xl text-ink-300">
                Begin with one honest entry. WellSync will help you turn it into clarity.
              </p>
            </div>
            <button onClick={() => navigate("/login")} className="btn-premium btn-large">
              Start journaling <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
          <span>WellSync. Private AI journaling for modern mental wellness.</span>
          <span className="flex items-center gap-2">
            <Clock3 size={14} /> Built for daily reflection
          </span>
        </div>
      </footer>
    </div>
  );
}
