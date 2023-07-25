import HideIcon from "@icons/HideIcon";
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
import ThemeToggle from "@components/ThemeToggle";
import useBoardStore from "@hooks/useBoards";

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
}

export const DrawerWidth = "300px";

const Drawer = styled(MuiDrawer)<DrawerProps>({
  width: DrawerWidth,
  boxSizing: "border-box",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DrawerWidth,
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
      {boards.map((board, idx) => (
        <BoardItem key={idx} board={board}></BoardItem>
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
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) {
  const boards = useBoardStore((state) => state.boards);

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
        <Button variant="text" startIcon={<HideIcon />} onClick={handleClick}>
          <Typography fontWeight="bold">Hide Sidebar</Typography>
        </Button>
      </Box>
    </Drawer>
  );
}
