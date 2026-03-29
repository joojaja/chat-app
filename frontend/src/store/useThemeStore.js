import { create } from "zustand";

// Zustand store for managing the theme state that the user has chosen, with persistence in localStorage
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));