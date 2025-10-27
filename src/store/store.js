// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.js";
import modelReducer from "./slices/ModelSlice.js";
import userReducer from "./slices/userSlice.js";
import mediaReducer from "./slices/mediaSlice.js";
import messageReducer from "./slices/messageSlice.js";
import chatsReducer from "./slices/chatSlice.js";
import avatarReducer from "./slices/AvatarSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    model: modelReducer,
    user: userReducer,
    messages: messageReducer,
    chats: chatsReducer,
    media: mediaReducer,
    avatar: avatarReducer,
  },
});
