import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    mediaLoading: false,
    loading: false,
    media: [],
    error: null,
    userMedia: [],
    userFavMedia: [],
    newCreatedMedia: null,
    progress: 0,
    currentJobId: null,
    currentGenerationId: null,
    videoJobIdLoading: false,
    currentStatus: null,
    statusCheking: false,
    currentStatus: null,
    generating: false,
    message: null,
  },
  reducers: {
    getMediaRequest(state) {
      state.mediaLoading = true;
      state.media = [];
      state.error = null;
    },
    getMediaSuccess(state, action) {
      state.mediaLoading = false;
      state.media = action.payload;
      state.error = null;
    },
    getMediaFailed(state, action) {
      state.mediaLoading = false;
      state.media = state.media;
      state.error = action.payload;
    },
    getUserMediaRequest(state) {
      state.mediaLoading = true;
      state.userMedia = [];
      state.error = null;
    },
    getUserMediaSuccess(state, action) {
      state.mediaLoading = false;
      state.userMedia = action.payload;
      state.error = null;
    },
    getUserMediaFailed(state, action) {
      state.mediaLoading = false;
      state.userMedia = state.userMedia;
      state.error = action.payload;
    },
    getUserFavMediaRequest(state) {
      state.mediaLoading = true;
      state.userFavMedia = [];
      state.error = null;
    },
    getUserFavMediaSuccess(state, action) {
      state.mediaLoading = false;
      state.userFavMedia = action.payload;
      state.error = null;
    },
    getUserFavMediaFailed(state, action) {
      state.mediaLoading = false;
      state.userFavMedia = state.userFavMedia;
      state.error = action.payload;
    },
    deleteMediaRequest(state) {
      state.mediaLoading = true;
      state.message = null;
      state.error = null;
    },
    deleteMediaSuccess(state, action) {
      state.mediaLoading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteMediaFailed(state, action) {
      state.mediaLoading = false;
      state.message = null;
      state.error = action.payload;
    },
    changeMediaFavStatusRequest(state) {
      state.mediaLoading = true;
      state.message = null;
      state.error = null;
    },
    changeMediaFavStatusSuccess(state, action) {
      state.mediaLoading = false;
      state.message = action.payload;
      state.error = null;
    },
    changeMediaFavStatusFailed(state, action) {
      state.mediaLoading = false;
      state.message = null;
      state.error = action.payload;
    },
    createMediaRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createMediaSuccess(state, action) {
      state.loading = false;
      state.newCreatedMedia = action.payload;
      state.error = null;
    },
    createMediaFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createVideoJobIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.currentJobId = null;
      state.currentGenerationId = null;
      state.videoJobIdLoading = true;
      state.progress = 5;
    },
    createVideoJobIdSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.currentJobId = action.payload;
      state.currentGenerationId = null;
      state.videoJobIdLoading = false;
      state.progress = 15;
    },
    createVideoJobIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.currentJobId = null;
      state.currentGenerationId = null;
      state.videoJobIdLoading = false;
    },
    startChekingStatus(state) {
      state.loading = state.loading;
      state.error = null;
      state.currentGenerationId = null;
      state.progress = 20;
      state.statusCheking = true;
    },
    updateStatus(state, action) {
      state.currentStatus = action.payload;
    },
    updateProgress(state, action) {
      state.progress = action.payload;
    },
    videoIsReady(state, action) {
      state.loading = state.loading;
      state.error = null;
      state.progress = 100;
      state.currentJobId = state.currentJobId;
      state.currentGenerationId = action.payload;
      state.statusCheking = false;
    },
    videoGenFailed(state, action) {
      state.loading = false;
      state.currentJobId = null;
      state.currentGenerationId = null;
      state.error = action.payload;
      state.statusCheking = false;
    },

    getVideoUrlRequest(state) {
      state.loading = state.loading;
      state.error = null;
      state.currentJobId = state.currentJobId;
      state.currentGenerationId = state.currentGenerationId;
      state.newCreatedMedia = null;
      state.generating = true;
    },
    getVideoUrlSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.newCreatedMedia = action.payload;
      state.currentGenerationId = null;
      state.generating = false;
    },
    getVideoUrlFailed(state, action) {
      state.loading = false;
      state.newCreatedMedia = null;
      state.error = action.payload;
      state.currentGenerationId = null;
      state.statusCheking = false;
      state.generating = false;
    },

    clearAllErrors(state) {
      state.error = null;
    },
    resetNewCreatedMedia(state) {
      state.newCreatedMedia = null;
    },
    resetStatus(state) {
      state.currentStatus = null;
    },
    resetMessage(state) {
      state.message = null;
    },
    setUserMedia(state, action) {
      state.userMedia = action.payload;
    },
  },
});

export const getMedia = (type) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.getMediaRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=media&action=getMedia&type=${type}&count=${5}`,
        {
          withCredentials: true,
        }
      );
      console.log("All media", data);
      dispatch(mediaSlice.actions.getMediaSuccess(data.media));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        mediaSlice.actions.getMediaFailed(error.response?.data?.message)
      );
    }
  };
};
export const getUserMedia = (type, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.getUserMediaRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=media&action=getMedia&type=${type}&count=${10}&user_id=${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("All media", data);
      dispatch(mediaSlice.actions.getUserMediaSuccess(data.data));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        mediaSlice.actions.getUserMediaFailed(error.response?.data?.message)
      );
    }
  };
};
export const getFavUserMedia = (type, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.getUserFavMediaRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=media&action=getFavMedia&count=${10}&user_id=${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("All Fav", data);
      dispatch(mediaSlice.actions.getUserFavMediaSuccess(data.data));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        mediaSlice.actions.getUserFavMediaFailed(error.response?.data?.message)
      );
    }
  };
};
export const removeMedia = (mediaId, mediaUrl, userMedia, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.deleteMediaRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=media&action=removeMedia&media_id=${mediaId}&user_id=${userId}&media_url=${mediaUrl}`,
        {
          withCredentials: true,
        }
      );
      console.log("After Deletion", data);
      const newUserMedia = userMedia.filter(
        (media) => media.media_id != mediaId
      );
      dispatch(mediaSlice.actions.setUserMedia(newUserMedia));
      dispatch(mediaSlice.actions.deleteMediaSuccess(data.message));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        mediaSlice.actions.deleteMediaFailed(error.response?.data?.message)
      );
    }
  };
};
export const changeFavStatus = (mediaId, isFav, userMedia, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.changeMediaFavStatusRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=media&action=changeFavStatus&media_id=${mediaId}&user_id=${userId}&isFav=${isFav}`,
        {
          withCredentials: true,
        }
      );
      console.log("After Fav Change", data);
      const newUserMedia = userMedia.map((media) => {
        if (media.media_id == mediaId) {
          media.isFav = isFav;
        }
      });
      dispatch(mediaSlice.actions.setUserMedia(newUserMedia));
      dispatch(mediaSlice.actions.changeMediaFavStatusSuccess(data.message));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        mediaSlice.actions.changeMediaFavStatusFailed(
          error.response?.data?.message
        )
      );
    }
  };
};
export const createMedia = (formData, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.createMediaRequest());
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}?controller=media&action=generate&user_id=${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Created Media", data);
      dispatch(mediaSlice.actions.createMediaSuccess(data.media_urls));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      console.log(error);
      dispatch(
        mediaSlice.actions.createMediaFailed(error.response?.data?.error)
      );
    }
  };
};
export const createVideoJobId = (formData, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.createVideoJobIdRequest());

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}?controller=media&action=generateJobId&user_id=${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // ✅ correct for FormData
          },
        }
      );
      console.log("Created Job", data);
      dispatch(mediaSlice.actions.createVideoJobIdSuccess(data.job_id));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      console.log(error);
      dispatch(
        mediaSlice.actions.createVideoJobIdFailed(error.response?.data?.message)
      );
    }
  };
};
export const checkVideoStatus = (jobId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.startChekingStatus());
    let pollCount = 0;

    const pollInterval = setInterval(async () => {
      pollCount++;
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}?controller=media&action=checkVideoStatus&job_id=${jobId}`,
          {
            withCredentials: true,
          }
        );
        console.log(`status of video  ${data.status}`);
        if (data.success) {
          let progress = 20 + pollCount * 3;
          if (data.status === "running" || data.status === "processing") {
            progress = Math.max(progress, 40);
          }
          if (data.status === "succeeded") {
            progress = 95;
            progress = Math.min(progress, 95);
          }
          dispatch(mediaSlice.actions.updateStatus(data.status));
          dispatch(mediaSlice.actions.updateProgress(progress));

          if (data.ready && data.status === "succeeded") {
            clearInterval(pollInterval);
            console.log("Gen Id in poll", data.generation_id);
            dispatch(mediaSlice.actions.videoIsReady(data.generation_id));
          } else if (data.status === "failed" || data.error) {
            clearInterval(pollInterval);
            console.log("Failed To Generate Video");
            dispatch(mediaSlice.actions.videoGenFailed(data.error));
          }
        } else {
          clearInterval(pollInterval);
          console.log("Failed To Generate Video");
          dispatch(
            mediaSlice.actions.videoGenFailed("Failed To Generate Video")
          );
        }
      } catch (error) {
        clearInterval(pollInterval);
        console.log("Failed To Generate Video");
        dispatch(
          mediaSlice.actions.videoGenFailed(error.response?.data?.error)
        );
      }
    }, 2000);
  };
};
export const getVideoUrl = (generateId, userId) => {
  return async (dispatch) => {
    dispatch(mediaSlice.actions.getVideoUrlRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=media&action=getVideoUrl&generation_id=${generateId}&user_id=${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(`Generated Video : ${data.videoUrl}`);
      dispatch(mediaSlice.actions.getVideoUrlSuccess(data.videoUrl));
      dispatch(mediaSlice.actions.clearAllErrors());
    } catch (error) {
      console.log(error);
      dispatch(
        mediaSlice.actions.getVideoUrlFailed(error.response?.data?.error)
      );
    }
  };
};

export const mediaAction = mediaSlice.actions;
export default mediaSlice.reducer;
