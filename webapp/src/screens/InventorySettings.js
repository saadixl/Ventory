import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function InventorySettings() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Inventory Settings: TODO
        </Paper>
      </Grid>
    </Grid>
  );
}

export default InventorySettings;
