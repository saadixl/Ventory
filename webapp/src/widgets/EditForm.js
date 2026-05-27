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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StyleIcon from "@mui/icons-material/Style";
import InventoryIcon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import PlaceIcon from "@mui/icons-material/Place";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
  TagsDropdown,
} from "./Dropdowns";

const SectionHeader = ({ icon, title, subtitle }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        background: "rgba(99, 102, 241, 0.1)",
        border: "1px solid rgba(99, 102, 241, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#f1f5f9" }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: "0.72rem", color: "rgba(148, 163, 184, 0.45)" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

const FormSection = ({ icon, title, subtitle, children }) => (
  <Paper
    sx={{
      p: 3,
      background: "rgba(10, 15, 26, 0.5)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(148, 163, 184, 0.08)",
      borderRadius: 3,
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "rgba(99, 102, 241, 0.12)",
      },
    }}
  >
    <SectionHeader icon={icon} title={title} subtitle={subtitle} />
    {children}
  </Paper>
);

const FieldRow = ({ children }) => (
  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
    {children}
  </Box>
);

const FieldCol = ({ flex = 1, minWidth = 200, children }) => (
  <Box sx={{ flex, minWidth }}>{children}</Box>
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
    <Box className="animate-fade-in" sx={{ maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {/* Basic Information */}
        <FormSection
          icon={<InfoOutlinedIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          title="Basic Information"
          subtitle="Name, brand, and item details"
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <FieldRow>
              <FieldCol>
                <TextField
                  onChange={(e) => handleFieldChange(e.target.value, "name")}
                  label="Item Name"
                  variant="outlined"
                  size="small"
                  defaultValue={name}
                  fullWidth
                  placeholder="e.g. MacBook Pro 16-inch"
                />
              </FieldCol>
              <FieldCol>
                <BrandDropdown
                  defaultValue={brandId}
                  onChange={(value) => handleFieldChange(value, "brandId")}
                />
              </FieldCol>
            </FieldRow>
            <TextField
              defaultValue={config}
              label="Configuration / Specs"
              variant="outlined"
              size="small"
              onChange={(e) => handleFieldChange(e.target.value, "config")}
              fullWidth
              placeholder="e.g. M3 Max, 36GB RAM, 1TB SSD"
            />
            <TextField
              defaultValue={description}
              multiline
              rows={2}
              label="Description"
              variant="outlined"
              size="small"
              onChange={(e) => handleFieldChange(e.target.value, "description")}
              fullWidth
              placeholder="Additional notes about this item..."
            />
          </Box>
        </FormSection>

        {/* Stock & Pricing */}
        <FormSection
          icon={<InventoryIcon sx={{ fontSize: 18, color: "#10b981" }} />}
          title="Stock & Pricing"
          subtitle="Quantity, price, and gift status"
        >
          <FieldRow>
            <FieldCol minWidth={140}>
              <TextField
                defaultValue={quantity}
                size="small"
                label="Quantity"
                variant="outlined"
                type="number"
                onChange={(e) => handleFieldChange(e.target.value, "quantity")}
                fullWidth
              />
            </FieldCol>
            <FieldCol minWidth={140}>
              <TextField
                defaultValue={price}
                size="small"
                onChange={(e) => handleFieldChange(e.target.value, "price")}
                label="Price ($)"
                variant="outlined"
                type="number"
                fullWidth
              />
            </FieldCol>
            <FieldCol minWidth={120}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  border: "1px solid rgba(148, 163, 184, 0.1)",
                  background: "rgba(10, 15, 26, 0.4)",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={isGift || formData.isGift}
                      onChange={(e) => handleFieldChange(e.target.checked, "isGift")}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#a78bfa" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#a78bfa" },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography sx={{ fontSize: "0.85rem" }}>Gift</Typography>
                    </Box>
                  }
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </Box>
            </FieldCol>
          </FieldRow>
        </FormSection>

        {/* Categorization */}
        <FormSection
          icon={<CategoryIcon sx={{ fontSize: 18, color: "#8b5cf6" }} />}
          title="Categorization"
          subtitle="Category and sub-category"
        >
          <FieldRow>
            <FieldCol>
              <CategoryDropdown
                defaultValue={categoryId}
                onChange={(value) => handleFieldChange(value, "categoryId")}
              />
            </FieldCol>
            <FieldCol>
              <SubCategoryDropdown
                defaultValue={subCategoryId}
                onChange={(value) => handleFieldChange(value, "subCategoryId")}
              />
            </FieldCol>
          </FieldRow>
        </FormSection>

        {/* Tags */}
        <FormSection
          icon={<StyleIcon sx={{ fontSize: 18, color: "#f59e0b" }} />}
          title="Tags"
          subtitle="Add labels for easier search"
        >
          <TagsDropdown
            defaultValue={tags}
            onChange={(value) => handleFieldChange(value, "tags")}
          />
        </FormSection>

        {/* Location & Dates */}
        <FormSection
          icon={<PlaceIcon sx={{ fontSize: 18, color: "#10b981" }} />}
          title="Location & Dates"
          subtitle="Where it's stored and key dates"
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <FieldRow>
              <FieldCol>
                <LocationDropdown
                  defaultValue={locationId}
                  onChange={(value) => handleFieldChange(value, "locationId")}
                />
              </FieldCol>
            </FieldRow>
            <FieldRow>
              <FieldCol>
                <Box className="ventory-datepicker">
                  <Datepicker
                    defaultValue={createdTimestamp}
                    onChange={(e) => handleDatePickerChange(e, "createdTimestamp")}
                    label="Purchased on"
                  />
                </Box>
              </FieldCol>
              <FieldCol>
                <Box className="ventory-datepicker">
                  <Datepicker
                    defaultValue={lastUsedTimestamp}
                    onChange={(e) => handleDatePickerChange(e, "lastUsedTimestamp")}
                    label="Last used on"
                  />
                </Box>
              </FieldCol>
            </FieldRow>
          </Box>
        </FormSection>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            pt: 1,
            pb: 2,
          }}
        >
          <Button
            onClick={handleSubmitClick}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              px: 4,
              py: 1.25,
              borderRadius: 2,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              fontSize: "0.9rem",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
              },
            }}
          >
            Save Item
          </Button>
          <Button
            onClick={handleBackClick}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 3,
              py: 1.25,
              borderRadius: 2,
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
      </Box>
    </Box>
  );
}
