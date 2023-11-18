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
  "&:nth-of-type(odd)": {},
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const { data, setDirtyUpdate } = props;
  const renderTableRows = data.map((row) => {
    const {
      name,
      categoryId,
      subCategoryId,
      locationId,
      //createdTimestamp,
      lastUsedTimestamp,
      //description,
      price,
      quantity = 0,
      brandId,
      id,
    } = row;
    return (
      <StyledTableRow className={quantity < 1 ? "out-of-stock" : ""}>
        <StyledTableCell component="th" scope="row">
          {brandId}
        </StyledTableCell>
        <StyledTableCell component="th">{name}</StyledTableCell>
        <StyledTableCell>
          {categoryId}/{subCategoryId}
        </StyledTableCell>
        <StyledTableCell align="right">{price}</StyledTableCell>
        <StyledTableCell align="right">{quantity}</StyledTableCell>
        <StyledTableCell align="right">{locationId}</StyledTableCell>
        <StyledTableCell align="right">
          {moment(lastUsedTimestamp).fromNow()}
        </StyledTableCell>
        <StyledTableCell align="right">
          <ItemMenu
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
            <StyledTableCell>Category/Subcategory</StyledTableCell>
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
