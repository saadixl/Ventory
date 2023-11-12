import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Datepicker from "../widgets/Datepicker";
import {
  UnifiedCategoryDropdown
} from "../widgets/Dropdowns"

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

function AddNewItem() {
  const handleUnifiedCategoryChange = (selectedCategory, selectedSubCategory) => {
    console.log("selectedCategory, selectedSubCategory", selectedCategory, selectedSubCategory);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Brand" variant="outlined" />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "92ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              multiline
              rows={2}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="Price" variant="outlined" />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <UnifiedCategoryDropdown onChange={handleUnifiedCategoryChange} />
            {/* <TextField
              id="outlined-select-currency"
              select
              label="Subcategory"
              defaultValue="EUR"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-select-currency"
              select
              label="Location"
              defaultValue="EUR"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box className="ventory-datepicker">
              <Datepicker className="ventory-datepicker" label="Purchased at" />
            </Box>
            <Box className="ventory-datepicker">
              <Datepicker label="Last used at" />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddNewItem;
