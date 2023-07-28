import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import LogoIcon from "@icons/LogoIcon";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MoreIcon from "@icons/MoreIcon";
import AddNewTaskButton from "./Buttons/AddNewTaskButton";
import AddTask from "./Modals/AddTask";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteBoard from "./Modals/DeleteBoard";
import useBoardStore from "@hooks/useBoards";

const LogoLink = styled(Link)(({ theme }) => ({
  padding: theme.spacing(1),
}));

function Logo() {
  return (
    <LogoLink href="/">
      <LogoIcon />
    </LogoLink>
  );
}

export default function Header({ board }: { board: Board }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const [deleteBoardOpen, setDeleteBoardOpen] = useState(false);

  const deleteBoard = useBoardStore((state) => state.deleteBoard);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "275px",
          }}
        >
          <Logo />
        </Box>

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
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreIcon />
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
            <MenuItem onClick={() => setDeleteBoardOpen(true)}>
              <ListItemIcon>
                <DeleteIcon color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="warning.main">Delete Board</Typography>
                }
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <AddTask open={open} board={board} onClose={() => setOpen(false)} />
      <DeleteBoard
        isOpen={deleteBoardOpen}
        title={board.name}
        onDelete={() => deleteBoard()}
        onClose={() => setDeleteBoardOpen(false)}
      />
    </AppBar>
  );
}
