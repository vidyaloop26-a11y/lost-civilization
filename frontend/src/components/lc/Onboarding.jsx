import React, { useState } from "react";

export const Onboarding = ({ onBegin }) => {
  const [name, setName] = useState("");
  const trimmed = name.trim();
  const canBegin = trimmed.length > 0;

  return (
    <div
      data-testid="lc-onboarding"
      className="min-h-screen w-full bg-[#f5ebd7]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top left, rgba(184,116,26,0.10), transparent 50%), radial-gradient(ellipse at bottom right, rgba(107,68,35,0.10), transparent 55%)",
      }}
    >
      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:py-12">
        <div className="grid w-full max-w-4xl overflow-hidden rounded-xl border border-[#c9a96e] bg-[#fdf6e3] shadow-[0_10px_40px_rgba(75,46,18,0.18)] md:grid-cols-[1.4fr_1fr]">
          {/* TOP / LEFT — Briefing */}
          <div className="relative p-7 sm:p-10">
            <div className="absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#a07b48] md:block">
              File 01 · Classified
            </div>
            <div className="mb-6 flex items-center gap-3">
              <img
                src="/vidyaloop-logo.png"
                alt="Vidyaloop"
                className="h-10 w-10 rounded-sm object-contain"
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a6a3d]">
                Vidyaloop · IARA
              </div>
            </div>

            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Indian Archaeological Research Authority
            </div>
            <h1 className="mt-1 font-serif text-2xl font-bold leading-snug text-[#3b2412] sm:text-3xl">
              Expedition Briefing — Junior Archaeological Investigator
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-[#4a3320]">
              Congratulations. You have been selected as a Junior Archaeological
              Investigator for the Indian Archaeological Research Authority.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4a3320]">
              An excavation site in central India has revealed something
              unexpected — stone structures, ancient symbols, and artifacts that
              do not match any known historical record. Our team believes we may
              have found evidence of a civilization nobody knew existed.
            </p>

            <div className="mt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a05a1f]">
                What you will do over three days
              </div>
              <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-[#4a3320]">
                <li>
                  <span className="font-semibold text-[#3b2412]">Day 1 — The Discovery:</span>{" "}
                  Explore the site, examine the first artifacts, and identify the mystery.
                </li>
                <li>
                  <span className="font-semibold text-[#3b2412]">Day 2 — The Mystery:</span>{" "}
                  Uncover hidden chambers, investigate artifact theft, and follow the clues deeper.
                </li>
                <li>
                  <span className="font-semibold text-[#3b2412]">Day 3 — Lost Civilization:</span>{" "}
                  Decode the symbols, reveal the truth, and decide how history should be protected.
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a05a1f]">
                Your team
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-[14px] text-[#4a3320] sm:grid-cols-2">
                <li>Dr. Aryan Rao <span className="text-[#8a6a3d]">— Expedition Director</span></li>
                <li>Ananya Sen <span className="text-[#8a6a3d]">— Ancient Script Specialist</span></li>
                <li>Kabir Khanna <span className="text-[#8a6a3d]">— Field Archaeologist</span></li>
                <li>Maya Verma <span className="text-[#8a6a3d]">— Heritage Journalist</span></li>
              </ul>
            </div>

            <blockquote className="mt-7 border-l-2 border-[#b8741a] bg-[#fff3d6] p-4 italic text-[#4a3320]">
              History is not dead. It is hidden. Your job is to uncover it.
              <div className="mt-2 not-italic text-[12px] text-[#8a6a3d]">
                — Dr. Aryan Rao, Expedition Director
              </div>
            </blockquote>
          </div>

          {/* BOTTOM / RIGHT — Name input */}
          <div className="flex flex-col justify-center gap-5 border-t border-[#c9a96e] bg-[#f5ebd7] p-7 sm:p-10 md:border-l md:border-t-0">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a05a1f]">
              Field Registration
            </div>
            <label
              htmlFor="lc-name-input"
              className="font-serif text-lg leading-snug text-[#3b2412]"
            >
              Enter your name to begin the expedition
            </label>
            <input
              id="lc-name-input"
              data-testid="lc-name-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-[#c9a96e] bg-[#fdf6e3] px-4 py-3 font-serif text-base text-[#3b2412] outline-none placeholder:text-[#a18653] focus:border-[#8b4513] focus:ring-2 focus:ring-[#8b4513]/30"
            />
            <button
              data-testid="lc-begin-expedition-btn"
              disabled={!canBegin}
              onClick={() => canBegin && onBegin(trimmed)}
              className={[
                "mt-2 w-full rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-all",
                canBegin
                  ? "bg-[#8b4513] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] hover:translate-y-[-1px] hover:bg-[#7a3b10] hover:shadow-[0_5px_0_#5a2c0c] active:translate-y-[1px] active:shadow-[0_2px_0_#5a2c0c]"
                  : "cursor-not-allowed bg-[#d5c39a] text-[#8a6a3d]",
              ].join(" ")}
            >
              Begin Expedition
            </button>
            <div className="text-[11px] leading-relaxed text-[#8a6a3d]">
              By proceeding you accept your role as Junior Archaeological
              Investigator under the IARA expedition protocol.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
