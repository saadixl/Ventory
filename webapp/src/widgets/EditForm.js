import { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Datepicker from "../widgets/Datepicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "./Dropdowns";

export default function EditForm(props) {
  const { action, data = {} } = props;
  const {
    brandId,
    categoryId,
    createdTimestamp,
    description,
    id,
    lastUsedTimestamp,
    locationId,
    name,
    price,
    quantity,
    subCategoryId,
  } = data;
  const [formData, setFormData] = useState(data || {});
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
    action(formData, id);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
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
            defaultValue={name}
          />
          <BrandDropdown
            defaultValue={brandId}
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
            defaultValue={description}
            multiline
            rows={2}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
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
            defaultValue={quantity}
            size="small"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            type="number"
            onChange={(e) => handleFieldChange(e.target.value, "quantity")}
          />
          <TextField
            defaultValue={price}
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
            defaultValue={categoryId}
            onChange={(value) => handleFieldChange(value, "categoryId")}
          />
          <SubCategoryDropdown
            defaultValue={subCategoryId}
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
            defaultValue={locationId}
            onChange={(value) => handleFieldChange(value, "locationId")}
          />
          <Box className="ventory-datepicker">
            <Datepicker
              defaultValue={createdTimestamp}
              onChange={(e) => {
                handleDatePickerChange(e, "createdTimestamp");
              }}
              className="ventory-datepicker"
              label="Created at"
            />
          </Box>
          <Box className="ventory-datepicker">
            <Datepicker
              defaultValue={lastUsedTimestamp}
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
  );
}
