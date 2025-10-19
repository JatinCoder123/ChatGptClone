import React, { useEffect } from "react";
import ExploreComponent from "@/Components/ExploreComponent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getFavUserMedia, mediaAction } from "../../store/slices/mediaSlice";

function FavMedia() {
  const { user } = useSelector((state) => state.user);
  const { userFavMedia, loading, error } = useSelector((state) => state.media);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(user).length > 0 && userFavMedia.length == 0)
      dispatch(getFavUserMedia("all", user.id));
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(mediaAction.clearAllErrors());
    }
  }, [loading, error, dispatch]);
  return (
    <>
      <ExploreComponent
        mediaItems={userFavMedia}
        loading={loading}
        title={"My Favourite"}
      />
    </>
  );
}
export default FavMedia;
