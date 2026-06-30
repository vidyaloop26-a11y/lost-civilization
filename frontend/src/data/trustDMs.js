// Lost Civilization — Trust-state DMs for all 4 characters across 3 days.
// Exact text from Stage 4 Section B. Word for word.

export const TRUST_DMS = {
  aryan: {
    1: {
      high: "Glad you’re here. This site raises more questions than I expected. I’d value a fresh perspective.",
      neutral: "Review today’s site reports when you’re ready. The evidence deserves careful attention.",
      low: "Site reports are available for review.",
    },
    2: {
      high: "Today will test the team. The chamber changes everything. I need people thinking carefully, not just quickly.",
      neutral: "Stay focused today. The investigation is becoming more complex.",
      low: "Follow the team’s lead today.",
    },
    3: {
      high: "We’re close to something significant. I’m glad you’ve been part of this.",
      neutral: "Today we find answers. Stay sharp.",
      low: "Follow the investigation plan today.",
    },
  },
  ananya: {
    1: {
      high: "You know what’s interesting? People think archaeology is about finding things. Honestly? The real challenge is understanding what those things mean.",
      neutral: "The latest symbol analysis is ready. Let’s review it.",
      low: "Translation updated. Additional analysis pending.",
    },
    2: {
      high: "Everyone is focused on the theft. I’m focused on why the artifact matters. People usually steal things for a reason. If we understand the reason… we may understand the mystery.",
      neutral: "Symbol analysis is progressing. The patterns are becoming clearer.",
      low: "Symbol update available.",
    },
    3: {
      high: "I think I understand it now. And honestly? You helped me get here. You noticed things I might have missed.",
      neutral: "Final decoding underway. We’re close.",
      low: "Decoding update available.",
    },
  },
  kabir: {
    1: {
      high: "You seem like someone who actually wants to explore things rather than just read about them. Good. We’re going to get along fine.",
      neutral: "Stay ready. Things move fast on a dig site.",
      low: "Field updates will follow.",
    },
    2: {
      high: "That chamber is going to change everything. Aryan wants to go slow. I say we go now. What do you think?",
      neutral: "Big day. Lots to explore. Let’s not waste it.",
      low: "Exploration update coming.",
    },
    3: {
      high: "History is literally under our feet and we’re the first people to find it. That’s everything. And you were part of it.",
      neutral: "Final push. Let’s see what’s in there.",
      low: "Field team is ready.",
    },
  },
  maya: {
    1: {
      high: "Every discovery like this raises the same question — who does history belong to? I’m glad someone new is here to help think that through.",
      neutral: "Keep an eye on the public interest side today. Media moves fast when archaeology is involved.",
      low: "Media monitoring update will follow.",
    },
    2: {
      high: "Someone took that artifact for a reason. The question isn’t just who — it’s what they believed it was worth. That tells us something about the discovery itself.",
      neutral: "The theft complicates everything. Watch the public response carefully today.",
      low: "Media update available.",
    },
    3: {
      high: "How we share this discovery will shape how people understand it for generations. I’m glad we had someone thinking carefully about that all week.",
      neutral: "The final decision about how to share this matters as much as the discovery itself.",
      low: "Final communications update available.",
    },
  },
};

// Thresholds: High = > 65 | Neutral = 35–65 | Low = < 35
export function trustTier(value) {
  if (value > 65) return "high";
  if (value < 35) return "low";
  return "neutral";
}

// Returns array of {who, text} for every character's day-start trust DM.
export function dayStartDMs(state, day) {
  const chars = ["aryan", "ananya", "kabir", "maya"];
  return chars.map((who) => ({
    who,
    text: TRUST_DMS[who][day][trustTier(state.stats[`trust_${who}`])],
  }));
}
