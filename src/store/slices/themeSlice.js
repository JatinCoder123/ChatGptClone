import { createSlice } from "@reduxjs/toolkit";

// Get initial theme from localStorage or default to light
const initialTheme = localStorage.getItem("theme") || "dark";

// Apply it to <html> immediately
document.documentElement.setAttribute("data-theme", initialTheme);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialTheme, // "light" or "dark"
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.mode);
      localStorage.setItem("theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      document.documentElement.setAttribute("data-theme", state.mode);
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
