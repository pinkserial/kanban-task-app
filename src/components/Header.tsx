// React
import { useState } from "react";

// MUI
import { SxProps, Theme } from "@mui/material";

// MUI Components
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// Custom Components
import AddTask from "@components/Modals/tasks/AddTask";
import DeleteBoard from "@components/Modals/boards/DeleteBoard";

// Icons
import LogoIcon from "@icons/LogoIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

// hooks
import useBoard from "@hooks/useBoard";

function AppBar({ children }: { children: React.ReactNode }) {
  const style: SxProps<Theme> = {
    zIndex: (t) => t.zIndex.drawer + 1,
    backgroundColor: (t) => t.palette.background.default,
  };

  return (
    <MuiAppBar sx={style} position="fixed" enableColorOnDark>
      <Toolbar>{children}</Toolbar>
    </MuiAppBar>
  );
}

function Logo() {
  const style: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
    width: "275px",
  };

  return (
    <Box sx={style}>
      <Link sx={{ p: 1 }} href="/">
        <LogoIcon />
      </Link>
    </Box>
  );
}

function Title() {
  const board = useBoard() as Board;

  return (
    <Typography
      sx={{ flex: 1 }}
      fontWeight="bold"
      fontSize="1.5rem"
      color="text.primary"
    >
      {board.name}
    </Typography>
  );
}

function MoreMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography>Edit Board</Typography>} />
        </MenuItem>
        <MenuItem>
          <DeleteBoard />
        </MenuItem>
      </Menu>
    </>
  );
}

export default function Header() {
  return (
    <AppBar>
      <Logo />
      <Title />
      <Box>
        <AddTask />
        <MoreMenu />
      </Box>
    </AppBar>
  );
}
