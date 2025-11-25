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
    backgroundColor: "#1e293b",
    borderRight: "1px solid rgba(148, 163, 184, 0.12)",
    backgroundImage: "linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)",
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
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  margin: "4px 12px",
  borderRadius: 10,
  padding: "12px 16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    transform: "translateX(4px)",
  },
  ...(active && {
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
}));

const NavItems = (props) => {
  const { activeScreen } = props;
  return (
    <React.Fragment>
      <StyledListItemButton
        component={Link}
        to="/"
        active={activeScreen === "dashboard"}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </StyledListItemButton>

      <StyledListItemButton
        component={Link}
        to="/add-new-item"
        active={activeScreen === "addnewitem"}
      >
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add new item" />
      </StyledListItemButton>

      <StyledListItemButton
        component={Link}
        to="/inventory-settings"
        active={activeScreen === "inventorysettings"}
      >
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory settings" />
      </StyledListItemButton>

      <StyledListItemButton
        component={Link}
        to="/account-settings"
        active={activeScreen === "accountsettings"}
      >
        <ListItemIcon>
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
        <NavItems activeScreen={activeScreen} />
      </List>
    </Drawer>
  );
}
