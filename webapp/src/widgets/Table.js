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
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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
        <StyledTableCell component="th">
          <p>{name}</p>
          <Typography
            component="p"
            sx={{
              color: "#999",
            }}
          >
            {description}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>
          {categoryId}/{subCategoryId}
        </StyledTableCell>
        <StyledTableCell align="center">
          {isGift ? <CardGiftcardIcon /> : null}{" "}
          {showPrice ? price : <span className="muted">Hidden</span>}
        </StyledTableCell>
        <StyledTableCell align="right">{quantity}</StyledTableCell>
        <StyledTableCell align="right">{locationId}</StyledTableCell>
        <StyledTableCell align="right">
          <DateTimeLabel timestamp={createdTimestamp} />
        </StyledTableCell>
        <StyledTableCell align="right">
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
            <StyledTableCell>Category/Subcategory</StyledTableCell>
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
