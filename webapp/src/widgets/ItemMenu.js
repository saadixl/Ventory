import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  deleteInventoryItem,
  checkInItem,
  restockItem,
  unstockItem,
} from "../services/api";

const options = [
  "Edit",
  "Open DB document",
  "Check-in",
  "Restock",
  "Out of stock",
  "Delete",
];
const ITEM_HEIGHT = 48;

export default function ItemMenu(props) {
  const { id, setDirtyUpdate, quantity } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (i) => {
    if (i === 1) {
      const firebaseUrl = `https://console.firebase.google.com/project/ventoryapp/firestore/data/~2FInventoryItems~2F${id}`;
      window.open(firebaseUrl, "_blank");
    } else if (i === 2) {
      await checkInItem(id);
    } else if (i === 3) {
      await restockItem(id, quantity);
    } else if (i === 4) {
      await unstockItem(id);
    } else if (i === 5) {
      const confirm = window.confirm("Do you want to delete this item?");
      if (confirm) {
        await deleteInventoryItem(id);
      }
    }
    setDirtyUpdate(Date.now());
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, i) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleClose(i)}
            sx={{
              fontSize: 12,
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
