import * as React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  deleteInventoryItem,
  checkInItem,
  restockItem,
  unstockItem,
} from "../services/api";

export default function ItemMenu(props) {
  const navigate = useNavigate();
  const { id, setDirtyUpdate, quantity, data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAction = async (action) => {
    setAnchorEl(null);
    if (action === "edit") {
      navigate(`/edit-item/${id}`, { state: data });
    } else if (action === "opendb") {
      const firebaseUrl = `https://console.firebase.google.com/project/ventoryapp/firestore/data/~2FInventoryItems~2F${id}`;
      window.open(firebaseUrl, "_blank");
    } else if (action === "checkin") {
      await checkInItem(id);
    } else if (action === "restock") {
      await restockItem(id, quantity);
    } else if (action === "unstock") {
      await unstockItem(id);
    } else if (action === "delete") {
      const confirm = window.confirm("Do you want to delete this item?");
      if (confirm) {
        await deleteInventoryItem(id);
      }
    }
    setDirtyUpdate(Date.now());
  };

  const menuItemSx = {
    py: 1,
    px: 2,
    borderRadius: 1,
    mx: 0.5,
    fontSize: "0.82rem",
    "& .MuiListItemIcon-root": {
      minWidth: 32,
    },
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        onClick={handleClick}
        size="small"
        sx={{
          color: "rgba(148, 163, 184, 0.5)",
          "&:hover": {
            color: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
          },
        }}
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(10, 15, 26, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            borderRadius: 2,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            minWidth: 180,
            py: 0.5,
          },
        }}
      >
        <MenuItem onClick={() => handleAction("edit")} sx={menuItemSx}>
          <ListItemIcon>
            <EditIcon sx={{ fontSize: 16, color: "#818cf8" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.82rem" }}>
            Edit
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction("checkin")} sx={menuItemSx}>
          <ListItemIcon>
            <CheckCircleIcon sx={{ fontSize: 16, color: "#10b981" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.82rem" }}>
            Check-in
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction("restock")} sx={menuItemSx}>
          <ListItemIcon>
            <AddCircleIcon sx={{ fontSize: 16, color: "#6366f1" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.82rem" }}>
            Restock
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction("unstock")} sx={menuItemSx}>
          <ListItemIcon>
            <RemoveCircleIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.82rem" }}>
            Out of stock
          </ListItemText>
        </MenuItem>
        <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.08)", my: 0.5 }} />
        <MenuItem onClick={() => handleAction("opendb")} sx={menuItemSx}>
          <ListItemIcon>
            <OpenInNewIcon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.82rem", color: "text.secondary" }}>
            Open in Firebase
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction("delete")} sx={menuItemSx}>
          <ListItemIcon>
            <DeleteOutlineIcon sx={{ fontSize: 16, color: "#ef4444" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.82rem", color: "#ef4444" }}>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
