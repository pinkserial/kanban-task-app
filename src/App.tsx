import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useTheme from "@hooks/useTheme";
import useBoardStore from "@hooks/useBoards";
import Dashboard from "@components/Dashboard";
import NoBoard from "@components/NoBoard";

function App() {
  const { theme } = useTheme();
  const [boards, setActiveBoard] = useBoardStore((state) => [
    state.boards,
    state.setActive,
  ]);

  let activeboard = boards.find((board) => board.isActive);

  if (boards.length > 0 && !activeboard) {
    setActiveBoard(0);
    activeboard = boards[0];
  }

  console.log(activeboard);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {activeboard ? <Dashboard board={activeboard} /> : <NoBoard />}
    </ThemeProvider>
  );
}

export default App;
