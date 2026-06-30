import React from "react";

// Priority colour mapping per Stage 4 spec:
//   HIGH = red | MEDIUM = amber | LOW = green
const PRIORITY_STYLES = {
  HIGH: { bg: "#b8410e", text: "#fdf6e3", label: "HIGH" },
  MEDIUM: { bg: "#c98a2b", text: "#3b2412", label: "MEDIUM" },
  LOW: { bg: "#2f6b3d", text: "#fdf6e3", label: "LOW" },
};

// Category badge colours per Stage 4 spec:
//   Site Report = brown | Artifact Entry = gold | Inscription Update = teal
//   Historical Review = navy | Investigation Alert = red | Media Report = slate
const CATEGORY_GROUPS = [
  { match: /^SITE/, color: "#6b4423", group: "Site Report" }, // brown
  { match: /^ARTIFACT/, color: "#a07b2a", group: "Artifact Entry" }, // gold
  { match: /^(INSCRIPTION|ANALYSIS|FINAL ANALYSIS|DECODING)/, color: "#0d8b8b", group: "Inscription Update" }, // teal
  { match: /^(HISTORICAL|EXPEDITION UPDATE)/, color: "#1f3a68", group: "Historical Review" }, // navy
  { match: /^(INVESTIGATION|ARTIFACT ALERT|CHAMBER ENTRY|STRUCTURAL|MAJOR DISCOVERY)/, color: "#9b2b14", group: "Investigation Alert" }, // red
  { match: /^(GOVERNMENT|MEDIA)/, color: "#516372", group: "Media Report" }, // slate
];

function categoryStyle(category) {
  const upper = (category || "").toUpperCase();
  for (const c of CATEGORY_GROUPS) {
    if (c.match.test(upper)) return c;
  }
  return { color: "#6b4423", group: "Field Report" };
}

export const FeedCard = ({ item, inChat = false }) => {
  const prio = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.MEDIUM;
  const cat = categoryStyle(item.category);
  return (
    <div
      data-testid={`lc-feed-item-${item.category.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()}`}
      className={[
        "relative overflow-hidden rounded-lg border bg-[#fff7e6] text-left",
        inChat ? "my-2 border-[#c9a96e]/70" : "border-[#c9a96e]",
      ].join(" ")}
      style={{
        boxShadow: "0 2px 0 rgba(107,68,35,0.10)",
        backgroundImage:
          "linear-gradient(180deg, rgba(255,247,230,1) 0%, rgba(250,236,206,1) 100%)",
      }}
    >
      <div className="absolute right-0 top-0 h-full w-1.5" style={{ backgroundColor: prio.bg }} />
      <div className="flex items-start justify-between gap-3 px-4 pt-3">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{item.icon}</span>
          <span
            data-testid={`lc-feed-category-${cat.group.replace(/\s+/g, "-").toLowerCase()}`}
            className="rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ backgroundColor: cat.color, color: "#fdf6e3" }}
            title={cat.group}
          >
            {item.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            data-testid={`lc-feed-priority-${prio.label.toLowerCase()}`}
            className="rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.16em]"
            style={{ backgroundColor: prio.bg, color: prio.text }}
          >
            {prio.label}
          </span>
          <span
            data-testid="lc-feed-timestamp"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a6a3d]"
          >
            {item.time}
          </span>
        </div>
      </div>
      <div className="px-4 py-2 font-serif text-[15px] font-semibold text-[#3b2412]">
        {item.headline}
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-1 px-4 pb-3 text-[12.5px] sm:grid-cols-2">
        {item.fields.map(([k, v]) => (
          <div key={k} className="flex flex-col">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a6a3d]">
              {k}
            </dt>
            <dd className="text-[#4a3320]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
