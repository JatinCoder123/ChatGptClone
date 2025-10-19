import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BACKEND_URL } from "../constants";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    loading: false,
    chats: [],
    activeChat: null,
    isUpdated: false,
    error: null,
    isDelete: false,
  },
  reducers: {
    getChatsRequest(state) {
      state.loading = true;
      state.chats = [];
      state.error = null;
    },
    getChatsSuccess(state, action) {
      state.loading = false;
      state.chats = action.payload;
      state.error = null;
    },
    getChatsFailed(state, action) {
      state.loading = false;
      state.chats = [];
      state.error = action.payload;
    },
    chatUpdateRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
    },
    chatUpdateSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
    },

    chatUpdateFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    removeChatRequest(state) {
      state.loading = true;
      state.error = null;
    },
    removeChatSuccess(state, action) {
      state.loading = false;
      state.chats = action.payload;
      state.isDelete = true;
      state.error = null;
    },
    removeChatFailed(state, action) {
      state.loading = false;
      state.chats = action.payload;
    },
    resetUpdateAfterSuccessfullyUpdate(state) {
      state.isUpdated = false;
    },
    resetDeletedAfterSuccessfullyDelete(state) {
      state.isDelete = false;
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getChats = (userId) => {
  return async (dispatch) => {
    dispatch(chatSlice.actions.getChatsRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=chat&action=getChat&user_id=${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("All Chats", data);
      dispatch(chatSlice.actions.getChatsSuccess(data.chats));
      dispatch(chatSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(chatSlice.actions.getChatsFailed(error.response?.data?.message));
    }
  };
};
export const deleteChat = (chats, chatId) => {
  return async (dispatch) => {
    dispatch(chatSlice.actions.removeChatRequest());
    try {
      await axios.post(
        `${BACKEND_URL}?controller=chat&action=removeChat&chat_id=${chatId}`,
        {
          withCredentials: true,
        }
      );
      const newChats = chats.filter((chat) => chat.chat_id !== chatId);
      console.log(newChats);
      dispatch(chatSlice.actions.removeChatSuccess(newChats));
    } catch (error) {
      console.log("Chat Delete", error);
      dispatch(chatSlice.actions.removeChatFailed(chats));
    }
  };
};
export const updateChat = (chatId, title) => {
  return async (dispatch) => {
    dispatch(chatSlice.actions.chatUpdateRequest());

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}?controller=chat&action=updateChat&chatId=${chatId}`,
        title,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Updated chat", data);
      dispatch(chatSlice.actions.chatUpdateSuccess(data.response.answer));
      dispatch(chatSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        chatSlice.actions.chatUpdateFailed(error.response?.data?.message)
      );
    }
  };
};

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
