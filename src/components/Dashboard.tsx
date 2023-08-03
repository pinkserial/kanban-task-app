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
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import useBoardsStore from "@hooks/useBoards";
import NewColumn from "./NewColumn";

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
  const reorder = useBoardsStore((state) => state.reorder);
  const move = useBoardsStore((state) => state.move);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const srcColIndex = +source.droppableId;
    const destColIndex = +destination.droppableId;

    if (srcColIndex === destColIndex) {
      reorder(srcColIndex, source.index, destination.index);
    } else {
      move(srcColIndex, destColIndex, source.index, destination.index);
    }
  };

  if (!board) {
    return <NoBoard />;
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Contents
        open={sidebarOpen}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Toolbar />
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2} sx={{ flex: 1 }}>
            {board.columns.map((column, index) => (
              <Grid key={index} item xs>
                <Column index={index} column={column} />
              </Grid>
            ))}
            <Grid item xs>
              <NewColumn />
            </Grid>
          </Grid>
        </DragDropContext>
      </Contents>
      <Fab open={sidebarOpen} onClick={() => setSidebarOpen(true)} />
    </Box>
  );
}
