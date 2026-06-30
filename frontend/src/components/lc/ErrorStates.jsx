import React from "react";
import { resetState } from "../../lib/lcState";

export class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { console.error("[LC]", err); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div data-testid="lc-session-lost" className="flex min-h-screen items-center justify-center bg-[#f5ebd7] px-4">
        <div className="w-full max-w-md rounded-xl border border-[#c9a96e] bg-[#fdf6e3] p-7 text-center shadow-[0_10px_40px_rgba(75,46,18,0.18)]">
          <h2 className="font-serif text-2xl font-bold text-[#3b2412]">Expedition interrupted.</h2>
          <p className="mt-3 text-[14px] text-[#5a3a18]">Your session ended. Please restart.</p>
          <button
            data-testid="lc-restart-btn"
            onClick={() => { resetState(); window.location.reload(); }}
            className="mt-6 rounded-full bg-[#8b4513] px-7 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] hover:bg-[#7a3b10]"
          >Restart</button>
        </div>
      </div>
    );
  }
}

export const DayTransition = ({ onContinue }) => (
  <div data-testid="lc-day-transition" className="flex min-h-screen items-center justify-center bg-[#f5ebd7] px-4">
    <div className="w-full max-w-md rounded-xl border border-[#c9a96e] bg-[#fdf6e3] p-7 text-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">IARA</div>
      <p className="mt-2 font-serif text-lg text-[#3b2412]">Loading next expedition briefing…</p>
      <button
        data-testid="lc-transition-continue-btn"
        onClick={onContinue}
        className="mt-6 rounded-full bg-[#8b4513] px-7 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] hover:bg-[#7a3b10]"
      >Continue</button>
    </div>
  </div>
);
