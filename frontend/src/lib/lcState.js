// Lost Civilization — sessionStorage state helpers

const KEY = "lc_state";

const DEFAULT_STATS = {
  discovery: 50,
  analysis: 50,
  judgment: 50,
  historical_insight: 50,
  mystery_progress: 50,
  artifact_recovery: 50,
  decoding_progress: 50,
  preservation_score: 50,
  public_interest: 50,
  trust_aryan: 50,
  trust_ananya: 50,
  trust_kabir: 50,
  trust_maya: 50,
};

export const defaultState = () => ({
  intern_name: "",
  screen: "onboarding", // onboarding | app | reflection
  current_day: 1, // 1, 2, 3
  stats: { ...DEFAULT_STATS },
  decisions: {},
  reflections: {
    day1: { q1: "", q2: "", q3: "", q4: "" },
    day2: { q1: "", q2: "", q3: "", q4: "" },
    day3: { q1: "", q2: "", q3: "" },
  },
  sceneCursor: 0, // index in active day timeline
  chatLog: [], // visible chat entries (resets per day)
  feedItems: [], // cumulative feed entries across days
  feedUnread: 0,
  dms: { aryan: [], ananya: [], kabir: [], maya: [] },
  dmUnread: { aryan: 0, ananya: 0, kabir: 0, maya: 0 },
});

export function loadState() {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const merged = { ...defaultState(), ...parsed };
    // Backwards-compat: migrate old single `reflection` to `reflections.day1`
    if (parsed.reflection && !parsed.reflections) {
      merged.reflections = {
        day1: { ...defaultState().reflections.day1, ...parsed.reflection },
        day2: { ...defaultState().reflections.day2 },
      };
    }
    return merged;
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  sessionStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  sessionStorage.removeItem(KEY);
}

export const STAT_LABELS = {
  discovery: "Discovery",
  analysis: "Analysis",
  judgment: "Judgment",
  historical_insight: "Historical Insight",
  mystery_progress: "Mystery Progress",
  artifact_recovery: "Artifact Recovery",
  decoding_progress: "Decoding Progress",
  preservation_score: "Preservation Score",
  public_interest: "Public Interest",
};

export const CHARACTERS = {
  aryan: {
    key: "aryan",
    name: "Dr. Aryan Rao",
    short: "Aryan",
    role: "Expedition Director",
    initials: "AR",
    color: "#8B5A2B",
  },
  ananya: {
    key: "ananya",
    name: "Ananya Sen",
    short: "Ananya",
    role: "Ancient Script Specialist",
    initials: "AS",
    color: "#A0522D",
  },
  kabir: {
    key: "kabir",
    name: "Kabir Khanna",
    short: "Kabir",
    role: "Field Archaeologist",
    initials: "KK",
    color: "#B8741A",
  },
  maya: {
    key: "maya",
    name: "Maya Verma",
    short: "Maya",
    role: "Heritage Journalist",
    initials: "MV",
    color: "#6B4423",
  },
};

export function trustLabel(value) {
  if (value >= 65) return "High";
  if (value <= 40) return "Low";
  return "Neutral";
}
