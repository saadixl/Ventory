import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TuneIcon from "@mui/icons-material/Tune";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const drawerWidth = 260;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#0a0f1a",
    borderRight: "1px solid rgba(148, 163, 184, 0.08)",
    backgroundImage: "linear-gradient(180deg, rgba(99, 102, 241, 0.03) 0%, transparent 100%)",
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

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "open",
})(({ theme, active, open }) => ({
  margin: open ? "4px 12px" : "4px 8px",
  borderRadius: 10,
  padding: open ? "12px 16px" : "12px",
  justifyContent: open ? "flex-start" : "center",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    transform: open ? "translateX(4px)" : "none",
  },
  ...(active && open && {
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    borderLeft: "3px solid #6366f1",
    "& .MuiListItemIcon-root": {
      color: "#6366f1",
    },
    "& .MuiListItemText-primary": {
      color: "#6366f1",
      fontWeight: 600,
    },
  }),
  ...(active && !open && {
    backgroundColor: "transparent",
    borderLeft: "none",
    "& .MuiListItemIcon-root": {
      color: "#6366f1 !important",
    },
    "& .MuiListItemIcon-root svg": {
      color: "#6366f1 !important",
    },
    "& .MuiListItemText-primary": {
      color: "inherit",
      fontWeight: "normal",
    },
  }),
  "& .MuiListItemIcon-root": {
    minWidth: open ? 40 : "auto",
    justifyContent: "center",
    color: "inherit",
  },
  "& .MuiListItemText-root": {
    display: open ? "block" : "none",
  },
}));

const NavItems = (props) => {
  const { activeScreen, open } = props;
  const isActive = (screen) => activeScreen === screen;
  
  return (
    <React.Fragment>
      <StyledListItemButton
        component={Link}
        to="/"
        active={isActive("dashboard")}
        open={open}
      >
        <ListItemIcon
          sx={{
            color: !open && isActive("dashboard") ? "#6366f1" : "inherit",
          }}
        >
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </StyledListItemButton>

      <StyledListItemButton
        component={Link}
        to="/add-new-item"
        active={isActive("addnewitem")}
        open={open}
      >
        <ListItemIcon
          sx={{
            color: !open && isActive("addnewitem") ? "#6366f1" : "inherit",
          }}
        >
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add new item" />
      </StyledListItemButton>

      <StyledListItemButton
        component={Link}
        to="/inventory-settings"
        active={isActive("inventorysettings")}
        open={open}
      >
        <ListItemIcon
          sx={{
            color: !open && isActive("inventorysettings") ? "#6366f1" : "inherit",
          }}
        >
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory settings" />
      </StyledListItemButton>

      <StyledListItemButton
        component={Link}
        to="/account-settings"
        active={isActive("accountsettings")}
        open={open}
      >
        <ListItemIcon
          sx={{
            color: !open && isActive("accountsettings") ? "#6366f1" : "inherit",
          }}
        >
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Account settings" />
      </StyledListItemButton>
    </React.Fragment>
  );
};

export default function SideDrawer(props) {
  const { open, activeScreen, toggleDrawer } = props;
  return (
    <Drawer className="ventory-drawer" variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [2],
          minHeight: "64px !important",
        }}
      >
        {open && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ventory
          </Typography>
        )}
        <IconButton 
          onClick={toggleDrawer}
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "rgba(99, 102, 241, 0.1)",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.12)" }} />
      <List component="nav" sx={{ px: 1, pt: 2 }}>
        <NavItems activeScreen={activeScreen} open={open} />
      </List>
    </Drawer>
  );
}
