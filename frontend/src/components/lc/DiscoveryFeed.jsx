import React, { useEffect } from "react";
import { FeedCard } from "./FeedCard";

export const DiscoveryFeed = ({ state, setState }) => {
  // Mark feed unread = 0 when this tab opens
  useEffect(() => {
    setState((s) => (s.feedUnread === 0 ? s : { ...s, feedUnread: 0 }));
  }, []);

  const items = state.feedItems;

  return (
    <div
      data-testid="lc-discovery-feed"
      className="h-full overflow-y-auto px-4 py-5 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a05a1f]">
            IARA · Field Reports
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#3b2412]">
            Discovery Feed
          </h2>
          <p className="mt-1 text-[13px] text-[#8a6a3d]">
            Site reports, artifact entries, inscriptions, and historical reviews are
            logged here as the expedition uncovers them.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#c9a96e] bg-[#fff7e6] p-8 text-center text-[#8a6a3d]">
            No reports yet. New entries will appear as the expedition progresses.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <FeedCard key={idx} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
