import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name,
  brand,
  description,
  combinedCategory,
  purchasedAt,
  quantity,
  price,
  location,
  lastUsedAt,
) {
  return {
    name,
    brand,
    description,
    combinedCategory,
    purchasedAt,
    quantity,
    price,
    location,
    lastUsedAt,
  };
}

const rows = [
  createData(
    "iPhone 14 Pro Max",
    "Apple",
    "This is your primary phone which you carry with yourself.",
    "Electronics/Phone",
    1695386040000,
    1,
    1900,
    "Pocket",
    1695386040000,
  ),
  createData(
    "iPad Air M1",
    "Apple",
    "This is your primary media consumption device",
    "Electronics/Tablet",
    1695386040000,
    1,
    895,
    "Pocket",
    1695386040000,
  ),
  createData(
    "Macbook Air M2",
    "Apple",
    "This is your personal computer.",
    "Electronics/Laptop",
    1695386040000,
    1,
    2600,
    "Pocket",
    1695386040000,
  ),
  createData(
    "Studio Display",
    "Apple",
    "This is your primary monitor.",
    "Electronics/Monitor",
    1695386040000,
    1,
    2800,
    "Pocket",
    1695386040000,
  ),
  createData(
    "Apple Watch Ultra",
    "Apple",
    "This is your primary smart watch.",
    "Electronics/Smartwatch",
    1695386040000,
    1,
    1100,
    "Pocket",
    1695386040000,
  ),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="right">
              Category/Subcategory
            </StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Last used</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.combinedCategory}
              </StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(row.lastUsedAt).fromNow()}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
