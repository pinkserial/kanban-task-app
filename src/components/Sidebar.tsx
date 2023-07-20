import HideSidebarIcon from "@icons/HideSidebarIcon";
import styled from "@mui/material/styles/styled";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BoardIcon from "@icons/BoardIcon";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import { useBoardStore } from "@hooks/useBoards";
import ThemeToggle from "@components/ThemeToggle";

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
}

const Drawer = styled(MuiDrawer)<DrawerProps>({
  width: "300px",
  boxSizing: "border-box",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "300px",
    boxSizing: "border-box",
  },
});

const BoardListHeader = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  textTransform: "uppercase",
  letterSpacing: theme.spacing(0.2),
  fontWeight: "bold",
  textAlign: "center",
}));

function BoardItem({ board }: { board: Board }) {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <BoardIcon />
        </ListItemIcon>
        <ListItemText
          primary={<Typography fontWeight="bold">{board.name}</Typography>}
        />
      </ListItemButton>
    </ListItem>
  );
}

function BoardList({ boards }: { boards: Board[] }) {
  return (
    <List sx={{ flex: 1 }}>
      {boards.map((board) => (
        <BoardItem board={board}></BoardItem>
      ))}
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <BoardIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography fontWeight="bold" noWrap>
                + Create New Board
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default function Sidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const { boards } = useBoardStore();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        zIndex: 0,
      }}
    >
      <Toolbar />
      <BoardListHeader variant="subtitle2">All boards</BoardListHeader>
      <BoardList boards={boards} />
      <ThemeToggle />
      <Box
        sx={{
          my: 1,
          mx: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          startIcon={<HideSidebarIcon />}
          onClick={onToggle}
        >
          <Typography fontWeight="bold">Hide Sidebar</Typography>
        </Button>
      </Box>
    </Drawer>
  );
}
