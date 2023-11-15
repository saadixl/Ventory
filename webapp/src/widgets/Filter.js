import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "./Dropdowns";

export default function Filter(props) {
  const { filterOption, setFilterOption, clearFilter } = props;
  const { keyword, brandId, categoryId, subCategoryId, locationId } =
    filterOption;
  return (
    <Card className="ventory-filter" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Filter
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => {
              setFilterOption({ ...filterOption, keyword: e.target.value });
            }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            value={keyword}
          />
          <BrandDropdown
            value={brandId}
            showAll={true}
            onChange={(brandId) => {
              setFilterOption({ ...filterOption, brandId });
            }}
          />
          <LocationDropdown
            value={locationId}
            showAll={true}
            onChange={(locationId) => {
              setFilterOption({ ...filterOption, locationId });
            }}
          />
          <CategoryDropdown
            value={categoryId}
            showAll={true}
            onChange={(categoryId) => {
              setFilterOption({ ...filterOption, categoryId });
            }}
          />
          <SubCategoryDropdown
            value={subCategoryId}
            showAll={true}
            onChange={(subCategoryId) => {
              setFilterOption({ ...filterOption, subCategoryId });
            }}
          />
          <TextField
            onChange={(e) => {
              setFilterOption({ ...filterOption, maxPrice: e.target.value });
            }}
            type="number"
            id="outlined-basic"
            label="Max price"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => {
              setFilterOption({ ...filterOption, minPrice: e.target.value });
            }}
            type="number"
            id="outlined-basic"
            label="Min price"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => {
              setFilterOption({ ...filterOption, maxQty: e.target.value });
            }}
            type="number"
            id="outlined-basic"
            label="Max quantity"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => {
              setFilterOption({ ...filterOption, minQty: e.target.value });
            }}
            type="number"
            id="outlined-basic"
            label="Min quantity"
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={clearFilter} size="small">
          Clear
        </Button>
      </CardActions>
    </Card>
  );
}
