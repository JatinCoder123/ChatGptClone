import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import MediaCard from "./MediaCard";
import ShimmerGrid from "./SimmerGrid";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFavStatus,
  mediaAction,
  removeMedia,
} from "../store/slices/mediaSlice";
import { toast } from "react-toastify";

const ExploreComponent = ({ mediaItems, loading, title }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all | image | video
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userMedia, message, error } = useSelector((state) => state.media);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // ✅ Filter media based on selected type
  const filteredMedia = useMemo(() => {
    if (filterType === "all") return mediaItems;
    return mediaItems?.filter(
      (media) => media.type?.toLowerCase() === filterType
    );
  }, [mediaItems, filterType]);

  // ✅ Split items into two columns for large screens
  const column1 = filteredMedia?.filter((_, index) => index % 2 === 0);
  const column2 = filteredMedia?.filter((_, index) => index % 2 === 1);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Image", value: "image" },
    { label: "Video", value: "video" },
  ];
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(mediaAction.resetMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(mediaAction.clearAllErrors());
    }
  }, [error, message, dispatch]);

  return (
    <div className="bg-[var(--background)] overflow-auto custom-scrollbar">
      <div className="max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
        >
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            {title}
          </h1>

          {/* Filter Buttons */}
          <div className="flex space-x-3">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  filterType === option.value
                    ? "bg-[var(--accent-primary)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--muted-foreground)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid Layout */}
        {loading ? (
          <ShimmerGrid />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Single column for mobile */}
            <div className="lg:hidden space-y-4">
              {filteredMedia?.map((media) => (
                <MediaCard
                  key={media.media_id}
                  media={media}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onDelete={(id, url) =>
                    dispatch(removeMedia(id, url, userMedia, user.id))
                  }
                  onToggleFav={(id, newStatus) =>
                    dispatch(changeFavStatus(id, newStatus, userMedia, user.id))
                  }
                />
              ))}
            </div>

            {/* Two columns for large screens */}
            <div className="hidden lg:block space-y-4">
              {column1?.map((media) => (
                <MediaCard
                  key={media.media_id}
                  media={media}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onDelete={(id, url) =>
                    dispatch(removeMedia(id, url, userMedia, user.id))
                  }
                  onToggleFav={(id, newStatus) =>
                    dispatch(changeFavStatus(id, newStatus, userMedia, user.id))
                  }
                />
              ))}
            </div>
            <div className="hidden lg:block space-y-4">
              {column2?.map((media) => (
                <MediaCard
                  key={media.media_id}
                  media={media}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onDelete={(id, url) =>
                    dispatch(removeMedia(id, url, userMedia, user.id))
                  }
                  onToggleFav={(id, newStatus) =>
                    dispatch(changeFavStatus(id, newStatus, userMedia, user.id))
                  }
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExploreComponent;
