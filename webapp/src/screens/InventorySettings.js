import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreatableSelect from "react-select/creatable";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StyleIcon from "@mui/icons-material/Style";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  getInventoryOptions,
  addInventoryOptions,
  deleteInventoryOptions,
} from "../services/api";
import { clearCache } from "../services/cache";

const inventoryOptions = {
  BRANDS: "Brands",
  CATEGORIES: "Categories",
  SUBCATEGORIES: "Subcategories",
  LOCATIONS: "Locations",
  TAGS: "Tags",
};

const customSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#6366f1" : "rgba(148, 163, 184, 0.15)",
    backgroundColor: "rgba(10, 15, 26, 0.8)",
    color: "#fff",
    borderRadius: 10,
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "rgba(99, 102, 241, 0.1)" : "#0a0f1a",
  }),
};

const SettingSection = ({ icon, title, children }) => (
  <Paper
    sx={{
      p: 3,
      mb: 3,
      background: "rgba(10, 15, 26, 0.7)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(148, 163, 184, 0.08)",
      borderRadius: 3,
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "rgba(99, 102, 241, 0.15)",
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          background: "rgba(99, 102, 241, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
        {title}
      </Typography>
    </Box>
    {children}
  </Paper>
);

function InventorySettings() {
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  const [dirtyBrandUpdate, setDirtyBrandUpdate] = useState(Date.now());
  const [dirtyCategoryUpdate, setDirtyCategoryUpdate] = useState(Date.now());
  const [dirtySubCategoryUpdate, setDirtySubCategoryUpdate] = useState(
    Date.now(),
  );
  const [dirtyLocationUpdate, setDirtyLocationUpdate] = useState(Date.now());
  const [dirtyTagsUpdate, setDirtyTagsUpdate] = useState(Date.now());

  async function fetchBrands() {
    const brands = await getInventoryOptions({
      collectionName: inventoryOptions.BRANDS,
    });
    setBrandOptions(brands);
  }
  async function fetchCategories() {
    const categories = await getInventoryOptions({
      collectionName: inventoryOptions.CATEGORIES,
    });
    setCategoryOptions(categories);
  }
  async function fetchSubCategories() {
    const subCategories = await getInventoryOptions({
      collectionName: inventoryOptions.SUBCATEGORIES,
    });
    setSubCategoryOptions(subCategories);
  }
  async function fetchLocations() {
    const locations = await getInventoryOptions({
      collectionName: inventoryOptions.LOCATIONS,
    });
    setLocationOptions(locations);
  }
  async function fetchTags() {
    const tags = await getInventoryOptions({
      collectionName: inventoryOptions.TAGS,
    });
    setTagOptions(tags);
  }
  useEffect(() => {
    fetchBrands();
  }, [dirtyBrandUpdate]);

  useEffect(() => {
    fetchCategories();
  }, [dirtyCategoryUpdate]);

  useEffect(() => {
    fetchSubCategories();
  }, [dirtySubCategoryUpdate]);

  useEffect(() => {
    fetchLocations();
  }, [dirtyLocationUpdate]);

  useEffect(() => {
    fetchTags();
  }, [dirtyTagsUpdate]);

  const handleCreate = async (newValue, collectionName, dirtyUpdate) => {
    await addInventoryOptions({
      collectionName,
      label: newValue,
    });
    dirtyUpdate(Date.now());
  };

  const handleChange = async (
    newValue,
    actionMeta,
    collectionName,
    dirtyUpdate,
  ) => {
    if (actionMeta.action === "remove-value" && actionMeta.removedValue) {
      const id = actionMeta.removedValue.value;
      await deleteInventoryOptions({
        collectionName,
        id,
      });
      dirtyUpdate(Date.now());
    }
  };

  return (
    <AuthenticatedLayout
      screenName="Inventory settings"
      activeScreen="inventorysettings"
    >
      <Grid container spacing={3} className="animate-fade-in">
        <Grid item xs={12} md={8} lg={9}>
          <SettingSection
            icon={<LocalOfferIcon sx={{ fontSize: 20, color: "#6366f1" }} />}
            title="Brands"
          >
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={brandOptions}
              value={brandOptions}
              onChange={(newValue, actionMeta) => {
                handleChange(
                  newValue,
                  actionMeta,
                  inventoryOptions.BRANDS,
                  setDirtyBrandUpdate,
                );
              }}
              onCreateOption={(newValue) => {
                handleCreate(
                  newValue,
                  inventoryOptions.BRANDS,
                  setDirtyBrandUpdate,
                );
              }}
            />
          </SettingSection>

          <SettingSection
            icon={<CategoryIcon sx={{ fontSize: 20, color: "#8b5cf6" }} />}
            title="Categories"
          >
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={categoryOptions}
              value={categoryOptions}
              onChange={(newValue, actionMeta) => {
                handleChange(
                  newValue,
                  actionMeta,
                  inventoryOptions.CATEGORIES,
                  setDirtyCategoryUpdate,
                );
              }}
              onCreateOption={(newValue) => {
                handleCreate(
                  newValue,
                  inventoryOptions.CATEGORIES,
                  setDirtyCategoryUpdate,
                );
              }}
            />
          </SettingSection>

          <SettingSection
            icon={<AccountTreeIcon sx={{ fontSize: 20, color: "#a78bfa" }} />}
            title="Sub-categories"
          >
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={subCategoryOptions}
              value={subCategoryOptions}
              onChange={(newValue, actionMeta) => {
                handleChange(
                  newValue,
                  actionMeta,
                  inventoryOptions.SUBCATEGORIES,
                  setDirtySubCategoryUpdate,
                );
              }}
              onCreateOption={(newValue) => {
                handleCreate(
                  newValue,
                  inventoryOptions.SUBCATEGORIES,
                  setDirtySubCategoryUpdate,
                );
              }}
            />
          </SettingSection>

          <SettingSection
            icon={<LocationOnIcon sx={{ fontSize: 20, color: "#10b981" }} />}
            title="Locations"
          >
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={locationOptions}
              value={locationOptions}
              onChange={(newValue, actionMeta) => {
                handleChange(
                  newValue,
                  actionMeta,
                  inventoryOptions.LOCATIONS,
                  setDirtyLocationUpdate,
                );
              }}
              onCreateOption={(newValue) => {
                handleCreate(
                  newValue,
                  inventoryOptions.LOCATIONS,
                  setDirtyLocationUpdate,
                );
              }}
            />
          </SettingSection>

          <SettingSection
            icon={<StyleIcon sx={{ fontSize: 20, color: "#f59e0b" }} />}
            title="Tags"
          >
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={tagOptions}
              value={tagOptions}
              onChange={(newValue, actionMeta) => {
                handleChange(
                  newValue,
                  actionMeta,
                  inventoryOptions.TAGS,
                  setDirtyTagsUpdate,
                );
              }}
              onCreateOption={(newValue) => {
                handleCreate(
                  newValue,
                  inventoryOptions.TAGS,
                  setDirtyTagsUpdate,
                );
              }}
            />
          </SettingSection>

          <Button
            onClick={clearCache}
            startIcon={<AutorenewIcon />}
            size="small"
            variant="outlined"
            sx={{
              mt: 1,
              borderColor: "rgba(148, 163, 184, 0.2)",
              color: "text.secondary",
              "&:hover": {
                borderColor: "rgba(99, 102, 241, 0.4)",
                backgroundColor: "rgba(99, 102, 241, 0.05)",
                color: "#6366f1",
              },
            }}
          >
            Clear cache
          </Button>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}

export default InventorySettings;
