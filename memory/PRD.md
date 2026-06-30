# Lost Civilization — Product Requirements (Stage 1)

## Problem Statement
Build a 3-day **Archaeology Explorer Internship** simulation called **Lost Civilization** for school students (ages 13–17). Stage 1 = complete app shell + Day 1: The Discovery. Stop when the Day 1 Reflection summary renders and the disabled "Begin Day 2" button appears.

## Audience / Personas
- **Primary:** Junior secondary / senior secondary students (13–17) playing the role of "Junior Archaeological Investigator" for the fictional Indian Archaeological Research Authority (IARA).
- **Secondary:** Teachers / mentors observing student decision patterns.

## Core Requirements (static)
- Tech stack: **React + Tailwind**, all state in **sessionStorage**, all dialogue in **JSON**.
- 5 screens: Onboarding • Team Chat • Discovery Feed • DMs • Day Reflection.
- Vidyaloop logo top-left on every screen (actual uploaded asset, no placeholder).
- 12 variables stored in sessionStorage, all default to 50.
- Character voices preserved: Aryan (calm), Ananya (analytical), Kabir (fast), Maya (reflective).
- Archaeological expedition aesthetic — sandstone, terracotta, parchment.
- Decision cards inline, never overlays. Outgoing bubble before reactions. Cards permanently dismissed after selection.
- Discovery Feed: read-only, category badges + priority + timestamp.
- DMs: 4 character threads, unread dot, read-only, return-to-chat button.
- Reflection: 4 questions one at a time → animated stat bars (600ms each) → relationship indicators → disabled "Begin Day 2" button.

## What's Been Implemented (2026-02)
- ✅ Full app shell with 5 screens and persistent sessionStorage state.
- ✅ Onboarding briefing card with name input gating CTA.
- ✅ Team Chat engine with typing delays (320–800ms), avatars, scene headers, banners, feed/DM notice markers.
- ✅ Discovery Feed tab with category badges, priorities, timestamps.
- ✅ DMs tab with 4 threads, unread badges, return-to-chat button.
- ✅ All 8 Day 1 scenes implemented with **exact** dialogue, feed items, and decision text from the spec.
- ✅ All 4 decisions wired with effects → reactions → Continue.
- ✅ Day 1 Reflection: 4 questions sequential → animated variable summary → disabled "Begin Day 2".
- ✅ End-to-end smoke-tested in browser.

## Prioritized Backlog
### P0 (Stage 2)
- Day 2 — The Mystery: hidden chambers, artifact theft investigation, deeper clue threading.
- Enable the "Begin Day 2" button gated on Day 1 completion.
- Persist state across browser sessions if desired (currently sessionStorage, intentionally per spec).

### P1 (Stage 3)
- Day 3 — Lost Civilization: symbol decoding mechanic, truth reveal, preservation decision.
- Final outcome card based on variable thresholds.

### P2 (Enhancements)
- Mentor / teacher dashboard summarising student variable arcs.
- Shareable certificate / "internship report" PDF at end of Day 3.
- Ambient audio (excavation sounds) toggle.
- Accessibility: reduced-motion mode, keyboard navigation across decision options.

## Next Tasks
- Await user review of Stage 1 result.
- On approval, implement Day 2 timeline + unlock "Begin Day 2" button.
