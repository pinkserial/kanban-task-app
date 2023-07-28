import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useTheme from "@hooks/useTheme";
import useBoardStore from "@hooks/useBoards";
import Dashboard from "@components/Dashboard";
import NoBoard from "@components/NoBoard";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

function App() {
  console.log("App Component rendered.");
  const { theme } = useTheme();
  const [boards, setActiveBoard] = useBoardStore(
    (state) => [state.boards, state.setActive],
    shallow
  );

  const activeboard = boards.find((board) => board.isActive);

  useEffect(() => {
    if (boards.length > 0 && !activeboard) {
      setActiveBoard(0);
    }
  }, [activeboard, setActiveBoard, boards.length]);
  // if (!activeboard && boards.length > 0) {
  //   console.log("setActiveboard");
  //   setActiveBoard(0);
  // }

  console.log("Activeboard", activeboard);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {activeboard ? <Dashboard board={activeboard} /> : <NoBoard />}
    </ThemeProvider>
  );
}

export default App;
