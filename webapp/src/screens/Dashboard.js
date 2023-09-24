import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "../widgets/Table";
import RanoutCard from "../widgets/RanoutCard";

function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Table />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RanoutCard />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
