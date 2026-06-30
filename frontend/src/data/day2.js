// Lost Civilization — Day 2 timeline.
// Every line of dialogue, every feed item, every decision exactly as written in spec.
// The trust-state DM from Aryan (Day 2 start) is injected in App.js based on trust_aryan
// before this timeline starts playing. The Scene 2.6 DM from Ananya is embedded here so
// it fires during the 2.5–2.7 transition (after Scene 2.5 chat and before Scene 2.7).

export const DAY2_TIMELINE = [
  // ===== Scene 2.1 =====
  { type: "sceneHeader", title: "Scene 2.1 — Morning Discovery Briefing", time: "08:00", channel: "IARA Expedition Channel" },
  { type: "banner", text: "🚨 Investigation Status Elevated" },
  { type: "msg", from: "aryan", text: "Good morning everyone. We’ve had developments overnight." },
  { type: "msg", from: "kabir", text: "Good developments?" },
  { type: "msg", from: "ananya", text: "Depends on your definition of good." },
  { type: "msg", from: "maya", text: "That’s never reassuring." },
  { type: "msg", from: "ananya", text: "I completed a preliminary analysis of the symbols." },
  { type: "msg", from: "ananya", text: "And they don’t behave like a language." },
  { type: "silence" },
  { type: "msg", from: "aryan", text: "Explain." },
  { type: "msg", from: "ananya", text: "They repeat too consistently. They’re not sentences." },
  { type: "msg", from: "ananya", text: "They’re instructions." },

  // ===== Scene 2.2 =====
  { type: "sceneHeader", title: "Scene 2.2 — Hidden Chamber Discovery", time: "09:30" },
  {
    type: "feedInChat",
    item: {
      icon: "🏛",
      category: "CHAMBER ENTRY IDENTIFIED",
      priority: "HIGH",
      time: "09:30",
      headline: "Southern Complex — Chamber Accessible",
      fields: [
        ["Location", "Southern Complex"],
        ["Status", "Accessible"],
        ["Condition", "Stable"],
      ],
    },
  },
  { type: "msg", from: "kabir", text: "Permission to explore?" },
  { type: "msg", from: "aryan", text: "Limited exploration. Document everything. Touch nothing." },
  { type: "msg", from: "kabir", text: "You always ruin the fun." },
  { type: "msg", from: "aryan", text: "And somehow we still discover history." },
  { type: "narration", text: "Inside the chamber: Stone pillars. Symbol-covered walls. Central pedestal. Empty display stand." },
  { type: "msg", from: "maya", text: "Something used to be here." },
  { type: "msg", from: "ananya", text: "Definitely." },
  { type: "msg", from: "kabir", text: "And now it’s gone." },
  {
    type: "decision",
    id: "d5",
    prompt: "DECISION 5 — What should the team investigate first?",
    options: [
      {
        key: "A",
        label: "The pedestal.",
        effects: { historical_insight: 5, trust_aryan: 3 },
        reactions: [{ from: "aryan", text: "The pedestal is the centrepiece. Understanding its purpose first is the right call." }],
      },
      {
        key: "B",
        label: "The wall symbols.",
        effects: { analysis: 5, trust_ananya: 3 },
        reactions: [{ from: "ananya", text: "Good. The symbols will explain everything else." }],
      },
      {
        key: "C",
        label: "The chamber layout.",
        effects: { discovery: 5, trust_kabir: 3 },
        reactions: [{ from: "kabir", text: "Yes. Understanding the space tells us how it was used." }],
      },
    ],
  },

  // ===== Scene 2.3 =====
  { type: "sceneHeader", title: "Scene 2.3 — Artifact Theft", time: "11:00" },
  {
    type: "feed", // appears in Discovery Feed tab with unread badge (per spec)
    item: {
      icon: "🚨",
      category: "ARTIFACT ALERT",
      priority: "HIGH",
      time: "11:00",
      headline: "Artifact #003 — Status MISSING",
      fields: [
        ["Artifact", "#003"],
        ["Status", "MISSING"],
        ["Last Recorded", "Storage Tent"],
        ["Current Status", "Unknown"],
      ],
    },
  },
  { type: "silence" },
  { type: "msg", from: "kabir", text: "You’re joking." },
  { type: "msg", from: "maya", text: "Please tell me this is a mistake." },
  { type: "msg", from: "aryan", text: "Inventory confirmed. The artifact is gone." },
  { type: "msg", from: "ananya", text: "Someone took it." },
  { type: "banner", text: "🚨 Theft Investigation Opened" },

  // ===== Scene 2.4 =====
  { type: "sceneHeader", title: "Scene 2.4 — Symbol Breakthrough", time: "12:30" },
  {
    type: "feedInChat",
    item: {
      icon: "📜",
      category: "ANALYSIS UPDATE",
      priority: "HIGH",
      time: "12:30",
      headline: "Recurring Symbol Cluster Identified",
      fields: [
        ["Observed Locations", "Chamber Entrance / Bronze Seal / Missing Artifact / Wall Inscriptions"],
      ],
    },
  },
  { type: "msg", from: "ananya", text: "I think we misunderstood the symbols." },
  { type: "msg", from: "kabir", text: "Meaning?" },
  { type: "msg", from: "ananya", text: "They’re not labels. They’re directions." },
  { type: "msg", from: "aryan", text: "Directions to what?" },
  { type: "msg", from: "ananya", text: "I don’t know yet. But they’re leading somewhere." },
  {
    type: "decision",
    id: "d6",
    prompt: "DECISION 6 — What should the team do?",
    options: [
      {
        key: "A",
        label: "Follow the symbol trail immediately.",
        effects: { discovery: 5, trust_kabir: 5 },
        reactions: [
          { from: "kabir", text: "Finally. Action." },
          { from: "maya", text: "Be careful what we disturb." },
        ],
      },
      {
        key: "B",
        label: "Continue decoding first.",
        effects: { analysis: 5, trust_ananya: 5 },
        reactions: [{ from: "ananya", text: "Thank you. Understanding before action." }],
      },
      {
        key: "C",
        label: "Investigate the theft first.",
        effects: { judgment: 5, trust_aryan: 5 },
        reactions: [{ from: "aryan", text: "Right. A theft changes the nature of this investigation." }],
      },
    ],
  },

  // ===== Scene 2.5 =====
  { type: "sceneHeader", title: "Scene 2.5 — Political Pressure", time: "14:00" },
  {
    type: "feed", // government update — Discovery Feed tab with unread badge (per spec)
    item: {
      icon: "📰",
      category: "GOVERNMENT UPDATE",
      priority: "MEDIUM",
      time: "14:00",
      headline: "Regional Officials Request Site Access",
      fields: [
        ["Reason", "Historical Significance"],
        ["Media Attention", "Increasing"],
      ],
    },
  },
  { type: "msg", from: "maya", text: "That was fast." },
  { type: "msg", from: "aryan", text: "Too fast." },
  { type: "msg", from: "ananya", text: "Word travels quickly when history is involved." },
  { type: "msg", from: "kabir", text: "Especially valuable history." },
  { type: "msg", from: "maya", text: "Or politically useful history." },

  // ===== Scene 2.6 — Ananya DM (fires during 2.5–2.7 transition) =====
  { type: "sceneHeader", title: "Scene 2.6 — DM from Ananya", time: "14:30", channel: "Direct Message" },
  { type: "dm", from: "ananya", text: "Can I tell you something strange?" },
  { type: "dm", from: "ananya", text: "The symbols don’t seem religious. They don’t seem administrative. And they don’t seem decorative." },
  { type: "dm", from: "ananya", text: "Most ancient inscriptions tell people something. These symbols appear to guide people somewhere." },
  { type: "dm", from: "ananya", text: "Almost like a map." },
  { type: "dm", from: "ananya", text: "And if that’s true… the chamber isn’t the destination. It’s the beginning." },

  // ===== Scene 2.7 =====
  { type: "sceneHeader", title: "Scene 2.7 — Major Discovery", time: "15:30" },
  {
    type: "feedInChat",
    item: {
      icon: "🗺",
      category: "STRUCTURAL ANALYSIS",
      priority: "HIGH",
      time: "15:30",
      headline: "New Underground Pathway Detected",
      fields: [
        ["Connected to", "Hidden Chamber"],
        ["Estimated Length", "Unknown"],
      ],
    },
  },
  { type: "msg", from: "kabir", text: "There it is." },
  { type: "msg", from: "ananya", text: "The symbols were guiding people here." },
  { type: "msg", from: "aryan", text: "Can we safely enter?" },
  { type: "msg", from: "kabir", text: "Only one way to find out." },
  { type: "narration", text: "Aryan sighs." },
  { type: "msg", from: "maya", text: "I think that’s the most predictable sentence you’ve ever said." },
  {
    type: "decision",
    id: "d7",
    prompt: "DECISION 7 — How should the expedition proceed?",
    options: [
      {
        key: "A",
        label: "Enter immediately.",
        effects: { discovery: 5, trust_kabir: 3 },
        reactions: [
          { from: "kabir", text: "Let’s go." },
          { from: "aryan", text: "Document every step." },
        ],
      },
      {
        key: "B",
        label: "Survey the entrance first.",
        effects: { judgment: 5, trust_aryan: 3 },
        reactions: [{ from: "aryan", text: "The right call. Safety first." }],
      },
      {
        key: "C",
        label: "Wait for additional support.",
        effects: { historical_insight: 5 },
        reactions: [{ from: "maya", text: "Patient and responsible. Good." }],
      },
    ],
  },

  // ===== Scene 2.8 =====
  { type: "sceneHeader", title: "Scene 2.8 — End of Day Review", time: "17:00" },
  { type: "msg", from: "aryan", text: "Today’s findings. Hidden chamber discovered. Artifact theft confirmed. Symbols partially decoded. Underground pathway identified." },
  { type: "msg", from: "kabir", text: "I’ve had less exciting years." },
  { type: "msg", from: "maya", text: "Tomorrow changes everything." },
  { type: "msg", from: "ananya", text: "Agreed. We’re finally close." },
  { type: "msg", from: "aryan", text: "Tomorrow we find answers." },
  {
    type: "decision",
    id: "d8",
    prompt: "DECISION 8 — What matters most tomorrow?",
    options: [
      {
        key: "A",
        label: "Finding the civilization.",
        effects: { discovery: 5, mystery_progress: 5 },
        reactions: [{ from: "kabir", text: "The big one. Let’s do it." }],
      },
      {
        key: "B",
        label: "Recovering the artifact.",
        effects: { artifact_recovery: 5, judgment: 5 },
        reactions: [{ from: "maya", text: "The artifact belongs here. Getting it back matters." }],
      },
      {
        key: "C",
        label: "Understanding the symbols.",
        effects: { decoding_progress: 5, analysis: 5 },
        reactions: [{ from: "ananya", text: "The symbols are the key to all of it." }],
      },
    ],
  },
  { type: "endDay" },
];

// Day 2 reflection questions are open-ended (spec lists no fixed options).
export const REFLECTION_QUESTIONS_DAY2 = [
  { id: "q1", prompt: "Who do you think took the artifact — and why?" },
  { id: "q2", prompt: "What do you think the symbols are guiding people toward?" },
  { id: "q3", prompt: "What’s hidden beyond the underground pathway?" },
  { id: "q4", prompt: "Which clue matters most going into tomorrow?" },
];

export function aryanTrustDMForDay2(trust_aryan) {
  if (trust_aryan > 65) {
    return "Today will test the team. The chamber changes everything. I need people thinking carefully, not just quickly.";
  }
  if (trust_aryan < 35) {
    return "Follow the team’s lead today.";
  }
  return "Stay focused today. The investigation is becoming more complex.";
}
