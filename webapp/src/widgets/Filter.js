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

export default function Filter() {
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
            onChange={(e) => {}}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
          />
          <BrandDropdown onChange={() => {}} />
          <LocationDropdown onChange={() => {}} />
          <CategoryDropdown onChange={() => {}} />
          <SubCategoryDropdown onChange={() => {}} />
          <TextField
            onChange={(e) => {}}
            type="number"
            id="outlined-basic"
            label="Max price"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => {}}
            type="number"
            id="outlined-basic"
            label="Min price"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => {}}
            type="number"
            id="outlined-basic"
            label="Max quantity"
            variant="outlined"
            size="small"
          />
          <TextField
            onChange={(e) => {}}
            type="number"
            id="outlined-basic"
            label="Min quantity"
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Clear</Button>
      </CardActions>
    </Card>
  );
}
