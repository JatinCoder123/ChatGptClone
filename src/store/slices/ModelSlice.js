import { createSlice } from "@reduxjs/toolkit";
const initialModel = localStorage.getItem("model") || "GPT-4";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    model: initialModel,
  },
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload;
      localStorage.setItem("model", state.model);
    },
  },
});

export const modelAction = modelSlice.actions;
export default modelSlice.reducer;
