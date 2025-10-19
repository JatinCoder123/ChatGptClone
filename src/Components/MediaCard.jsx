import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Trash2, Heart, Download } from "lucide-react";

const MediaCard = ({
  media,
  hoveredId,
  setHoveredId,
  onDelete,
  onToggleFav,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isVideo = media.type === "video";

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(media.media_id, media.media_url);
  };

  const handleFavorite = () => {
    setMenuOpen(false);
    onToggleFav(media.media_id, !media.isFav);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = media.media_url;
    link.download = media.media_url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMenuOpen(false);
  };

  return (
    <motion.div
      className="relative group cursor-pointer mb-4 overflow-hidden rounded-2xl"
      onMouseEnter={() => setHoveredId(media.media_id)}
      onMouseLeave={() => {
        setHoveredId(null);
        setMenuOpen(false);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* 🩶 Shimmer Placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-[var(--surface)] animate-pulse" />
      )}

      {/* 🖼️ Image or 🎥 Video */}
      {isVideo ? (
        <video
          src={media.media_url}
          onLoadedData={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          muted
          autoPlay
          loop
        />
      ) : (
        <img
          src={media.media_url}
          alt={media.prompt}
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* 🖤 Dark Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: hoveredId === media.media_id ? 0.3 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute inset-0 bg-black z-10"
      />

      {/* ❤️ Fav Icon when isFav true */}
      {media.isFav == 1 && (
        <motion.div
          className="absolute top-3 left-3 z-30 bg-black/50 p-1 rounded-full backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Heart size={24} color="#ef4444" fill="#ef4444" />
        </motion.div>
      )}

      {/* ⋮ Three Dots Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredId === media.media_id ? 1 : 0,
          scale: hoveredId === media.media_id ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-3 right-3 z-30"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition"
        >
          <MoreVertical color="#fff" size={20} />
        </button>

        {/* 🧭 Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-[var(--surface)] rounded-lg shadow-lg overflow-hidden text-white w-36 border border-white/10 backdrop-blur-lg"
            >
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={handleFavorite}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10"
              >
                <Heart
                  size={16}
                  color={media.isFav ? "#ef4444" : "#fff"}
                  fill={media.isFav ? "#ef4444" : "none"}
                />
                {media.isFav ? "Unfavorite" : "Favorite"}
              </button>
              <button
                onClick={handleDownload}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10"
              >
                <Download size={16} /> Download
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ✨ Text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: hoveredId === media.media_id ? 1 : 0,
          y: hoveredId === media.media_id ? 0 : 20,
        }}
        transition={{
          delay: hoveredId === media.media_id ? 0.15 : 0,
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 bg-gradient-to-t from-black/60 to-transparent"
      >
        <h3 className="text-xl font-semibold mb-2">
          {media.prompt?.substring(0, 30)}
        </h3>
        <p className="text-sm text-gray-200 ">{media.prompt}</p>
      </motion.div>
    </motion.div>
  );
};

export default MediaCard;
