import InputArea from "../../Components/InputArea";
import DomeGallery from "../../Components/DomeGallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { mediaAction } from "../../store/slices/mediaSlice";
import LoadingShimmer from "../../Components/LoadingShimmer";
import { motion } from "framer-motion";
import VideoGen from "../../Components/VideoGen";
import { toast } from "react-toastify";

const CreatePage = () => {
  const dispatch = useDispatch();
  const { loading, error, newCreatedMedia } = useSelector(
    (state) => state.media
  );
  const [type, setType] = useState("image");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(mediaAction.clearAllErrors());
    }
  }, [loading, error, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading && type == "image" && <LoadingShimmer />}
      {loading && type == "video" && <VideoGen />}

      {newCreatedMedia != null && type == "image" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full  flex items-center justify-center"
        >
          <img
            src={newCreatedMedia}
            alt="Generated"
            className="max-h-[400px] max-w-[400px]  rounded-xl shadow-xl object-contain"
          />
        </motion.div>
      )}
      {newCreatedMedia != null && type == "video" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full  flex items-center justify-center"
        >
          <video
            src={newCreatedMedia}
            alt="Generated"
            className="max-h-[400px] max-w-[400px]  rounded-xl shadow-xl object-contain"
            controls
          ></video>
        </motion.div>
      )}
      {!loading && newCreatedMedia == null && (
        <div className="w-full h-screen flex items-center justify-center">
          <DomeGallery />
        </div>
      )}

      <div className="fixed bottom-2">
        <InputArea gen={true} setType={setType} />
      </div>
    </div>
  );
};

export default CreatePage;
