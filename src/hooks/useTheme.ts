import type { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { create } from "zustand";

interface ThemeState {
  mode: PaletteMode;
  toggle: (v: PaletteMode) => void;
}

const useThemeMode = create<ThemeState>((set) => ({
  mode: "light",
  toggle: () =>
    set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
}));

export default function useTheme() {
  const { mode, toggle } = useThemeMode();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#635fc7",
      },
    },
  });

  return { theme, toggle };
}
