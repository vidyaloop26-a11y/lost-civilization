import React from "react";

export const Header = ({ day = 1, internName, tab, onTabChange, unreadFeed, unreadDms, showTabs = true }) => {
  const totalDmUnread = unreadDms
    ? Object.values(unreadDms).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <header
      data-testid="lc-header"
      className="sticky top-0 z-40 border-b border-[#c9a96e]/40 bg-[#f5ebd7]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <img
            data-testid="lc-logo"
            src="/vidyaloop-logo.png"
            alt="Vidyaloop"
            className="h-9 w-9 rounded-sm object-contain sm:h-10 sm:w-10"
          />
          <div className="leading-tight">
            <div className="font-serif text-base font-bold tracking-wide text-[#3b2412] sm:text-lg">
              Lost Civilization
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#8a6a3d] sm:text-xs">
              IARA · Junior Investigator
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            data-testid="lc-day-indicator"
            className="rounded-full border border-[#c9a96e] bg-[#fff7e6] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6b4423]"
          >
            Day {day}
          </div>
          {internName && (
            <div
              data-testid="lc-intern-name"
              className="hidden font-serif text-sm text-[#3b2412] sm:block"
            >
              {internName}
            </div>
          )}
        </div>
      </div>

      {showTabs && (
        <nav className="mx-auto flex max-w-5xl gap-1 border-t border-[#c9a96e]/30 px-2 sm:px-6">
          <TabBtn id="chat" active={tab === "chat"} onClick={() => onTabChange("chat")}>
            Team Chat
          </TabBtn>
          <TabBtn
            id="feed"
            active={tab === "feed"}
            onClick={() => onTabChange("feed")}
            badge={unreadFeed > 0 ? unreadFeed : undefined}
          >
            Discovery Feed
          </TabBtn>
          <TabBtn
            id="dms"
            active={tab === "dms"}
            onClick={() => onTabChange("dms")}
            badge={totalDmUnread > 0 ? totalDmUnread : undefined}
          >
            DMs
          </TabBtn>
        </nav>
      )}
    </header>
  );
};

const TabBtn = ({ id, active, onClick, children, badge }) => (
  <button
    data-testid={`lc-tab-${id}`}
    onClick={onClick}
    className={[
      "relative px-4 py-2.5 text-xs uppercase tracking-[0.16em] transition-colors sm:text-[13px]",
      active
        ? "border-b-2 border-[#8b4513] font-semibold text-[#3b2412]"
        : "border-b-2 border-transparent text-[#8a6a3d] hover:text-[#5a3a18]",
    ].join(" ")}
  >
    {children}
    {badge !== undefined && (
      <span
        data-testid={`lc-tab-${id}-badge`}
        className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#b8410e] px-1.5 text-[10px] font-bold text-[#fff7e6]"
      >
        {badge}
      </span>
    )}
  </button>
);
