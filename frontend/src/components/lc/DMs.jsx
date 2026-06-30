import React, { useState } from "react";
import { CHARACTERS } from "../../lib/lcState";
import { Avatar } from "./Avatar";

export const DMs = ({ state, setState, onReturnToChat }) => {
  const [openWho, setOpenWho] = useState(null);

  const openThread = (who) => {
    setOpenWho(who);
    setState((s) =>
      s.dmUnread[who] === 0
        ? s
        : { ...s, dmUnread: { ...s.dmUnread, [who]: 0 } }
    );
  };

  return (
    <div data-testid="lc-dms" className="flex h-full">
      <div
        className={[
          "w-full overflow-y-auto border-[#c9a96e] sm:w-72 sm:border-r",
          openWho ? "hidden sm:block" : "block",
        ].join(" ")}
      >
        <ul className="divide-y divide-[#c9a96e]/40">
          {Object.values(CHARACTERS).map((c) => {
            const unread = state.dmUnread[c.key];
            const last = state.dms[c.key].at(-1);
            return (
              <li key={c.key}>
                <button
                  data-testid={`lc-dm-thread-${c.key}`}
                  onClick={() => openThread(c.key)}
                  className={[
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#fff3d6]",
                    openWho === c.key ? "bg-[#fff3d6]" : "",
                  ].join(" ")}
                >
                  <Avatar who={c.key} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate font-serif text-[14px] font-semibold text-[#3b2412]">
                        {c.short}
                      </div>
                      {unread > 0 && (
                        <span
                          data-testid={`lc-dm-unread-${c.key}`}
                          className="inline-flex h-2.5 w-2.5 rounded-full bg-[#b8410e]"
                        />
                      )}
                    </div>
                    <div className="truncate text-[12px] text-[#8a6a3d]">
                      {last ? last.text : `${c.role}`}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={["flex-1 overflow-y-auto bg-[#f5ebd7]", openWho ? "fixed inset-0 z-50 sm:static sm:z-auto" : "hidden sm:block"].join(" ")}>
        {!openWho ? (
          <div className="flex h-full items-center justify-center p-8 text-center text-[#8a6a3d]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
                Direct Messages
              </div>
              <div className="mt-1 font-serif text-lg text-[#3b2412]">
                Select a teammate to read their thread
              </div>
            </div>
          </div>
        ) : (
          <Thread
            who={openWho}
            messages={state.dms[openWho]}
            onBack={() => setOpenWho(null)}
            onReturnToChat={onReturnToChat}
          />
        )}
      </div>
    </div>
  );
};

const Thread = ({ who, messages, onBack, onReturnToChat }) => {
  const c = CHARACTERS[who];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-[#c9a96e]/60 bg-[#fff7e6] px-4 py-3">
        <button
          data-testid="lc-dm-back-btn"
          onClick={onBack}
          className="rounded-md px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a6a3d] hover:bg-[#fff3d6] sm:hidden"
        >
          ← Back
        </button>
        <Avatar who={who} size={36} />
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[15px] font-semibold text-[#3b2412]">{c.name}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a6a3d]">
            {c.role}
          </div>
        </div>
        <button
          data-testid="lc-return-to-team-chat-btn"
          onClick={onReturnToChat}
          className="rounded-full bg-[#8b4513] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#fdf6e3] hover:bg-[#7a3b10]"
        >
          Return to Team Chat
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
        {messages.length === 0 ? (
          <div className="text-center text-[13px] text-[#8a6a3d]">No messages yet.</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="flex items-end gap-2">
              <Avatar who={m.from} size={28} />
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#fff7e6] px-3.5 py-2 text-[14px] text-[#3b2412] shadow-sm">
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
