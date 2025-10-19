import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const avatarSlice = createSlice({
  name: "avatar",
  initialState: {
    loading: false,
    avatar: null,
    error: null,
    progress: 0,
    currentJobId: null,
    avatarJobIdLoading: false,
    currentStatus: null,
    statusCheking: false,
    message: null,
  },
  reducers: {
    getAvatarRequest(state) {
      state.loading = true;
      state.avatar = state.avatar;
      state.error = null;
    },
    getAvatarSuccess(state, action) {
      state.loading = false;
      state.avatar = action.payload;
      state.error = null;
    },
    getAvatarFailed(state, action) {
      state.loading = false;
      state.avatar = state.avatar;
      state.error = action.payload;
    },
    deleteAvatarRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteAvatarSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.avatar = null;
      state.error = null;
    },
    deleteAvatarFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    createAvatarJobIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.currentJobId = null;
      state.videoJobIdLoading = true;
      state.progress = 5;
    },
    createAvatarJobIdSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.currentJobId = action.payload;
      state.videoJobIdLoading = false;
      state.progress = 15;
    },
    createAvatarJobIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.currentJobId = null;
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
    avatarIsReady(state, action) {
      state.loading = false;
      state.error = null;
      state.progress = 100;
      state.avatar = action.payload;
      state.currentJobId = null;
      state.statusCheking = false;
    },
    avatarGenFailed(state, action) {
      state.loading = false;
      state.currentJobId = null;
      state.error = action.payload;
      state.statusCheking = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetStatus(state) {
      state.currentStatus = null;
    },
  },
});

export const getAvatar = (userId) => {
  return async (dispatch) => {
    dispatch(avatarSlice.actions.getAvatarRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=avatar&action=getAvatar&user_id=${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Avatar", data);
      dispatch(avatarSlice.actions.getAvatarSuccess(data.avatar));
      dispatch(avatarSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        avatarSlice.actions.getAvatarFailed(error.response?.data?.message)
      );
    }
  };
};

export const removeAvatar = (avatarId, userId) => {
  return async (dispatch) => {
    dispatch(avatarSlice.actions.deleteAvatarRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=avatar&action=removeAvatar&avatar_id=${avatarId}&user_id=${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("After Deletion", data);
      dispatch(avatarSlice.actions.deleteAvatarSuccess(data.message));
      dispatch(avatarSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        avatarSlice.actions.deleteAvatarFailed(error.response?.data?.message)
      );
    }
  };
};

export const createAvatarJobId = (formData, userId) => {
  return async (dispatch) => {
    dispatch(avatarSlice.actions.createAvatarJobIdRequest());

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}?controller=avatar&action=generate&user_id=${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // ✅ correct for FormData
          },
        }
      );
      console.log("Created Job", data);
      dispatch(avatarSlice.actions.createAvatarJobIdSuccess(data.job_id));
      dispatch(avatarSlice.actions.clearAllErrors());
    } catch (error) {
      console.log(error);
      dispatch(
        avatarSlice.actions.createAvatarJobIdFailed(
          error.response?.data?.message
        )
      );
    }
  };
};
export const checkAvatarStatus = (jobId) => {
  return async (dispatch) => {
    dispatch(avatarSlice.actions.startChekingStatus());
    let pollCount = 0;

    const pollInterval = setInterval(async () => {
      pollCount++;
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}?controller=avatar&action=avatarStatus&jobId=${jobId}`,
          {
            withCredentials: true,
          }
        );
        console.log(`status of video  ${data.status}`);
        if (data.success) {
          let progress = 20 + pollCount * 3;
          if (data.status === "running") {
            progress = Math.max(progress, 40);
            dispatch(avatarSlice.actions.updateStatus(data.status));
            dispatch(avatarSlice.actions.updateProgress(progress));
          }
          if (data.status === "succeeded") {
            clearInterval(pollInterval);
            dispatch(avatarSlice.actions.avatarIsReady(data.avatarInfo));
          } else if (data.status === "failed" || data.error) {
            clearInterval(pollInterval);
            console.log("Failed To Generate avatar");
            dispatch(avatarSlice.actions.avatarGenFailed(data.error));
          }
        } else {
          clearInterval(pollInterval);
          console.log("Failed To Generate avatar");
          dispatch(
            avatarSlice.actions.avatarGenFailed("Failed To Generate avatar")
          );
        }
      } catch (error) {
        clearInterval(pollInterval);
        console.log("Failed To Generate avatar");
        dispatch(
          avatarSlice.actions.avatarGenFailed(error.response?.data?.error)
        );
      }
    }, 1000);
  };
};

export const avatarAction = avatarSlice.actions;
export default avatarSlice.reducer;
