import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Datepicker from "../widgets/Datepicker";
import {
  UnifiedCategoryDropdown,
  LocationDropdown,
  BrandDropdown,
} from "../widgets/Dropdowns";

function AddNewItem() {
  const [formData, setFormData] = useState({});
  const handleUnifiedCategoryChange = (
    selectedCategory,
    selectedSubCategory,
  ) => {
    setFormData({
      ...formData,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
    });
  };

  const handleFieldChange = (value, key) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleDatePickerChange = (e, key) => {
    const timestamp = Date.now(e.$d);
    setFormData({
      ...formData,
      [key]: timestamp,
    });
  };

  const handleSubmitClick = () => {
    console.log("formData", formData);
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
            <TextField
              onChange={(e) => handleFieldChange(e.target.value, "name")}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <BrandDropdown
              onChange={(value) => handleFieldChange(value, "brandId")}
            />
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
              onChange={(e) => handleFieldChange(e.target.value, "description")}
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
              type="number"
              onChange={(e) => handleFieldChange(e.target.value, "quantity")}
            />
            <TextField
              onChange={(e) => handleFieldChange(e.target.value, "price")}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              type="number"
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
            <UnifiedCategoryDropdown onChange={handleUnifiedCategoryChange} />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <LocationDropdown
              onChange={(value) => handleFieldChange(value, "locationId")}
            />
            <Box className="ventory-datepicker">
              <Datepicker
                onChange={(e) => {
                  handleDatePickerChange(e, "createdTimestamp");
                }}
                className="ventory-datepicker"
                label="Created at"
              />
            </Box>
            <Box className="ventory-datepicker">
              <Datepicker
                onChange={(e) => {
                  handleDatePickerChange(e, "lastUsedTimestamp");
                }}
                label="Last used at"
              />
            </Box>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Button
              onClick={handleSubmitClick}
              color="success"
              variant="outlined"
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddNewItem;
