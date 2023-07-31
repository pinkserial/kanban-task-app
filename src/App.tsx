import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useTheme from "@hooks/useTheme";
import Dashboard from "@components/Dashboard";
import useBoardsStore from "@hooks/useBoards";
import { useEffect } from "react";
import BoardContext from "@contexts/board";

function App() {
  const { theme } = useTheme();
  const boards = useBoardsStore((state) => state.boards);
  const setActive = useBoardsStore((state) => state.setActive);
  const activeboard = boards.find((board) => board.isActive);

  useEffect(() => {
    if (boards.length > 0 && !activeboard) {
      setActive(0);
    }
  }, [activeboard, boards.length, setActive]);

  useEffect(() => {
    if (activeboard) {
      document.title = activeboard.name;
    }
  }, [activeboard]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BoardContext.Provider value={activeboard}>
        <Dashboard />
      </BoardContext.Provider>
    </ThemeProvider>
  );
}

export default App;
