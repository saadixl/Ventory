import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CreatableSelect from "react-select/creatable";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { getBrands, addBrand, removeBrand } from "../services/api";

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
];

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
  const [dirtyBrandUpdate, setDirtyBrandUpdate] = useState(Date.now());
  async function fetchBrands() {
    const brands = await getBrands();
    setBrandOptions(brands);
  }
  useEffect(() => {
    fetchBrands();
  }, [dirtyBrandUpdate]);

  const handleCreateBrand = async (newValue) => {
    await addBrand(newValue);
    setDirtyBrandUpdate(Date.now());
  };

  const handleChangeBrand = async (newValue, actionMeta) => {
    if (actionMeta.action === "remove-value" && actionMeta.removedValue) {
      const id = actionMeta.removedValue.value;
      await removeBrand(id);
      setDirtyBrandUpdate(Date.now());
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
              onChange={handleChangeBrand}
              onCreateOption={handleCreateBrand}
            />

            <h3>Categories</h3>
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={colourOptions}
            />

            <h3>Sub-categories</h3>
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={colourOptions}
            />

            <h3>Locations</h3>
            <CreatableSelect
              classNamePrefix="react-select"
              styles={customSelectStyle}
              isMulti
              isClearable
              options={colourOptions}
            />
          </Paper>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}

export default InventorySettings;
