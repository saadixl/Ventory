import { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DateTimeLabel from "./DateTimeLabel";
import ItemMenu from "../widgets/ItemMenu";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e293b",
    color: "#f1f5f9",
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "2px solid rgba(99, 102, 241, 0.2)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.05)",
    transform: "scale(1.001)",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(148, 163, 184, 0.02)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const [showPrice, setShowPrice] = useState(false);

  const handleShowPrice = (e) => {
    setShowPrice(e.target.checked);
  };

  const { data, setDirtyUpdate } = props;
  const renderTableRows = data.map((row) => {
    const {
      name,
      categoryId,
      subCategoryId,
      locationId,
      createdTimestamp,
      lastUsedTimestamp,
      description,
      price,
      quantity = 0,
      brandId,
      id,
      isGift,
      config,
      tags,
    } = row;
    const configComp = config ? (
      <span className="config-text">{config}</span>
    ) : null;
    const tagsComp = tags ? (
      <div className="tags-on-table">
        {tags.map((tag) => {
          return <Chip label={tag.label} color="primary" size="small" />;
        })}
      </div>
    ) : null;
    return (
      <StyledTableRow 
        key={id} 
        className={quantity < 1 ? "out-of-stock" : ""}
        sx={{
          ...(quantity < 1 && {
            opacity: 0.6,
            backgroundColor: "rgba(108, 117, 125, 0.1)",
          }),
        }}
      >
        <StyledTableCell component="th" scope="row">
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {brandId}
          </Typography>
        </StyledTableCell>
        <StyledTableCell width="20%" component="th">
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
            {name}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "text.secondary",
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            {configComp}
            {description}
            {tagsComp}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {categoryId}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {subCategoryId}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center">
          {isGift ? <CheckCircleIcon sx={{ color: "#6366f1" }} /> : null}
        </StyledTableCell>
        <StyledTableCell align="center">
          {showPrice ? (
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              ${price}
            </Typography>
          ) : (
            <VisibilityOffIcon sx={{ color: "text.secondary", fontSize: 18 }} />
          )}
        </StyledTableCell>
        <StyledTableCell align="right">
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600,
              color: quantity < 1 ? "error.main" : "primary.main",
            }}
          >
            {quantity}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Typography variant="body2">{locationId}</Typography>
        </StyledTableCell>
        <StyledTableCell width="20%" align="right">
          <DateTimeLabel timestamp={createdTimestamp} />
        </StyledTableCell>
        <StyledTableCell width="20%" align="right">
          <DateTimeLabel timestamp={lastUsedTimestamp} />
        </StyledTableCell>
        <StyledTableCell align="right">
          <ItemMenu
            data={row}
            quantity={quantity}
            setDirtyUpdate={setDirtyUpdate}
            id={id}
          />
        </StyledTableCell>
      </StyledTableRow>
    );
  });

  return (
    <TableContainer 
      component={Paper}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(148, 163, 184, 0.12)",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="ventory-table-head">
          <TableRow>
            <StyledTableCell>Brand</StyledTableCell>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell>
              Category
              <br />
              <span className="muted">Subcategory</span>
            </StyledTableCell>
            <StyledTableCell>Gift</StyledTableCell>
            <StyledTableCell align="right">
              <FormControlLabel
                control={
                  <Switch 
                    checked={showPrice} 
                    onChange={handleShowPrice}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#6366f1",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#6366f1",
                      },
                    }}
                  />
                }
                label="Price"
                labelPlacement="start"
                sx={{ margin: 0 }}
              />
            </StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Bought at</StyledTableCell>
            <StyledTableCell align="right">Last used</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
