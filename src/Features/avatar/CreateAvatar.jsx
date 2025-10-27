import { useDispatch, useSelector } from "react-redux";
import InputArea from "../../Components/InputArea";
import { avatarAction } from "../../store/slices/AvatarSlice";
import { toast } from "react-toastify";
import AvatarGen from "../../Components/AvatarGen";
import { useEffect } from "react";
import { motion } from "framer-motion";

const CreateAvatar = () => {
  const { loading, error, avatar } = useSelector((state) => state.avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(avatarAction.clearAllErrors());
    }
  }, [loading, error, dispatch]);
  return (
    <div className="flex flex-col items-center justify-center">
      {loading && <AvatarGen />}
      {avatar != null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full  flex items-center justify-center"
        >
          <video
            src={avatar}
            alt="Generated"
            className="max-h-[400px] max-w-[400px]  rounded-xl shadow-xl object-contain"
            controls
          ></video>
        </motion.div>
      )}
      <div className="fixed bottom-2">
        <InputArea avatar={true} />
      </div>
    </div>
  );
};
export default CreateAvatar;
