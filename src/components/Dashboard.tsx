import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import Column from "@components/Column";
import { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "./Buttons/Fab";

const Container = styled("main")<{
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

export default function Dashboard({ board }: { board: Board }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Header board={board} />
      <Sidebar open={open} handleClick={() => setOpen(false)} />
      <Container open={open}>
        <Toolbar />
        <Grid container spacing={2}>
          {board.columns.map((column, idx) => (
            <Grid key={idx} item xs>
              <Column column={column} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Fab open={open} handleClick={() => setOpen(true)} />
    </Box>
  );
}
