import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Datepicker from "../widgets/Datepicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
  TagsDropdown,
} from "./Dropdowns";

const SectionTitle = ({ children }) => (
  <Typography
    variant="overline"
    sx={{
      color: "text.secondary",
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.1em",
      mb: 2,
      display: "block",
    }}
  >
    {children}
  </Typography>
);

const Row = ({ children, ...props }) => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      mb: 3,
      flexWrap: "wrap",
      ...props.sx,
    }}
  >
    {children}
  </Box>
);

const Field = ({ flex = 1, minWidth = 200, children }) => (
  <Box sx={{ flex, minWidth }}>
    {children}
  </Box>
);

export default function EditForm(props) {
  const navigate = useNavigate();
  const { action, data = {} } = props;
  const [formData, setFormData] = useState(data || {});
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
    isGift,
    config,
    tags,
  } = formData;

  const handleFieldChange = (value, key) => {
    const newValue =
      isNaN(value) || typeof value === "boolean" ? value : parseFloat(value);
    const newFormData = {
      ...formData,
      [key]: newValue,
    };
    setFormData(newFormData);
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

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Box>
      <Paper
        className="animate-fade-in"
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "rgba(10, 15, 26, 0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(148, 163, 184, 0.08)",
          borderRadius: 3,
          p: { xs: 2, sm: 3, md: 4 },
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Basic Info */}
        <SectionTitle>Basic Information</SectionTitle>
        <Row>
          <Field>
            <TextField
              onChange={(e) => handleFieldChange(e.target.value, "name")}
              label="Name"
              variant="outlined"
              size="small"
              defaultValue={name}
              fullWidth
            />
          </Field>
          <Field>
            <BrandDropdown
              defaultValue={brandId}
              onChange={(value) => handleFieldChange(value, "brandId")}
            />
          </Field>
        </Row>

        {/* Config & Description */}
        <SectionTitle>Details</SectionTitle>
        <Box sx={{ mb: 2 }}>
          <TextField
            defaultValue={config}
            multiline
            rows={1}
            label="Config"
            variant="outlined"
            size="small"
            onChange={(e) => handleFieldChange(e.target.value, "config")}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            defaultValue={description}
            multiline
            rows={2}
            label="Description"
            variant="outlined"
            size="small"
            onChange={(e) => handleFieldChange(e.target.value, "description")}
            fullWidth
          />
        </Box>

        {/* Tags */}
        <SectionTitle>Tags</SectionTitle>
        <Box sx={{ mb: 3 }}>
          <TagsDropdown
            defaultValue={tags}
            onChange={(value) => handleFieldChange(value, "tags")}
          />
        </Box>

        {/* Quantity, Price, Gift */}
        <SectionTitle>Stock & Pricing</SectionTitle>
        <Row sx={{ alignItems: "center" }}>
          <Field minWidth={120}>
            <TextField
              defaultValue={quantity}
              size="small"
              label="Quantity"
              variant="outlined"
              type="number"
              onChange={(e) => handleFieldChange(e.target.value, "quantity")}
              fullWidth
            />
          </Field>
          <Field minWidth={120}>
            <TextField
              defaultValue={price}
              size="small"
              onChange={(e) => handleFieldChange(e.target.value, "price")}
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
            />
          </Field>
          <Field minWidth={100}>
            <FormControlLabel
              control={
                <Switch
                  checked={isGift || formData.isGift}
                  onChange={(e) => handleFieldChange(e.target.checked, "isGift")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#6366f1",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#6366f1",
                    },
                  }}
                />
              }
              label="Is gift"
              labelPlacement="end"
            />
          </Field>
        </Row>

        {/* Category */}
        <SectionTitle>Categorization</SectionTitle>
        <Row>
          <Field>
            <CategoryDropdown
              defaultValue={categoryId}
              onChange={(value) => handleFieldChange(value, "categoryId")}
            />
          </Field>
          <Field>
            <SubCategoryDropdown
              defaultValue={subCategoryId}
              onChange={(value) => handleFieldChange(value, "subCategoryId")}
            />
          </Field>
        </Row>

        {/* Location & Dates */}
        <SectionTitle>Location & Dates</SectionTitle>
        <Row sx={{ mb: 4, alignItems: "flex-start" }}>
          <Field>
            <LocationDropdown
              defaultValue={locationId}
              onChange={(value) => handleFieldChange(value, "locationId")}
            />
          </Field>
          <Field>
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
          </Field>
          <Field>
            <Box className="ventory-datepicker">
              <Datepicker
                defaultValue={lastUsedTimestamp}
                onChange={(e) => {
                  handleDatePickerChange(e, "lastUsedTimestamp");
                }}
                label="Last used at"
              />
            </Box>
          </Field>
        </Row>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            pt: 3,
            borderTop: "1px solid rgba(148, 163, 184, 0.08)",
          }}
        >
          <Button
            onClick={handleSubmitClick}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              px: 4,
              py: 1,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
              },
            }}
          >
            Submit
          </Button>
          <Button
            onClick={handleBackClick}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 3,
              py: 1,
              borderColor: "rgba(148, 163, 184, 0.2)",
              color: "text.secondary",
              "&:hover": {
                borderColor: "rgba(148, 163, 184, 0.4)",
                backgroundColor: "rgba(148, 163, 184, 0.05)",
              },
            }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
