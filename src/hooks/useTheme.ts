import type { PaletteMode, ThemeOptions } from "@mui/material";
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

const themeOption: ThemeOptions = {
  typography: {
    fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#635fc7",
    },
  },
};

export default function useTheme() {
  const { mode, toggle } = useThemeMode();

  const theme = createTheme({
    ...themeOption,
    palette: {
      ...themeOption.palette,
      mode,
    },
  });

  return { theme, toggle };
}
