import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Table from "../widgets/Table";
import Filter from "../widgets/Filter";
import { getInventoryItems } from "../services/api";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

function Dashboard() {
  const initialFilterOption = {
    brandId: "ALL",
    categoryId: "ALL",
    subCategoryId: "ALL",
    locationId: "ALL",
  };
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filterOption, setFilterOption] = useState(initialFilterOption);
  const [dirtyUpdate, setDirtyUpdate] = useState(Date.now());

  async function fetchInventoryItems() {
    setInventoryItems(await getInventoryItems());
  }

  useEffect(() => {
    fetchInventoryItems();
  }, [dirtyUpdate]);

  const filterData = (inventoryItems) => {
    return inventoryItems.filter((item) => {
      const createdAtYear = new Date(item.createdTimestamp).getFullYear();
      if (
        filterOption.keyword &&
        item.name.toLowerCase().indexOf(filterOption.keyword.toLowerCase()) ===
          -1
      ) {
        return false;
      }
      if (
        filterOption.brandId &&
        filterOption.brandId !== "ALL" &&
        filterOption.brandId !== item.brandId
      ) {
        return false;
      }
      if (
        filterOption.categoryId &&
        filterOption.categoryId !== "ALL" &&
        filterOption.categoryId !== item.categoryId
      ) {
        return false;
      }
      if (
        filterOption.subCategoryId &&
        filterOption.subCategoryId !== "ALL" &&
        filterOption.subCategoryId !== item.subCategoryId
      ) {
        return false;
      }
      if (
        filterOption.locationId &&
        filterOption.locationId !== "ALL" &&
        filterOption.locationId !== item.locationId
      ) {
        return false;
      }
      if (filterOption.maxPrice && item.price > filterOption.maxPrice) {
        return false;
      }
      if (
        filterOption.minPrice &&
        (!item.price || item.price < filterOption.minPrice)
      ) {
        return false;
      }
      if (filterOption.maxQty && item.quantity > filterOption.maxQty) {
        return false;
      }
      if (filterOption.minQty && item.quantity < filterOption.minQty) {
        return false;
      }
      if (filterOption.fromYear && createdAtYear < filterOption.fromYear) {
        return false;
      }
      if (filterOption.toYear && createdAtYear > filterOption.toYear) {
        return false;
      }
      return true;
    });
  };

  const tableComp = !inventoryItems.length ? (
    <Box sx={{ width: "100%", p: 1, paddingBottom: 3 }}>
      <p sx={{ p: 1 }}>Trying to load data</p> <LinearProgress />
    </Box>
  ) : (
    <Table data={filterData(inventoryItems)} setDirtyUpdate={setDirtyUpdate} />
  );

  return (
    <AuthenticatedLayout screenName="Dashboard" activeScreen="dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "transparent",
            }}
          >
            <Filter
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              clearFilter={() => {
                setFilterOption(initialFilterOption);
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
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
      </Grid>
    </AuthenticatedLayout>
  );
}

export default Dashboard;
