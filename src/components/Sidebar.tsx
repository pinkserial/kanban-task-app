import HideSidebarIcon from "@icons/HideSidebarIcon";
import styled from "@mui/material/styles/styled";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import LogoIcon from "@icons/LogoIcon";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BoardIcon from "@icons/BoardIcon";
import Box from "@mui/material/Box";
import SunIcon from "@icons/SunIcon";
import Switch from "@mui/material/Switch";
import MoonIcon from "@icons/MoonIcon";
import Button from "@mui/material/Button";

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
  width: number;
}

const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme, open, width }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Sidebar({
  open,
  drawerWidth,
  setOpen,
}: {
  open: boolean;
  drawerWidth: number;
  setOpen: (v: boolean) => void;
}) {
  return (
    <Drawer variant="permanent" open={open} width={drawerWidth}>
      <Toolbar
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link href="/">
          <LogoIcon />
        </Link>
      </Toolbar>
      <Typography align="center">All boards</Typography>
      <List sx={{ flex: 1 }}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <BoardIcon />
            </ListItemIcon>
            <ListItemText primary="Platform Launch" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <BoardIcon />
            </ListItemIcon>
            <ListItemText primary="Platform Launch" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <BoardIcon />
            </ListItemIcon>
            <ListItemText primary="Platform Launch" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box
        sx={{
          mx: 2,
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "lightgreen",
          borderRadius: "5px",
        }}
      >
        <SunIcon />
        <Switch />
        <MoonIcon />
      </Box>
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
          onClick={() => setOpen(!open)}
        >
          <Typography fontWeight="bold">Hide Sidebar</Typography>
        </Button>
      </Box>
    </Drawer>
  );
}
