import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
                  setFilterOption({
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
                  setFilterOption({
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
                  setFilterOption({
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
                  setFilterOption({
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
                  setFilterOption({ ...filterOption, locationId });
                }}
              />
              <Button onClick={clearFilter} size="small">
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
