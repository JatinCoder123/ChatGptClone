import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAvatarStatus } from "../store/slices/AvatarSlice";

function AvatarGen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    progress,
    currentJobId,
    avatarJobIdLoading,
    currentStatus,
    statusCheking,
  } = useSelector((state) => state.avatar);

  // ✅ Check job status while job ID exists
  useEffect(() => {
    if (currentJobId) {
      dispatch(checkAvatarStatus(currentJobId, user.id));
    }
  }, [avatarJobIdLoading, currentJobId, dispatch]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      {/* ⏳ Show status while video is generating */}
      {(avatarJobIdLoading || statusCheking) && (
        <div className="w-full max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
            🎬 Video generation in progress...
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Status: {currentStatus || "Processing..."}
          </p>

          {/* 🔵 Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-sm">
            <div
              className="bg-blue-600 h-3 transition-all duration-500 ease-in-out"
              style={{ width: `${progress || 0}%` }}
            ></div>
          </div>

          <div className="mt-2 text-sm font-medium text-gray-700">
            {Math.round(progress || 0)}%
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarGen;
