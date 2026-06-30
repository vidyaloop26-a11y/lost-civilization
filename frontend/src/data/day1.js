// Lost Civilization — Day 1 timeline.
// Every line of dialogue, every feed item, every decision exactly as written in spec.
// Event types:
//   { type: "sceneHeader", title, time, channel? }
//   { type: "msg", from, text }
//   { type: "silence" }
//   { type: "banner", text }
//   { type: "feed", item }
//   { type: "dm", from, text }
//   { type: "feedInChat", item }   // visible in chat as artifact card
//   { type: "decision", id, prompt, options }
//   { type: "endDay" }

export const DAY1_TIMELINE = [
  // ===== Scene 1.1 =====
  { type: "sceneHeader", title: "Scene 1.1 — Welcome to the Expedition", time: "08:00", channel: "IARA Expedition Channel" },
  { type: "msg", from: "aryan", text: "Good morning everyone." },
  { type: "msg", from: "aryan", text: "And welcome to our newest Archaeological Investigator." },
  { type: "msg", from: "kabir", text: "Perfect timing. We just found something weird." },
  { type: "msg", from: "maya", text: "That’s literally how every archaeological mystery starts." },
  { type: "msg", from: "kabir", text: "Exactly 😎" },
  { type: "msg", from: "ananya", text: "Welcome. You’re joining us at a very interesting moment." },
  { type: "msg", from: "aryan", text: "Three weeks ago a local survey team identified unusual stone structures near a remote plateau." },
  { type: "msg", from: "aryan", text: "Initially we believed it was a routine excavation." },
  { type: "msg", from: "aryan", text: "Now we’re not so sure." },
  { type: "msg", from: "kabir", text: "Translation: something strange is buried out there." },
  { type: "banner", text: "🚨 Welcome to IARA | Role Assigned: Junior Archaeological Investigator" },

  // ===== Scene 1.2 =====
  { type: "sceneHeader", title: "Scene 1.2 — Discovery Feed Activates", time: "08:30", channel: "Discovery Feed Active" },
  {
    type: "feed",
    item: {
      icon: "🏛",
      category: "SITE REPORT",
      priority: "MEDIUM",
      time: "08:30",
      headline: "Active Investigation — Central India",
      fields: [
        ["Location", "Central India"],
        ["Site Classification", "Undetermined"],
        ["Estimated Age", "1800–2200 Years"],
        ["Discoveries", "Stone Foundations / Ceremonial Artifacts / Inscribed Fragments"],
        ["Status", "Active Investigation"],
      ],
    },
  },
  { type: "msg", from: "maya", text: "Media already knows about the site." },
  { type: "msg", from: "kabir", text: "Of course they do." },
  { type: "msg", from: "ananya", text: "Let’s focus on the evidence first." },
  { type: "msg", from: "aryan", text: "Agreed." },

  // ===== Scene 1.3 =====
  { type: "sceneHeader", title: "Scene 1.3 — First Artifact", time: "09:45" },
  {
    type: "feedInChat",
    item: {
      icon: "⛱",
      category: "ARTIFACT ENTRY #001",
      priority: "HIGH",
      time: "09:45",
      headline: "Bronze Seal — Excellent Condition",
      fields: [
        ["Name", "Bronze Seal"],
        ["Location", "Northern Excavation Sector"],
        ["Estimated Age", "Unknown"],
        ["Condition", "Excellent"],
      ],
    },
  },
  { type: "msg", from: "ananya", text: "That’s unusual." },
  { type: "msg", from: "kabir", text: "The artifact?" },
  { type: "msg", from: "ananya", text: "The symbol on it." },
  { type: "msg", from: "maya", text: "What’s wrong with it?" },
  { type: "msg", from: "ananya", text: "Nothing. That’s the problem." },
  { type: "msg", from: "ananya", text: "I’ve never seen it before." },
  { type: "silence" },
  { type: "msg", from: "aryan", text: "Can you identify the language?" },
  { type: "msg", from: "ananya", text: "Not yet." },
  {
    type: "decision",
    id: "d1",
    prompt: "DECISION 1 — What should the team do first?",
    options: [
      {
        key: "A",
        label: "Prioritize artifact analysis.",
        effects: { analysis: 5, trust_ananya: 3 },
        reactions: [{ from: "ananya", text: "Good. The symbol is the most important clue we have." }],
      },
      {
        key: "B",
        label: "Expand the excavation area.",
        effects: { discovery: 5, trust_kabir: 3 },
        reactions: [{ from: "kabir", text: "Now we’re talking. There’s more out there." }],
      },
      {
        key: "C",
        label: "Compare with historical records first.",
        effects: { historical_insight: 5, trust_aryan: 3 },
        reactions: [{ from: "aryan", text: "Right. Context before conclusions." }],
      },
    ],
  },

  // ===== Scene 1.4 =====
  { type: "sceneHeader", title: "Scene 1.4 — Inscription Fragment", time: "11:15" },
  {
    type: "feedInChat",
    item: {
      icon: "📜",
      category: "INSCRIPTION UPDATE",
      priority: "HIGH",
      time: "11:15",
      headline: "Repeated Sequence Detected — Eastern Wall",
      fields: [
        ["Fragment Location", "Eastern Wall"],
        ["Translation Status", "Unknown"],
        ["Recovered Symbols", "✦ △ ○ ✦"],
        ["Pattern", "Repeated Sequence Detected"],
      ],
    },
  },
  { type: "msg", from: "ananya", text: "There it is again." },
  { type: "msg", from: "kabir", text: "Again?" },
  { type: "msg", from: "ananya", text: "The same symbol appeared on the seal." },
  { type: "msg", from: "aryan", text: "A coincidence?" },
  { type: "msg", from: "ananya", text: "Maybe. But I don’t think so." },
  { type: "msg", from: "maya", text: "Why?" },
  { type: "msg", from: "ananya", text: "Because people don’t carve the same symbol repeatedly by accident." },
  { type: "banner", text: "🚨 Pattern Match Detected" },

  // ===== Scene 1.5 =====
  { type: "sceneHeader", title: "Scene 1.5 — DM from Ananya", time: "11:45", channel: "Direct Message" },
  { type: "dm", from: "ananya", text: "Can I show you something?" },
  { type: "dm", from: "ananya", text: "The symbol on the seal. The symbol on the wall. And the symbol from a fragment discovered yesterday." },
  { type: "dm", from: "ananya", text: "They’re all connected." },
  { type: "dm", from: "ananya", text: "I don’t know how yet. But they are." },
  { type: "dm", from: "ananya", text: "I’ve reviewed thousands of inscriptions. I’ve never seen this symbol family before." },
  { type: "dm", from: "ananya", text: "That’s exciting. And slightly terrifying." },

  // ===== Scene 1.6 =====
  { type: "sceneHeader", title: "Scene 1.6 — Site Map Analysis", time: "13:30" },
  {
    type: "feedInChat",
    item: {
      icon: "🗺",
      category: "SITE SURVEY UPDATE",
      priority: "HIGH",
      time: "13:30",
      headline: "Possible Underground Chamber — Southern Complex",
      fields: [
        ["New Structure Identified", "Yes"],
        ["Possible Underground Chamber", "Confirmed"],
        ["Location", "Southern Complex"],
        ["Status", "Unexplored"],
      ],
    },
  },
  { type: "msg", from: "kabir", text: "Now we’re talking." },
  { type: "msg", from: "maya", text: "You say that every time we find a hole in the ground." },
  { type: "msg", from: "kabir", text: "Because history keeps hiding things in holes." },
  { type: "msg", from: "aryan", text: "No exploration until we assess structural stability." },
  { type: "msg", from: "kabir", text: "There it is. The fun police." },
  {
    type: "decision",
    id: "d2",
    prompt: "DECISION 2 — How should the team proceed with the chamber?",
    options: [
      {
        key: "A",
        label: "Explore immediately.",
        effects: { discovery: 5, trust_kabir: 5 },
        reactions: [
          { from: "kabir", text: "Finally. Let’s go." },
          { from: "maya", text: "Please be careful." },
        ],
      },
      {
        key: "B",
        label: "Conduct a safety survey first.",
        effects: { judgment: 5, trust_aryan: 5 },
        reactions: [{ from: "aryan", text: "The right call. Safety first, discovery second." }],
      },
      {
        key: "C",
        label: "Gather more evidence from the surface before going in.",
        effects: { analysis: 5, trust_ananya: 5 },
        reactions: [{ from: "ananya", text: "Good. The chamber will still be there. The surface clues may not be." }],
      },
    ],
  },

  // ===== Scene 1.7 =====
  { type: "sceneHeader", title: "Scene 1.7 — Historical Comparison", time: "15:00" },
  {
    type: "feedInChat",
    item: {
      icon: "📚",
      category: "HISTORICAL REVIEW",
      priority: "HIGH",
      time: "15:00",
      headline: "No Direct Match Identified",
      fields: [
        ["Known Civilizations Compared", "Mauryan / Satavahana / Kushan / Gupta"],
        ["Result", "No direct match identified"],
      ],
    },
  },
  { type: "silence" },
  { type: "msg", from: "kabir", text: "That’s not supposed to happen." },
  { type: "msg", from: "ananya", text: "No. It’s really not." },
  { type: "msg", from: "aryan", text: "Are we certain?" },
  { type: "msg", from: "ananya", text: "As certain as we can be." },
  { type: "msg", from: "maya", text: "Meaning?" },
  { type: "msg", from: "ananya", text: "Meaning we may be looking at something undocumented." },
  { type: "silence" },
  { type: "msg", from: "kabir", text: "That’s huge." },
  {
    type: "decision",
    id: "d3",
    prompt: "DECISION 3 — What’s the most likely explanation?",
    options: [
      {
        key: "A",
        label: "An unknown regional civilization.",
        effects: { discovery: 5, mystery_progress: 5 },
        reactions: [{ from: "ananya", text: "That’s what the evidence suggests. But we need more proof." }],
      },
      {
        key: "B",
        label: "A known civilization with unusual regional symbols.",
        effects: { historical_insight: 5 },
        reactions: [{ from: "aryan", text: "The safer theory. But it doesn’t fully explain what we’re seeing." }],
      },
      {
        key: "C",
        label: "We need more evidence before drawing conclusions.",
        effects: { analysis: 5, trust_ananya: 3 },
        reactions: [{ from: "ananya", text: "Yes. Exactly. Let’s not rush this." }],
      },
    ],
  },

  // ===== Scene 1.8 =====
  { type: "sceneHeader", title: "Scene 1.8 — End of Day Debrief", time: "17:00" },
  { type: "msg", from: "aryan", text: "Let’s summarize. Today we discovered: unknown symbols, repeating inscriptions, a possible underground chamber, no historical match." },
  { type: "msg", from: "kabir", text: "Which is archaeologist language for: things just got interesting." },
  { type: "msg", from: "maya", text: "Very interesting." },
  { type: "msg", from: "ananya", text: "The symbols bother me." },
  { type: "msg", from: "aryan", text: "Why?" },
  { type: "msg", from: "ananya", text: "Because they feel intentional. Not decorative. Not random. Intentional." },
  { type: "silence" },
  { type: "msg", from: "aryan", text: "We’ll continue tomorrow. For now. Good work." },
  {
    type: "decision",
    id: "d4",
    prompt: "DECISION 4 — What interests you most?",
    options: [
      {
        key: "A",
        label: "The symbols.",
        effects: { decoding_progress: 5, trust_ananya: 3 },
        reactions: [{ from: "ananya", text: "Good. The symbols are the key to everything." }],
      },
      {
        key: "B",
        label: "The underground chamber.",
        effects: { discovery: 5, trust_kabir: 3 },
        reactions: [{ from: "kabir", text: "Same. I want to know what’s in there." }],
      },
      {
        key: "C",
        label: "The unknown civilization.",
        effects: { historical_insight: 5, trust_aryan: 3 },
        reactions: [{ from: "aryan", text: "That’s the right question to be asking." }],
      },
    ],
  },
  { type: "endDay" },
];

export const REFLECTION_QUESTIONS = [
  {
    id: "q1",
    prompt: "Which clue feels most important — the Bronze Seal, the repeating symbols, the underground chamber, or the missing historical match?",
    options: [
      "The Bronze Seal",
      "The repeating symbols",
      "The underground chamber",
      "The missing historical match",
    ],
  },
  {
    id: "q2",
    prompt: "Who do you trust most on the team so far?",
    options: ["Dr. Aryan Rao", "Ananya Sen", "Kabir Khanna", "Maya Verma"],
  },
  {
    id: "q3",
    prompt: "What do you think happened here — lost civilization, forgotten kingdom, unknown religious site, or not enough information yet?",
    options: [
      "Lost civilization",
      "Forgotten kingdom",
      "Unknown religious site",
      "Not enough information yet",
    ],
  },
  {
    id: "q4",
    prompt: "What should the team investigate first tomorrow?",
    options: [
      "The repeating symbols",
      "The underground chamber",
      "The Bronze Seal",
      "The missing historical match",
    ],
  },
];
