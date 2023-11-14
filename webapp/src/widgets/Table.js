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
import ItemMenu from "../widgets/ItemMenu";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const { data } = props;

  const renderTableRows = data.map((row) => {
    const {
      name,
      categoryId,
      subCategoryId,
      location,
      //createdTimestamp,
      lastUsedTimestamp,
      //description,
      price,
      quantity,
      //brandiId,
    } = row;
    return (
      <StyledTableRow key={name}>
        <StyledTableCell component="th" scope="row">
          {name}
        </StyledTableCell>
        <StyledTableCell align="right">
          {categoryId}/{subCategoryId}
        </StyledTableCell>
        <StyledTableCell align="right">{price}</StyledTableCell>
        <StyledTableCell align="right">{quantity}</StyledTableCell>
        <StyledTableCell align="right">{location}</StyledTableCell>
        <StyledTableCell align="right">
          {moment(lastUsedTimestamp).fromNow()}
        </StyledTableCell>
        <StyledTableCell align="right">
          <ItemMenu />
        </StyledTableCell>
      </StyledTableRow>
    );
  });

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
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
