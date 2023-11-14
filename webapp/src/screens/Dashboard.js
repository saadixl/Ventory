import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Table from "../widgets/Table";
import RanoutCard from "../widgets/RanoutCard";
import { getInventoryItems } from "../data/hooks";
import BasicLayout from "../layouts/BasicLayout";

function Dashboard() {
  const [inventoryItems, setInventoryItems] = useState([]);

  async function fetchInventoryItems() {
    setInventoryItems(await getInventoryItems());
  }

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const tableComp = !inventoryItems.length ? (
    <Box sx={{ width: "100%", p: 1, paddingBottom: 3 }}>
      <p sx={{ p: 1 }}>Trying to load data</p> <LinearProgress />
    </Box>
  ) : (
    <Table data={inventoryItems} />
  );

  return (
    <BasicLayout screenName="Dashboard" activeScreen="dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tableComp}
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
    </BasicLayout>
  );
}

export default Dashboard;
