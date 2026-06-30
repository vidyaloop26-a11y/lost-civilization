import React, { useEffect, useState } from "react";
import { REFLECTION_QUESTIONS } from "../../data/day1";
import { REFLECTION_QUESTIONS_DAY2 } from "../../data/day2";
import { REFLECTION_QUESTIONS_DAY3 } from "../../data/day3";
import { STAT_LABELS, CHARACTERS, trustLabel } from "../../lib/lcState";

export const Reflection = ({ state, setState, onBeginNextDay }) => {
  const day = state.current_day || 1;
  const questions =
    day === 3 ? REFLECTION_QUESTIONS_DAY3 : day === 2 ? REFLECTION_QUESTIONS_DAY2 : REFLECTION_QUESTIONS;
  const reflKey = day === 3 ? "day3" : day === 2 ? "day2" : "day1";

  const [step, setStep] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({});
  const [textDraft, setTextDraft] = useState("");

  // Reset wizard if day changes
  useEffect(() => {
    setStep(0);
    setAnimatedStats({});
    setTextDraft("");
  }, [day]);

  const recordAnswer = (id, value) => {
    setState((s) => ({
      ...s,
      reflections: {
        ...s.reflections,
        [reflKey]: { ...s.reflections[reflKey], [id]: value },
      },
    }));
    if (step < questions.length - 1) {
      setStep((n) => n + 1);
      setTextDraft("");
    } else {
      setStep(questions.length);
    }
  };

  // Animate stat bars left-to-right (650ms each, sequential)
  useEffect(() => {
    if (step !== questions.length) return;
    const keys = ["discovery", "analysis", "judgment", "historical_insight"];
    let cancelled = false;
    (async () => {
      for (const k of keys) {
        if (cancelled) return;
        setAnimatedStats((prev) => ({ ...prev, [k]: state.stats[k] }));
        await new Promise((r) => setTimeout(r, 650));
      }
      // Day 3 — auto-advance to Final Summary after stat bars finish
      if (day === 3 && !cancelled) {
        await new Promise((r) => setTimeout(r, 1800));
        if (!cancelled) onBeginNextDay && onBeginNextDay();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [step, state.stats, questions.length, day, onBeginNextDay]);

  // Question screen
  if (step < questions.length) {
    const q = questions[step];
    const hasOptions = Array.isArray(q.options) && q.options.length > 0;

    return (
      <div
        data-testid="lc-reflection-question"
        className="flex min-h-screen items-center justify-center bg-[#f5ebd7] px-4 py-8"
      >
        <div className="w-full max-w-2xl rounded-xl border border-[#c9a96e] bg-[#fdf6e3] p-7 shadow-[0_10px_40px_rgba(75,46,18,0.15)] sm:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
            Day {day} Reflection · {step + 1} of {questions.length}
          </div>
          <h2 className="mt-2 font-serif text-[22px] font-bold leading-snug text-[#3b2412] sm:text-2xl">
            {q.prompt}
          </h2>

          {hasOptions ? (
            <div className="mt-6 grid gap-2.5">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  data-testid={`lc-reflect-${q.id}-${opt.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()}`}
                  onClick={() => recordAnswer(q.id, opt)}
                  className="rounded-lg border border-[#c9a96e] bg-[#fff7e6] px-4 py-3 text-left font-serif text-[15px] text-[#3b2412] transition-all hover:-translate-y-[1px] hover:border-[#8b4513] hover:bg-[#fff3d6] hover:shadow-[0_3px_0_rgba(107,68,35,0.16)]"
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              <textarea
                data-testid={`lc-reflect-${q.id}-textarea`}
                value={textDraft}
                onChange={(e) => setTextDraft(e.target.value)}
                rows={4}
                placeholder="Write a sentence or two…"
                className="w-full resize-none rounded-lg border border-[#c9a96e] bg-[#fff7e6] px-4 py-3 font-serif text-[15px] leading-relaxed text-[#3b2412] outline-none placeholder:text-[#a18653] focus:border-[#8b4513] focus:ring-2 focus:ring-[#8b4513]/30"
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a6a3d]">
                  {textDraft.trim().length === 0 ? "Required" : `${textDraft.trim().length} chars`}
                </span>
                <button
                  data-testid={`lc-reflect-${q.id}-next-btn`}
                  disabled={textDraft.trim().length === 0}
                  onClick={() => recordAnswer(q.id, textDraft.trim())}
                  className={[
                    "rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-all",
                    textDraft.trim().length === 0
                      ? "cursor-not-allowed bg-[#d5c39a] text-[#8a6a3d]"
                      : "bg-[#8b4513] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] hover:bg-[#7a3b10]",
                  ].join(" ")}
                >
                  {step === questions.length - 1 ? "See Summary" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Summary
  const coreStats = ["discovery", "analysis", "judgment", "historical_insight"];
  const trustKeys = ["aryan", "ananya", "kabir", "maya"];

  const teaser =
    day === 3
      ? "The expedition is complete. Your Final Summary Card is being prepared…"
      : day === 2
      ? "DAY 3 — Lost Civilization. The truth emerges. The symbols are decoded. The thief is identified. History is no longer hidden. Now it must be protected."
      : "DAY 2 — The Mystery. The deeper we dig, the stranger it becomes. Artifacts disappear. Hidden chambers emerge. And somebody may not want the truth discovered.";

  const nextDayLabel = day === 3 ? "View Final Summary" : day === 2 ? "Begin Day 3" : "Begin Day 2";
  const nextBtnTestId = day === 3 ? "lc-view-final-btn" : day === 2 ? "lc-begin-day-3-btn" : "lc-begin-day-2-btn";
  // Begin Day 2 unlocks after Day 1; Begin Day 3 unlocks after Day 2; Day 3 reflection auto-advances.
  const nextEnabled = day === 1 || day === 2 || day === 3;

  return (
    <div
      data-testid="lc-reflection-summary"
      className="min-h-screen bg-[#f5ebd7] px-4 py-8 sm:py-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-[#c9a96e] bg-[#fdf6e3] p-7 shadow-[0_10px_40px_rgba(75,46,18,0.15)] sm:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
            Junior Archaeological Investigator · {state.intern_name}
          </div>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#3b2412]">
            Day {day} — Variable Summary
          </h1>
          <p className="mt-2 text-[14px] text-[#8a6a3d]">
            Your decisions today shape who you are as an investigator. Here’s where you stand.
          </p>

          <section className="mt-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Core Stats
            </div>
            <div className="mt-3 grid gap-4">
              {coreStats.map((k) => {
                const shown = animatedStats[k] ?? 0;
                return (
                  <div key={k} data-testid={`lc-stat-${k}`}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <div className="font-serif text-[14px] text-[#3b2412]">
                        {STAT_LABELS[k]}
                      </div>
                      <div className="font-mono text-[12px] tabular-nums text-[#5a3a18]">
                        {shown}/100
                      </div>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e9d8a8]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${shown}%`,
                          background:
                            "linear-gradient(90deg, #b8741a 0%, #8b4513 100%)",
                          transition: "width 600ms cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Team Relationships
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {trustKeys.map((k) => {
                const v = state.stats[`trust_${k}`];
                const label = trustLabel(v);
                const tone =
                  label === "High"
                    ? { bg: "#2f6b3d", text: "#fdf6e3" }
                    : label === "Low"
                    ? { bg: "#8b2c1b", text: "#fdf6e3" }
                    : { bg: "#a07b48", text: "#fdf6e3" };
                const c = CHARACTERS[k];
                return (
                  <div
                    key={k}
                    data-testid={`lc-trust-${k}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#c9a96e] bg-[#fff7e6] px-4 py-3"
                  >
                    <div>
                      <div className="font-serif text-[14px] font-semibold text-[#3b2412]">
                        {c.short}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a6a3d]">
                        {c.role}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ backgroundColor: tone.bg, color: tone.text }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-7 rounded-lg border-l-4 border-[#b8741a] bg-[#fff3d6] p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Tomorrow
            </div>
            <p className="mt-1 font-serif text-[15px] italic leading-relaxed text-[#4a3320]">
              {teaser}
            </p>
          </section>

          <div className="mt-8 flex justify-end">
            <button
              data-testid={nextBtnTestId}
              disabled={!nextEnabled}
              onClick={nextEnabled ? onBeginNextDay : undefined}
              className={[
                "rounded-full px-7 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-all",
                nextEnabled
                  ? "bg-[#8b4513] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] hover:translate-y-[-1px] hover:bg-[#7a3b10] hover:shadow-[0_5px_0_#5a2c0c] active:translate-y-[1px] active:shadow-[0_2px_0_#5a2c0c]"
                  : "cursor-not-allowed bg-[#d5c39a] text-[#8a6a3d]",
              ].join(" ")}
              title={nextEnabled ? "" : "Locked"}
            >
              {nextDayLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
