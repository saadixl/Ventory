import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CreatableSelect from "react-select/creatable";
import AutorenewIcon from "@mui/icons-material/Autorenew";
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
    borderColor: state.isFocused ? "grey" : "#1E1E1E",
    backgroundColor: "#1E1E1E",
    color: "#fff",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "grey" : "#1E1E1E",
  }),
};

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
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "transparent",
            }}
          >
            <h3>Brands</h3>
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

            <h3>Categories</h3>
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

            <h3>Sub-categories</h3>
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

            <h3>Locations</h3>
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
            <h3>Tags</h3>
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
          </Paper>
          <Button
            className="clear-cache-btn"
            onClick={clearCache}
            startIcon={<AutorenewIcon />}
            size="small"
            variant="outlined"
            color="primary"
          >
            Clear cache
          </Button>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}

export default InventorySettings;
