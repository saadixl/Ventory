import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CreatableSelect from "react-select/creatable";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

function InventorySettings() {
  return (
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
          <CreatableSelect isMulti isClearable options={colourOptions} />

          <h3>Categories</h3>
          <CreatableSelect isMulti isClearable options={colourOptions} />

          <h3>Sub-categories</h3>
          <CreatableSelect isMulti isClearable options={colourOptions} />

          <h3>Locations</h3>
          <CreatableSelect isMulti isClearable options={colourOptions} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default InventorySettings;
