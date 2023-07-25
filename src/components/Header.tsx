import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import LogoIcon from "@icons/LogoIcon";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MoreIcon from "@icons/MoreIcon";
import AddNewTaskButton from "./Buttons/AddNewTaskButton";
import AddNewTaskModal from "./Modals/AddNewTaskDialog";
import { useState } from "react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${240}px)`,
    marginLeft: `${240}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const LogoLink = styled(Link)(({ theme }) => ({
  paddingInline: theme.spacing(5),
}));

function Logo() {
  return (
    <LogoLink sx={{ boxSizing: "border-box", width: "300px" }} href="/">
      <LogoIcon />
    </LogoLink>
  );
}

export default function Header({ board }: { board: Board }) {
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        backgroundColor: (t) => t.palette.background.default,
      }}
    >
      <Toolbar>
        <Logo />
        <Typography
          sx={{
            flex: 1,
            fontWeight: "bold",
          }}
          variant="h6"
          noWrap
          color={(t) => t.palette.text.primary}
        >
          {board.name}
        </Typography>
        <Box>
          <AddNewTaskButton onClick={() => setOpen(true)} />
          <IconButton>
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <AddNewTaskModal
        open={open}
        board={board}
        onClose={() => setOpen(false)}
      />
    </AppBar>
  );
}
