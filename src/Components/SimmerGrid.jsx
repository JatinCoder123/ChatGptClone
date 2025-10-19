import React from "react";

const ShimmerGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-70 w-full rounded-xl bg-[var(--surface)] overflow-hidden relative"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-secondary)] via-[var(--surface)] to-[var(--background-secondary)] animate-[shimmer_1.5s_infinite]" />
        </div>
      ))}
    </div>
  );
};

export default ShimmerGrid;
