import { useState } from "react";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import Column from "@components/Column";
import Box from "@mui/material/Box";
import Fab from "./Buttons/Fab";
import NoBoard from "./NoBoard";
import useBoard from "@hooks/useBoard";

const Contents = styled("main")<{
  open: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: "300px",
  }),
}));

export default function Dashboard() {
  const board = useBoard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!board) {
    return <NoBoard />;
  }

  return (
    <Box>
      <Header />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Contents open={sidebarOpen}>
        <Toolbar />
        <Grid container spacing={2}>
          {board.columns.map((column, idx) => (
            <Grid key={idx} item xs>
              <Column id={idx} column={column} />
            </Grid>
          ))}
        </Grid>
      </Contents>
      <Fab open={sidebarOpen} onClick={() => setSidebarOpen(true)} />
    </Box>
  );
}
