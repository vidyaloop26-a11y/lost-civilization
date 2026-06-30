import React from "react";
import {
  DOMINANT_LINES,
  FINAL_VAR_COLORS,
  dominantVariableKey,
} from "../../data/day3";
import { CHARACTERS, trustLabel, resetState } from "../../lib/lcState";

export const FinalSummary = ({ state }) => {
  const dominant = dominantVariableKey(state.stats);
  const trustKeys = ["aryan", "ananya", "kabir", "maya"];
  const varKeys = ["discovery", "analysis", "judgment", "historical_insight"];

  const handleStartOver = () => {
    resetState();
    window.location.reload();
  };

  return (
    <div
      data-testid="lc-final-summary"
      className="min-h-screen bg-[#f5ebd7] px-4 py-10 sm:py-14"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top left, rgba(184,116,26,0.10), transparent 50%), radial-gradient(ellipse at bottom right, rgba(107,68,35,0.10), transparent 55%)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[#c9a96e] bg-[#fdf6e3] p-7 shadow-[0_16px_60px_rgba(75,46,18,0.20)] sm:p-10">
          {/* Mission status block */}
          <div className="rounded-lg border border-[#c9a96e] bg-[#fff7e6] p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Mission Status
            </div>
            <div className="mt-2 grid gap-2 font-mono text-[13px] text-[#3b2412] sm:grid-cols-[140px_1fr]">
              <div className="text-[#8a6a3d]">Mission</div>
              <div className="font-semibold">LOST CIVILIZATION</div>
              <div className="text-[#8a6a3d]">Status</div>
              <div className="font-semibold text-[#2f6b3d]">COMPLETE</div>
              <div className="text-[#8a6a3d]">Discovery</div>
              <div className="font-semibold">
                Previously undocumented civilization, ~2,000 years old
              </div>
            </div>
          </div>

          {/* Dominant variable summary */}
          <section className="mt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Your Investigator Profile
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold leading-snug text-[#3b2412] sm:text-3xl">
              {FINAL_VAR_COLORS[dominant].label} defined this expedition.
            </h1>
            <p
              data-testid="lc-final-dominant-line"
              className="mt-3 font-serif text-[17px] italic leading-relaxed text-[#4a3320]"
            >
              {DOMINANT_LINES[dominant]}
            </p>
          </section>

          {/* Final variable bars */}
          <section className="mt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Final Variables
            </div>
            <div className="mt-3 grid gap-4">
              {varKeys.map((k) => {
                const meta = FINAL_VAR_COLORS[k];
                const v = state.stats[k] ?? 0;
                return (
                  <div key={k} data-testid={`lc-final-bar-${k}`}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <div className="font-serif text-[14px] text-[#3b2412]">{meta.label}</div>
                      <div className="font-mono text-[12px] tabular-nums text-[#5a3a18]">
                        {v}/100
                      </div>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e9d8a8]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${v}%`,
                          backgroundColor: meta.color,
                          transition: "width 700ms cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Relationships */}
          <section className="mt-8">
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
                    data-testid={`lc-final-trust-${k}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#c9a96e] bg-[#fff7e6] px-4 py-3"
                  >
                    <div>
                      <div className="font-serif text-[14px] font-semibold text-[#3b2412]">
                        {c.name}
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

          {/* Final message */}
          <section
            data-testid="lc-final-message"
            className="mt-9 rounded-lg border-l-4 border-[#b8741a] bg-[#fff3d6] p-6 text-center"
          >
            <p className="font-serif text-[19px] italic leading-relaxed text-[#3b2412] sm:text-xl">
              “History isn’t gone. It’s waiting to be discovered.”
            </p>
          </section>

          <div className="mt-9 flex justify-center">
            <button
              data-testid="lc-start-over-btn"
              onClick={handleStartOver}
              className="rounded-full bg-[#8b4513] px-8 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] transition-all hover:translate-y-[-1px] hover:bg-[#7a3b10] hover:shadow-[0_5px_0_#5a2c0c] active:translate-y-[1px] active:shadow-[0_2px_0_#5a2c0c]"
            >
              Start Over
            </button>
          </div>
        </div>
        <div className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a6a3d]">
          Lost Civilization · Vidyaloop Learning and Innovation Labs
        </div>
      </div>
    </div>
  );
};
