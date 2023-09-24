import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import SideDrawer from "./widgets/SideDrawer";
import Dashboard from "./screens/Dashboard";
import AddNewItem from "./screens/AddNewItem";
import InventorySettings from "./screens/InventorySettings";
import AccountSettings from "./screens/AccountSettings";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [open, setOpen] = useState(true);
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let activeScreenRender;
  if (activeScreen === "dashboard") {
    activeScreenRender = <Dashboard />;
  } else if (activeScreen === "addnewitem") {
    activeScreenRender = <AddNewItem />;
  } else if (activeScreen === "inventorysettings") {
    activeScreenRender = <InventorySettings />;
  } else if (activeScreen === "accountsettings") {
    activeScreenRender = <AccountSettings />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Add a new item
            </Typography>
          </Toolbar>
        </AppBar>
        <SideDrawer
          toggleDrawer={toggleDrawer}
          setActiveScreen={setActiveScreen}
          open={open}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {activeScreenRender}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
