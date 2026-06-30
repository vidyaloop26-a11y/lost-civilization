import React, { useEffect, useRef, useState } from "react";
import { CHARACTERS } from "../../lib/lcState";
import { OUTCOME_TEXT } from "../../data/day3";
import { Avatar } from "./Avatar";
import { FeedCard } from "./FeedCard";

// Renders chat log and drives playback of the timeline for the current day.
export const TeamChat = ({ state, setState, timeline, onTimelineFinished }) => {
  const scrollRef = useRef(null);
  const playingRef = useRef(false);
  const atBottomRef = useRef(true);
  const lastLenRef = useRef(state.chatLog.length);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [pendingDecision, setPendingDecision] = useState(null);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [endOfDay, setEndOfDay] = useState(false);

  // Track whether user is within 100px of bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const d = el.scrollHeight - el.scrollTop - el.clientHeight;
      atBottomRef.current = d < 100;
      if (atBottomRef.current) setShowNewMsg(false);
    };
    el.addEventListener("scroll", onScroll);
    // Initial measurement after mount
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll only if at bottom; otherwise show "New message ↓" pill
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const grew = state.chatLog.length > lastLenRef.current;
    if (grew) {
      if (atBottomRef.current) {
        // Scroll on next frame after layout
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight;
        });
      } else {
        setShowNewMsg(true);
      }
    }
    lastLenRef.current = state.chatLog.length;
  }, [state.chatLog]);

  // Always scroll when decision/continue/endOfDay UI appears AND user is at bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (atBottomRef.current) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    } else if (pendingDecision || awaitingContinue || endOfDay) {
      setShowNewMsg(true);
    }
  }, [pendingDecision, awaitingContinue, endOfDay]);

  const jumpToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setShowNewMsg(false);
  };

  // Playback driver
  useEffect(() => {
    if (playingRef.current) return;
    if (pendingDecision || awaitingContinue || endOfDay) return;
    playingRef.current = true;

    let cancelled = false;
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    const typingDelay = () => 320 + Math.random() * 480;

    const appendLog = (entry) =>
      setState((s) => ({ ...s, chatLog: [...s.chatLog, entry] }));

    const run = async () => {
      let i = state.sceneCursor;
      while (i < timeline.length && !cancelled) {
        const ev = timeline[i];

        if (ev.type === "decision") {
          setPendingDecision({ ...ev, index: i });
          return;
        }
        if (ev.type === "endDay") {
          setEndOfDay(true);
          return;
        }

        if (ev.type === "msg") {
          setState((s) => ({
            ...s,
            chatLog: [...s.chatLog, { kind: "typing", from: ev.from, _t: Date.now() }],
          }));
          await sleep(typingDelay());
          if (cancelled) return;
          setState((s) => {
            const log = s.chatLog.filter((m) => m.kind !== "typing");
            return { ...s, chatLog: [...log, { kind: "msg", from: ev.from, text: ev.text }], sceneCursor: i + 1 };
          });
        } else if (ev.type === "silence") {
          await sleep(800);
          setState((s) => ({ ...s, chatLog: [...s.chatLog, { kind: "silence" }], sceneCursor: i + 1 }));
        } else if (ev.type === "narration") {
          setState((s) => ({ ...s, chatLog: [...s.chatLog, { kind: "narration", text: ev.text }], sceneCursor: i + 1 }));
          await sleep(550);
        } else if (ev.type === "outcomeReveal") {
          setState((s) => {
            const choice = s.decisions.d9 || "A";
            const o = OUTCOME_TEXT[choice];
            return {
              ...s,
              chatLog: [...s.chatLog, { kind: "outcome", title: o.title, body: o.body }],
              sceneCursor: i + 1,
            };
          });
          await sleep(700);
        } else if (ev.type === "banner") {
          setState((s) => ({ ...s, chatLog: [...s.chatLog, { kind: "banner", text: ev.text }], sceneCursor: i + 1 }));
          await sleep(450);
        } else if (ev.type === "sceneHeader") {
          setState((s) => ({
            ...s,
            chatLog: [...s.chatLog, { kind: "sceneHeader", title: ev.title, time: ev.time, channel: ev.channel }],
            sceneCursor: i + 1,
          }));
          await sleep(450);
        } else if (ev.type === "feed") {
          setState((s) => ({
            ...s,
            feedItems: [...s.feedItems, ev.item],
            feedUnread: s.feedUnread + 1,
            chatLog: [...s.chatLog, { kind: "feedNotice", category: ev.item.category }],
            sceneCursor: i + 1,
          }));
          await sleep(450);
        } else if (ev.type === "feedInChat") {
          setState((s) => ({
            ...s,
            feedItems: [...s.feedItems, ev.item],
            feedUnread: s.feedUnread + 1,
            chatLog: [...s.chatLog, { kind: "feedCard", item: ev.item }],
            sceneCursor: i + 1,
          }));
          await sleep(500);
        } else if (ev.type === "dm") {
          setState((s) => {
            const lastEntry = s.chatLog[s.chatLog.length - 1];
            const dedupe = lastEntry && lastEntry.kind === "dmNotice" && lastEntry.from === ev.from;
            const nextLog = dedupe
              ? s.chatLog
              : [...s.chatLog, { kind: "dmNotice", from: ev.from }];
            return {
              ...s,
              dms: { ...s.dms, [ev.from]: [...s.dms[ev.from], { from: ev.from, text: ev.text }] },
              dmUnread: { ...s.dmUnread, [ev.from]: s.dmUnread[ev.from] + 1 },
              chatLog: nextLog,
              sceneCursor: i + 1,
            };
          });
          await sleep(420);
        }

        i += 1;
      }

      if (i >= timeline.length && !cancelled) {
        onTimelineFinished?.();
      }
    };

    run().finally(() => {
      playingRef.current = false;
    });

    return () => {
      cancelled = true;
      playingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingDecision === null, awaitingContinue, endOfDay]);

  const handleDecision = (option) => {
    const decision = pendingDecision;
    setState((s) => {
      const newStats = { ...s.stats };
      Object.entries(option.effects).forEach(([k, v]) => {
        newStats[k] = Math.max(0, Math.min(100, (newStats[k] ?? 50) + v));
      });
      return {
        ...s,
        stats: newStats,
        decisions: { ...s.decisions, [decision.id]: option.key },
        chatLog: [
          ...s.chatLog,
          { kind: "outgoing", text: option.label, fromName: s.intern_name },
          { kind: "effects", effects: option.effects },
        ],
      };
    });

    const playReactions = async () => {
      const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
      for (const r of option.reactions) {
        setState((s) => ({ ...s, chatLog: [...s.chatLog, { kind: "typing", from: r.from, _t: Date.now() }] }));
        await sleep(360 + Math.random() * 440);
        setState((s) => {
          const log = s.chatLog.filter((m) => m.kind !== "typing");
          return { ...s, chatLog: [...log, { kind: "msg", from: r.from, text: r.text }] };
        });
      }
      setState((s) => ({ ...s, sceneCursor: decision.index + 1 }));
      setPendingDecision(null);
      setAwaitingContinue(true);
    };
    playReactions();
  };

  const handleContinue = () => setAwaitingContinue(false);

  return (
    <div className="relative flex h-full flex-col">
      <div
        ref={scrollRef}
        data-testid="lc-chat-scroll"
        className="flex-1 overflow-y-auto px-4 py-5 sm:px-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(184,116,26,0.06), transparent 40%), radial-gradient(circle at 80% 100%, rgba(107,68,35,0.06), transparent 45%)",
        }}
      >
        <div className="mx-auto max-w-3xl space-y-3">
          {state.chatLog.map((entry, idx) => (
            <ChatEntry key={idx} entry={entry} />
          ))}

          {pendingDecision && (
            <DecisionCard decision={pendingDecision} onPick={handleDecision} />
          )}

          {awaitingContinue && (
            <div className="flex justify-center pt-3">
              <button
                data-testid="lc-continue-btn"
                onClick={handleContinue}
                className="rounded-full bg-[#8b4513] px-7 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] transition-all hover:translate-y-[-1px] hover:bg-[#7a3b10] hover:shadow-[0_5px_0_#5a2c0c] active:translate-y-[1px] active:shadow-[0_2px_0_#5a2c0c]"
              >
                Continue
              </button>
            </div>
          )}

          {endOfDay && (
            <div className="mt-6 rounded-lg border border-[#c9a96e] bg-[#fff7e6] p-5 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
                Day Complete
              </div>
              <div className="mt-1 font-serif text-lg text-[#3b2412]">
                Time to reflect on the day.
              </div>
              <button
                data-testid="lc-go-reflection-btn"
                onClick={onTimelineFinished}
                className="mt-4 rounded-full bg-[#8b4513] px-7 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-[#fdf6e3] shadow-[0_4px_0_#5a2c0c] hover:bg-[#7a3b10]"
              >
                Continue to Reflection
              </button>
            </div>
          )}
        </div>
      </div>

      {showNewMsg && (
        <button
          data-testid="lc-new-message-btn"
          onClick={jumpToBottom}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#3b2412] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#fdf6e3] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all hover:bg-[#5a3a18]"
        >
          New message ↓
        </button>
      )}
    </div>
  );
};

const ChatEntry = ({ entry }) => {
  if (entry.kind === "sceneHeader") {
    return (
      <div className="my-4 flex items-center gap-3 text-[#8a6a3d]">
        <div className="h-px flex-1 bg-[#c9a96e]/60" />
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em]">
            {entry.channel || "IARA Channel"} · {entry.time}
          </div>
          <div className="font-serif text-[13px] text-[#5a3a18]">{entry.title}</div>
        </div>
        <div className="h-px flex-1 bg-[#c9a96e]/60" />
      </div>
    );
  }
  if (entry.kind === "silence") {
    return (
      <div className="my-2 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#a18653]">
        [ Silence ]
      </div>
    );
  }
  if (entry.kind === "narration") {
    return (
      <div className="my-2 rounded-md border border-dashed border-[#c9a96e] bg-[#fff7e6]/70 px-4 py-2.5 text-center font-serif italic text-[13.5px] text-[#5a3a18]">
        {entry.text}
      </div>
    );
  }
  if (entry.kind === "outcome") {
    return (
      <div
        data-testid="lc-outcome-card"
        className="my-4 overflow-hidden rounded-xl border border-[#c9a96e] bg-[#fff3d6] shadow-[0_6px_0_rgba(107,68,35,0.14)]"
      >
        <div className="border-b border-[#c9a96e] bg-[#8b4513] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#fdf6e3]">
          Outcome · {entry.title}
        </div>
        <div className="px-5 py-4 font-serif text-[15px] leading-relaxed text-[#3b2412]">
          {entry.body}
        </div>
      </div>
    );
  }
  if (entry.kind === "banner") {
    return (
      <div
        data-testid="lc-banner"
        className="my-2 rounded-md border-l-4 border-[#b8410e] bg-[#fff3d6] px-4 py-2.5 font-mono text-[12px] text-[#5a3a18]"
      >
        {entry.text}
      </div>
    );
  }
  if (entry.kind === "feedNotice") {
    return (
      <div className="my-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#a05a1f]">
        ↗ New entry in Discovery Feed · {entry.category}
      </div>
    );
  }
  if (entry.kind === "dmNotice") {
    const c = CHARACTERS[entry.from];
    return (
      <div className="my-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#a05a1f]">
        ✉ New DM from {c?.short || entry.from}
      </div>
    );
  }
  if (entry.kind === "feedCard") {
    return <FeedCard item={entry.item} inChat />;
  }
  if (entry.kind === "outgoing") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <div className="text-right text-[10px] font-mono uppercase tracking-[0.16em] text-[#8a6a3d]">
            You {entry.fromName ? `· ${entry.fromName}` : ""}
          </div>
          <div className="mt-1 rounded-2xl rounded-tr-sm bg-[#8b4513] px-4 py-2.5 text-[14.5px] text-[#fdf6e3]">
            {entry.text}
          </div>
        </div>
      </div>
    );
  }
  if (entry.kind === "effects") {
    const items = Object.entries(entry.effects).map(([k, v]) => `${k.replace(/_/g, " ")} ${v > 0 ? "+" : ""}${v}`);
    return (
      <div className="flex justify-end">
        <div className="rounded-md bg-[#e9d8a8] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#5a3a18]">
          {items.join(" · ")}
        </div>
      </div>
    );
  }
  if (entry.kind === "typing") {
    const c = CHARACTERS[entry.from];
    return (
      <div className="flex items-end gap-2">
        <Avatar who={entry.from} size={32} />
        <div className="rounded-2xl rounded-tl-sm bg-[#fff7e6] px-3 py-2 shadow-sm">
          <span className="inline-flex gap-1">
            <span className="lc-dot" />
            <span className="lc-dot lc-dot-d1" />
            <span className="lc-dot lc-dot-d2" />
          </span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#8a6a3d]">
          {c?.short || entry.from} typing
        </div>
      </div>
    );
  }
  if (entry.kind === "msg") {
    const c = CHARACTERS[entry.from];
    return (
      <div className="flex items-end gap-2">
        <Avatar who={entry.from} size={32} />
        <div className="max-w-[80%]">
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#8a6a3d]">
            {c?.name} <span className="text-[#a18653]">· {c?.role}</span>
          </div>
          <div className="mt-1 rounded-2xl rounded-tl-sm bg-[#fff7e6] px-4 py-2.5 text-[14.5px] text-[#3b2412] shadow-[0_1px_0_rgba(107,68,35,0.10)]">
            {entry.text}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const DecisionCard = ({ decision, onPick }) => {
  const [picked, setPicked] = React.useState(null);
  const handleClick = (opt) => {
    if (picked) return;
    setPicked(opt.key);
    onPick(opt);
  };
  return (
    <div
      data-testid={`lc-decision-${decision.id}`}
      className="my-4 rounded-xl border border-[#c9a96e] bg-[#fdf6e3] p-4 shadow-[0_4px_0_rgba(107,68,35,0.12)] sm:p-5"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
        Decision Required
      </div>
      <div className="mt-1 font-serif text-[16px] font-semibold text-[#3b2412]">
        {decision.prompt}
      </div>
      <div className="mt-4 grid w-full gap-2.5">
        {decision.options.map((opt) => (
          <button
            key={opt.key}
            data-testid={`lc-decision-${decision.id}-option-${opt.key}`}
            onClick={() => handleClick(opt)}
            disabled={picked !== null}
            className={[
              "group flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-all",
              picked
                ? "cursor-not-allowed border-[#c9a96e] bg-[#e9d8a8] opacity-60"
                : "border-[#c9a96e] bg-[#fff7e6] hover:-translate-y-[1px] hover:border-[#8b4513] hover:bg-[#fff3d6] hover:shadow-[0_3px_0_rgba(107,68,35,0.18)]",
            ].join(" ")}
          >
            <span className="rounded-md bg-[#8b4513] px-2 py-1 font-mono text-[11px] font-bold text-[#fdf6e3]">
              {opt.key}
            </span>
            <span className="flex-1 font-serif text-[14.5px] text-[#3b2412]">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
