import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Sorter from "./Sorter";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "./Dropdowns";

export default function Filter(props) {
  const { filterOption, setFilterOption, clearFilter, filterVisible } = props;
  if (!filterVisible) {
    return null;
  }
  const { keyword, brandId, categoryId, subCategoryId, locationId, sortId } =
    filterOption;

  const updateFilterOptions = (newFilterOption) => {
    setFilterOption(newFilterOption);
    localStorage.setItem("filterOption", JSON.stringify(newFilterOption));
  };

  return (
    <Card className="ventory-filter" sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={2} md={2} lg={2}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  paddingLeft: "-10px",
                  paddingRight: "10px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    keyword: e.target.value,
                  });
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
                  updateFilterOptions({ ...filterOption, brandId });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  paddingLeft: "-10px",
                  paddingRight: "10px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <CategoryDropdown
                value={categoryId}
                showAll={true}
                onChange={(categoryId) => {
                  updateFilterOptions({ ...filterOption, categoryId });
                }}
              />
              <SubCategoryDropdown
                value={subCategoryId}
                showAll={true}
                onChange={(subCategoryId) => {
                  updateFilterOptions({ ...filterOption, subCategoryId });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  paddingLeft: "-10px",
                  paddingRight: "10px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    fromYear: e.target.value,
                  });
                }}
                type="number"
                id="outlined-basic"
                label="From year"
                variant="outlined"
                size="small"
              />
              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    toYear: e.target.value,
                  });
                }}
                type="number"
                id="outlined-basic"
                label="To year"
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  paddingLeft: "-10px",
                  paddingRight: "10px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    maxPrice: e.target.value,
                  });
                }}
                type="number"
                id="outlined-basic"
                label="Max price"
                variant="outlined"
                size="small"
              />
              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    minPrice: e.target.value,
                  });
                }}
                type="number"
                id="outlined-basic"
                label="Min price"
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  paddingLeft: "-10px",
                  paddingRight: "10px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    maxQty: e.target.value,
                  });
                }}
                type="number"
                id="outlined-basic"
                label="Max quantity"
                variant="outlined"
                size="small"
              />

              <TextField
                onChange={(e) => {
                  updateFilterOptions({
                    ...filterOption,
                    minQty: e.target.value,
                  });
                }}
                type="number"
                id="outlined-basic"
                label="Min quantity"
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  paddingLeft: "-10px",
                  paddingRight: "10px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <LocationDropdown
                value={locationId}
                showAll={true}
                onChange={(locationId) => {
                  updateFilterOptions({ ...filterOption, locationId });
                }}
              />
              <Sorter
                value={sortId}
                onChange={(s) => {
                  updateFilterOptions({ ...filterOption, sortId: s });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                },
              }}
              noValidate
              autoComplete="off"
            >
              <Button
                onClick={clearFilter}
                size="small"
                variant="contained"
                color="primary"
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
