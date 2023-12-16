import { useState } from "react";
import { styled } from "@mui/material/styles";
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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
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
    } = row;
    return (
      <StyledTableRow key={id} className={quantity < 1 ? "out-of-stock" : ""}>
        <StyledTableCell component="th" scope="row">
          {brandId}
        </StyledTableCell>
        <StyledTableCell width="20%" component="th">
          <p>{name}</p>
          <Typography
            component="p"
            sx={{
              color: "#999",
              fontSize: 12,
            }}
          >
            {description}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          {categoryId}
          <br />
          <span className="muted">{subCategoryId}</span>
        </StyledTableCell>
        <StyledTableCell align="center">
          {isGift ? <CheckCircleIcon sx={{ color: "green" }} /> : null}
        </StyledTableCell>
        <StyledTableCell align="center">
          {showPrice ? price : <VisibilityOffIcon />}
        </StyledTableCell>
        <StyledTableCell align="right">{quantity}</StyledTableCell>
        <StyledTableCell align="right">{locationId}</StyledTableCell>
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
    <TableContainer component={Paper}>
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
                  <Switch checked={showPrice} onChange={handleShowPrice} />
                }
                label="Price"
                labelPlacement="start"
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
