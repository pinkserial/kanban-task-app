import { useState } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import useTheme from "./hooks/useTheme";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FabButton from "@components/Fab";
import Zoom from "@mui/material/Zoom";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header title="Platform Launch" />
        <Sidebar open={open} onToggle={() => setOpen(false)} />
        <Main open={open}>
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs>
              <Stack spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
              </Stack>
            </Grid>
          </Grid>
          {/* <Button onClick={() => setOpen(true)}>SHOW</Button> */}
          <FabButton open={open} handleClick={() => setOpen(true)} />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
