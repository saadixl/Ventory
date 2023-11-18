import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Datepicker from "../widgets/Datepicker";
import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "../widgets/Dropdowns";
import { addInventoryItem } from "../services/api";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

function AddNewItem() {
  const [formData, setFormData] = useState({});

  const handleFieldChange = (value, key) => {
    setFormData({
      ...formData,
      [key]: !isNaN(value) ? parseFloat(value) : value,
    });
  };

  const handleDatePickerChange = (e, key) => {
    const timestamp = new Date(e.$d).getTime();
    setFormData({
      ...formData,
      [key]: timestamp,
    });
  };

  const handleSubmitClick = () => {
    addInventoryItem(formData);
  };

  return (
    <AuthenticatedLayout screenName="Add new item" activeScreen="addnewitem">
      <Grid container spacing={3} className="add-item-container">
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "transparent",
              boxShadow: "none",
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
                size="small"
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
                size="small"
                onChange={(e) =>
                  handleFieldChange(e.target.value, "description")
                }
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
                size="small"
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                type="number"
                onChange={(e) => handleFieldChange(e.target.value, "quantity")}
              />
              <TextField
                size="small"
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
              <CategoryDropdown
                onChange={(value) => handleFieldChange(value, "categoryId")}
              />
              <SubCategoryDropdown
                onChange={(value) => handleFieldChange(value, "subCategoryId")}
              />
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
              <Button onClick={handleSubmitClick} variant="contained">
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}

export default AddNewItem;
