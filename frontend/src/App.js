import React, { useEffect, useState } from "react";
import "./App.css";
import { loadState, saveState } from "./lib/lcState";
import { Header } from "./components/lc/Header";
import { Onboarding } from "./components/lc/Onboarding";
import { TeamChat } from "./components/lc/TeamChat";
import { DiscoveryFeed } from "./components/lc/DiscoveryFeed";
import { DMs } from "./components/lc/DMs";
import { Reflection } from "./components/lc/Reflection";
import { DAY1_TIMELINE } from "./data/day1";
import { DAY2_TIMELINE } from "./data/day2";
import { DAY3_TIMELINE } from "./data/day3";
import { dayStartDMs } from "./data/trustDMs";
import { FinalSummary } from "./components/lc/FinalSummary";
import { ErrorBoundary } from "./components/lc/ErrorStates";

function AppInner() {
  const [state, setState] = useState(() => loadState());
  const [tab, setTab] = useState("chat");

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Fire all 4 trust-state DMs at the start of the given day, applied to a state object.
  const applyDayStartDMs = (s, day) => {
    const msgs = dayStartDMs(s, day);
    const dms = { ...s.dms };
    const dmUnread = { ...s.dmUnread };
    for (const { who, text } of msgs) {
      dms[who] = [...dms[who], { from: who, text }];
      dmUnread[who] = (dmUnread[who] || 0) + 1;
    }
    return { ...s, dms, dmUnread };
  };

  const handleBegin = (name) => {
    setState((s) => {
      const next = { ...s, intern_name: name, screen: "app" };
      return applyDayStartDMs(next, 1);
    });
  };

  const goToReflection = () => {
    setState((s) => ({ ...s, screen: "reflection" }));
  };

  const handleBeginDay2 = () => {
    setState((s) => {
      const next = {
        ...s,
        current_day: 2,
        screen: "app",
        sceneCursor: 0,
        chatLog: [],
      };
      return applyDayStartDMs(next, 2);
    });
    setTab("chat");
  };

  const handleBeginDay3 = () => {
    setState((s) => {
      const next = {
        ...s,
        current_day: 3,
        screen: "app",
        sceneCursor: 0,
        chatLog: [],
      };
      return applyDayStartDMs(next, 3);
    });
    setTab("chat");
  };

  const handleViewFinal = () => {
    setState((s) => ({ ...s, screen: "final" }));
  };

  if (state.screen === "final") {
    return <FinalSummary state={state} />;
  }

  if (state.screen === "onboarding") {
    return <Onboarding onBegin={handleBegin} />;
  }

  if (state.screen === "reflection") {
    const onBeginNext =
      state.current_day === 3
        ? handleViewFinal
        : state.current_day === 2
        ? handleBeginDay3
        : handleBeginDay2;
    return (
      <div data-testid="lc-app-reflection" className="min-h-screen bg-[#f5ebd7]">
        <Header day={state.current_day} internName={state.intern_name} showTabs={false} />
        <Reflection state={state} setState={setState} onBeginNextDay={onBeginNext} />
      </div>
    );
  }

  const timeline =
    state.current_day === 3
      ? DAY3_TIMELINE
      : state.current_day === 2
      ? DAY2_TIMELINE
      : DAY1_TIMELINE;

  return (
    <div data-testid="lc-app" className="flex min-h-screen flex-col bg-[#f5ebd7]">
      <Header
        day={state.current_day}
        internName={state.intern_name}
        tab={tab}
        onTabChange={setTab}
        unreadFeed={state.feedUnread}
        unreadDms={state.dmUnread}
      />
      <main className="flex-1 overflow-hidden">
        <div className="mx-auto h-[calc(100vh-130px)] max-w-5xl">
          {tab === "chat" && (
            <TeamChat
              key={`day-${state.current_day}`}
              state={state}
              setState={setState}
              timeline={timeline}
              onTimelineFinished={goToReflection}
            />
          )}
          {tab === "feed" && <DiscoveryFeed state={state} setState={setState} />}
          {tab === "dms" && (
            <DMs
              state={state}
              setState={setState}
              onReturnToChat={() => setTab("chat")}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return <ErrorBoundary><AppInner /></ErrorBoundary>;
}
