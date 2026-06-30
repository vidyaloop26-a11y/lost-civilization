import React from "react";
import { CHARACTERS } from "../../lib/lcState";

export const Avatar = ({ who, size = 36 }) => {
  const c = CHARACTERS[who];
  if (!c) return null;
  return (
    <div
      data-testid={`lc-avatar-${who}`}
      className="flex shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold text-[#fdf6e3] shadow-[inset_0_-2px_0_rgba(0,0,0,0.18)]"
      style={{
        width: size,
        height: size,
        backgroundColor: c.color,
        letterSpacing: "0.05em",
      }}
      title={`${c.name} — ${c.role}`}
    >
      {c.initials}
    </div>
  );
};
