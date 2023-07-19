import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(
  ({ theme, open, drawerWidth }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default function Header({
  open,
  title,
  drawerWidth,
}: {
  open: boolean;
  title: string;
  drawerWidth: number;
}) {
  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
      <Toolbar>
        <Typography variant="h1" noWrap>
          ${title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
