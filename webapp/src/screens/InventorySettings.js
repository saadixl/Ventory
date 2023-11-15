import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CreatableSelect from "react-select/creatable";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
];

const customSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "grey" : "#1E1E1E",
    backgroundColor: "#1E1E1E",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "grey" : "#1E1E1E",
  }),
};

function InventorySettings() {
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
              options={colourOptions}
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
