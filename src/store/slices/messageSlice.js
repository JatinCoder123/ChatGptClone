import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { act } from "react";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    message: null,
    error: null,
  },
  reducers: {
    messageRequest(state) {
      state.loading = true;
    },
    messageResponse(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    getMessagesRequest(state) {
      state.loading = true;
      state.message = null;
    },
    getMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
      state.message = true;
    },
    getMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    addMessage(state, action) {
      state.messages = action.payload;
    },
    UpdateMessages(state, action) {
      state.messages = action.payload;
    },
    resetMessage(state) {
      state.message = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
});

export const sendChat = (
  messages,
  message,
  files = [],
  images = [],
  userId,
  chatId,
  model
) => {
  return async (dispatch) => {
    dispatch(messageSlice.actions.messageRequest());

    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("model", model);

      // Append files
      files.forEach((file, idx) => {
        formData.append(`file_${idx}`, file); // key can be anything
      });

      // Append images
      images.forEach((img, idx) => {
        formData.append(`image_${idx}`, img); // key should contain "image" so PHP detects it
      });
      const { data } = await axios.post(
        `${BACKEND_URL}?controller=chat&action=send&user_id=${userId}${
          chatId ? `&chat_id=${chatId}` : ""
        }`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // ✅ correct for FormData
          },
        }
      );
      console.log("chat response", data);
      let aiResponse;
      if (!data.response.success) {
        aiResponse = {
          id: Date.now().toString() + Math.random().toString(36).substring(2),
          message: [
            {
              type: "text",
              content: "Some Error",
            },
          ],
          isUser: false,
          model: model,
        };
      } else {
        aiResponse = {
          id: Date.now().toString() + Math.random().toString(36).substring(2),
          message: data.response.answer,
          isUser: false,
          model: model,
        };
      }

      dispatch(messageSlice.actions.messageResponse([...messages, aiResponse]));
      dispatch(messageSlice.actions.setMessage(data.chat_id));
    } catch (error) {
      console.log("error", error);
      const aiResponse = {
        id: Date.now().toString(),
        message: [
          {
            type: "text",
            content: "some error",
          },
        ],
        isUser: false,
        model: model,
      };
      dispatch(messageSlice.actions.messageResponse([...messages, aiResponse]));
    }
  };
};
export const getMessages = (chatId) => {
  return async (dispatch) => {
    dispatch(messageSlice.actions.getMessagesRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_URL}?controller=chat&action=getChatHistory&chat_id=${chatId}`,

        {
          withCredentials: true,
        }
      );
      console.log("Get Messages", data.messages);
      dispatch(
        messageSlice.actions.getMessagesSuccess(JSON.parse(data.messages))
      );
    } catch (error) {
      console.log(error);
      dispatch(messageSlice.actions.getMessagesFailed(error));
    }
  };
};

export const messagesAction = messageSlice.actions;
export default messageSlice.reducer;
