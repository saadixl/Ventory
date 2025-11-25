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
import { ToastContainer } from "react-toastify";
import SideDrawer from "../widgets/SideDrawer";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 260;

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    background: {
      default: "#020617",
      paper: "#0a0f1a",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    divider: "rgba(148, 163, 184, 0.08)",
  },
  typography: {
    fontFamily: [
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: '"Inter Tight", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Inter Tight", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Inter Tight", "Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Inter Tight", "Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Inter Tight", "Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.005em",
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Inter Tight", "Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.005em",
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "-0.01em",
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "-0.005em",
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "-0.01em",
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: "0.01em",
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover fieldset": {
              borderColor: "#6366f1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6366f1",
            },
          },
        },
      },
    },
  },
});

export default function BasicLayout(props) {
  const { activeScreen, screenName } = props;
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(10, 15, 26, 0.9)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar className="ventory-app-bar" position="absolute" open={open}>
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
              {screenName}
            </Typography>
          </Toolbar>
        </AppBar>
        <SideDrawer
          toggleDrawer={toggleDrawer}
          activeScreen={activeScreen}
          open={open}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[50] : "#020617",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundImage: "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.03) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.03) 0px, transparent 50%)",
          }}
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
            {props.children}
          </Container>
        </Box>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{
            borderRadius: "12px",
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
