import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useTheme from "@hooks/useTheme";
import useBoardStore from "@hooks/useBoards";
import Dashboard from "@components/Dashboard";
import NoBoard from "@components/NoBoard";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();
  const boards = useBoardStore((state) => state.boards);
  const setActive = useBoardStore((state) => state.setActive);
  const activeboard = boards.find((board) => board.isActive);

  useEffect(() => {
    if (boards.length > 0 && !activeboard) {
      setActive(0);
    }
  }, [activeboard, boards.length, setActive]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {activeboard ? <Dashboard board={activeboard} /> : <NoBoard />}
    </ThemeProvider>
  );
}

export default App;
