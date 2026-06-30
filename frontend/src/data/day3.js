// Lost Civilization — Day 3 timeline + outcome variants + final summary copy.
// Every line of dialogue, every feed item, every decision exactly as written in spec.

export const DAY3_TIMELINE = [
  // ===== Scene 3.1 =====
  { type: "sceneHeader", title: "Scene 3.1 — Entering the Pathway", time: "08:00", channel: "IARA Expedition Channel" },
  {
    type: "feedInChat",
    item: {
      icon: "🚨",
      category: "EXPEDITION UPDATE",
      priority: "HIGH",
      time: "08:00",
      headline: "Pathway Access Approved — Exploration Active",
      fields: [["Status", "Exploration Active"]],
    },
  },
  { type: "msg", from: "kabir", text: "This is it." },
  { type: "msg", from: "ananya", text: "We’ve spent three days chasing clues." },
  { type: "msg", from: "aryan", text: "Stay focused." },
  { type: "msg", from: "maya", text: "I don’t think anyone is breathing normally." },

  // ===== Scene 3.2 =====
  { type: "sceneHeader", title: "Scene 3.2 — The Archive Chamber", time: "09:15" },
  {
    type: "feedInChat",
    item: {
      icon: "🏛",
      category: "MAJOR DISCOVERY",
      priority: "HIGH",
      time: "09:15",
      headline: "Underground Archive Chamber — Intact",
      fields: [
        ["Status", "Intact"],
        ["Findings", "Stone records / Maps / Historical tablets / Symbol references"],
      ],
    },
  },
  { type: "msg", from: "ananya", text: "Oh wow." },
  { type: "silence" },
  { type: "msg", from: "kabir", text: "That’s your professional response?" },
  { type: "msg", from: "ananya", text: "I’m trying very hard not to scream." },
  { type: "msg", from: "aryan", text: "Take your time. Document everything." },
  { type: "msg", from: "maya", text: "This is going to change everything we thought we knew about the region." },

  // ===== Scene 3.3 =====
  { type: "sceneHeader", title: "Scene 3.3 — Decoding Breakthrough", time: "10:30" },
  {
    type: "feedInChat",
    item: {
      icon: "📜",
      category: "FINAL ANALYSIS",
      priority: "HIGH",
      time: "10:30",
      headline: "Symbol Purpose Identified",
      fields: [
        ["Symbols", "Navigation markers"],
        ["Function", "Guide people to the archive chamber"],
      ],
    },
  },
  { type: "banner", text: "✅ Decoding Complete" },
  { type: "msg", from: "ananya", text: "The symbols were never messages." },
  { type: "msg", from: "ananya", text: "They were directions." },
  { type: "msg", from: "aryan", text: "Designed to protect knowledge." },
  { type: "msg", from: "maya", text: "And hide it." },
  { type: "msg", from: "kabir", text: "For two thousand years." },
  { type: "msg", from: "ananya", text: "Until now." },

  // ===== Scene 3.4 =====
  { type: "sceneHeader", title: "Scene 3.4 — Artifact Theft Solved", time: "11:45" },
  {
    type: "feedInChat",
    item: {
      icon: "🔎",
      category: "INVESTIGATION CLOSED",
      priority: "MEDIUM",
      time: "11:45",
      headline: "Artifact Recovered",
      fields: [
        ["Outcome", "A freelance artifact smuggler removed the item."],
        ["Status", "Authorities have recovered it."],
      ],
    },
  },
  { type: "msg", from: "kabir", text: "Well that’s disappointing." },
  { type: "msg", from: "maya", text: "What?" },
  { type: "msg", from: "kabir", text: "I was hoping for a more dramatic villain." },
  { type: "msg", from: "maya", text: "The artifact is recovered. That’s what matters." },
  { type: "msg", from: "aryan", text: "Agreed. Now let’s focus on what we’ve found." },

  // ===== Scene 3.5 =====
  { type: "sceneHeader", title: "Scene 3.5 — The Lost Civilization Revealed", time: "13:00" },
  {
    type: "feedInChat",
    item: {
      icon: "📚",
      category: "HISTORICAL CONCLUSION",
      priority: "HIGH",
      time: "13:00",
      headline: "Previously Undocumented Regional Civilization",
      fields: [
        ["Estimated Age", "~2,000 years"],
        ["Significance", "Major archaeological discovery"],
      ],
    },
  },
  { type: "msg", from: "aryan", text: "History books may need updating." },
  { type: "msg", from: "ananya", text: "Not every civilization disappears." },
  { type: "msg", from: "ananya", text: "Sometimes they’re simply forgotten." },
  { type: "msg", from: "maya", text: "Until someone remembers." },
  {
    type: "decision",
    id: "d9",
    prompt: "DECISION 9 — What should the team recommend?",
    options: [
      {
        key: "A",
        label: "Publish the findings immediately.",
        effects: { discovery: 8, public_interest: 8 },
        reactions: [
          { from: "maya", text: "The world deserves to know." },
          { from: "aryan", text: "Risk of site damage increases with attention." },
        ],
      },
      {
        key: "B",
        label: "Continue research before publishing.",
        effects: { analysis: 8, historical_insight: 5 },
        reactions: [
          { from: "ananya", text: "Stronger evidence leads to stronger recognition." },
          { from: "kabir", text: "Slow but right." },
        ],
      },
      {
        key: "C",
        label: "Restrict access until preservation plans are ready.",
        effects: { judgment: 8, preservation_score: 8 },
        reactions: [
          { from: "aryan", text: "The most responsible approach." },
          { from: "maya", text: "People will want to know eventually." },
        ],
      },
    ],
  },

  // ===== Scene 3.6 — Outcome reveal (engine reads state.decisions.d9) =====
  { type: "sceneHeader", title: "Scene 3.6 — Outcome", time: "14:00" },
  { type: "outcomeReveal" },

  // ===== Scene 3.7 =====
  { type: "sceneHeader", title: "Scene 3.7 — Final Debrief", time: "15:00" },
  { type: "msg", from: "aryan", text: "Three days ago we found a symbol. Today we uncovered a civilization." },
  { type: "msg", from: "kabir", text: "Not a bad week." },
  { type: "msg", from: "ananya", text: "The best part?" },
  { type: "msg", from: "ananya", text: "There are still questions left." },
  { type: "msg", from: "maya", text: "History always leaves a few mysteries behind." },
  { type: "msg", from: "aryan", text: "That’s why people keep searching." },
  { type: "msg", from: "aryan", text: "And thanks to your work… this story won’t remain buried." },
  { type: "endDay" },
];

export const OUTCOME_TEXT = {
  A: {
    title: "Public Discovery",
    body:
      "Global attention reaches the site within days. Archaeologists, journalists, and historians arrive. The discovery makes international news. The civilization enters public consciousness almost overnight. The preservation challenge begins.",
  },
  B: {
    title: "Scientific Review",
    body:
      "The team spends three additional months gathering evidence. When the findings are finally published, they are comprehensive, peer-reviewed, and unassailable. The discovery is recognised as one of the most significant of the decade.",
  },
  C: {
    title: "Protected Preservation",
    body:
      "The site is secured. A preservation plan is developed before any public announcement. When the discovery is eventually revealed, the civilization’s legacy is fully protected. The story takes longer to reach the world. But when it does, the site is ready.",
  },
};

// Day 3 reflection — 3 open-ended questions, per spec.
export const REFLECTION_QUESTIONS_DAY3 = [
  { id: "q1", prompt: "What was the most important clue across all three days?" },
  { id: "q2", prompt: "What surprised you most about the investigation?" },
  {
    id: "q3",
    prompt: "What should happen when a major discovery like this is made — publish immediately, study carefully, or protect first?",
  },
];

// Final summary card content — dominant variable summary lines.
// Highest among: discovery, analysis, judgment, historical_insight.
// Tiebreaker order: discovery wins.
export const DOMINANT_LINES = {
  discovery:
    "You followed clues others ignored. The civilization was found because you kept looking.",
  analysis:
    "You connected patterns into understanding. The symbols revealed their secrets because you read them carefully.",
  judgment:
    "You balanced discovery with responsibility. History is better protected because of how you approached it.",
  historical_insight:
    "You helped reveal a forgotten chapter of history. The civilization is known again because of this expedition.",
};

export const FINAL_VAR_COLORS = {
  discovery: { label: "Discovery", color: "#b8741a" }, // amber
  analysis: { label: "Analysis", color: "#0d8b8b" }, // teal
  judgment: { label: "Judgment", color: "#2f6b3d" }, // green
  historical_insight: { label: "Historical Insight", color: "#c9a227" }, // gold
};

export function dominantVariableKey(stats) {
  const order = ["discovery", "analysis", "judgment", "historical_insight"];
  let best = "discovery";
  let bestVal = stats.discovery ?? 0;
  for (const k of order) {
    if ((stats[k] ?? 0) > bestVal) {
      best = k;
      bestVal = stats[k];
    }
  }
  return best;
}
