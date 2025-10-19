import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoUrl,
  checkVideoStatus,
  mediaAction,
} from "../store/slices/mediaSlice";

function VideoGen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    progress,
    currentJobId,
    currentGenerationId,
    videoJobIdLoading,
    currentStatus,
    generating,
    statusCheking,
  } = useSelector((state) => state.media);

  // ✅ Check job status while job ID exists
  useEffect(() => {
    if (currentJobId) {
      dispatch(checkVideoStatus(currentJobId));
    }
  }, [currentJobId, dispatch]);

  useEffect(() => {
    if (!videoJobIdLoading && currentGenerationId) {
      console.log(currentGenerationId);
      dispatch(getVideoUrl(currentGenerationId, user.id));
      dispatch(mediaAction.resetStatus(currentGenerationId));
    }
  }, [videoJobIdLoading, currentGenerationId, dispatch]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      {/* ⏳ Show status while video is generating */}
      {(videoJobIdLoading || statusCheking) && (
        <div className="w-full max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            🎬 Video generation in progress...
          </h2>
          <p className="text-sm text-gray-500 mb-4">
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

      {/* ✅ After video is generated */}
      {!videoJobIdLoading && generating && (
        <div className="text-green-600 font-semibold mt-6 text-lg">
          ✅ Video is generated successfully!
        </div>
      )}
    </div>
  );
}

export default VideoGen;
