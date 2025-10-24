import React, { useEffect } from "react";
import ExploreComponent from "@/Components/ExploreComponent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserMedia, mediaAction } from "../../store/slices/mediaSlice";

function MyMedia() {
  const { user } = useSelector((state) => state.user);
  const { userMedia, mediaLoading, error } = useSelector(
    (state) => state.media
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(user).length > 0 && userMedia.length == 0)
      dispatch(getUserMedia("all", user.id));
  }, [user]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(mediaAction.clearAllErrors());
    }
  }, [mediaLoading, error, dispatch, userMedia]);
  return (
    <>
      <ExploreComponent
        mediaItems={userMedia}
        loading={mediaLoading}
        title={"My media"}
      />
    </>
  );
}
export default MyMedia;
