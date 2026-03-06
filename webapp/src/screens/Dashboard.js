import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import InventoryIcon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Table from "../widgets/Table";
import Filter from "../widgets/Filter";
import { getInventoryItems } from "../services/api";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import FilterToggle from "../widgets/FilterToggle";

const StatCard = ({ icon, label, value, color, loading }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      p: 2,
      width: "100%",
      height: "100%",
      borderRadius: 2.5,
      background: "rgba(10, 15, 26, 0.6)",
      border: "1px solid rgba(148, 163, 184, 0.08)",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: `${color}33`,
        background: "rgba(10, 15, 26, 0.8)",
      },
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "12px",
        background: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {label}
      </Typography>
      {loading ? (
        <Skeleton width={40} height={28} sx={{ bgcolor: "rgba(148, 163, 184, 0.1)" }} />
      ) : (
        <Typography variant="h6" sx={{ fontWeight: 700, color, lineHeight: 1.2 }}>
          {value}
        </Typography>
      )}
    </Box>
  </Box>
);

function Dashboard() {
  const initialFilterOption = {
    keyword: "",
    brandId: "ALL",
    categoryId: "ALL",
    subCategoryId: "ALL",
    locationId: "ALL",
    sortId: "default",
  };
  const cachedFilterOptions = localStorage.getItem("filterOption")
    ? { ...initialFilterOption, ...JSON.parse(localStorage.getItem("filterOption")) }
    : initialFilterOption;

  const [inventoryItems, setInventoryItems] = useState([]);
  const [filterOption, setFilterOption] = useState(cachedFilterOptions);
  const [dirtyUpdate, setDirtyUpdate] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(
    false || localStorage.getItem("filterVisible"),
  );

  async function fetchInventoryItems() {
    setLoading(true);
    const items = await getInventoryItems();
    setInventoryItems(items);
    setLoading(false);
  }

  useEffect(() => {
    fetchInventoryItems();
  }, [dirtyUpdate]);

  const filterData = (inventoryItems) => {
    const filteredData = inventoryItems.filter((item) => {
      const createdAtYear = new Date(item.createdTimestamp).getFullYear();
      if (
        filterOption.keyword &&
        filterOption.keyword.trim() !== "" &&
        !item.name.toLowerCase().includes(filterOption.keyword.toLowerCase().trim())
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

    if (filterOption.sortId && filterOption.sortId !== "default") {
      const { sortId } = filterOption;
      let field, direction;
      if (sortId === "qty-low-hi") {
        field = "quantity";
        direction = "asc";
      } else if (sortId === "qty-hi-low") {
        field = "quantity";
        direction = "dsc";
      } else if (sortId === "price-low-hi") {
        field = "price";
        direction = "asc";
      } else if (sortId === "price-hi-low") {
        field = "price";
        direction = "dsc";
      } else if (sortId === "oldest-to-newest") {
        field = "createdTimestamp";
        direction = "asc";
      } else if (sortId === "newest-to-oldest") {
        field = "createdTimestamp";
        direction = "dsc";
      }
      filteredData.sort((a, b) => {
        if (direction === "dsc") {
          if (a[field] > b[field]) return -1;
          if (b[field] > a[field]) return 1;
        } else {
          if (a[field] > b[field]) return 1;
          if (b[field] > a[field]) return -1;
        }
        return 0;
      });
    }
    return filteredData;
  };

  const filteredItems = filterData(inventoryItems);
  const totalItems = inventoryItems.length;
  const uniqueCategories = new Set(inventoryItems.map((i) => i.categoryId)).size;
  const outOfStock = inventoryItems.filter((i) => (i.quantity || 0) < 1).length;
  const totalValue = inventoryItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 0), 0);

  const tableComp = loading ? (
    <Box sx={{ p: 3 }}>
      {[...Array(5)].map((_, i) => (
        <Skeleton
          key={i}
          height={52}
          sx={{
            bgcolor: "rgba(148, 163, 184, 0.06)",
            borderRadius: 1,
            mb: 1,
          }}
        />
      ))}
    </Box>
  ) : (
    <Table data={filteredItems} setDirtyUpdate={setDirtyUpdate} />
  );

  return (
    <AuthenticatedLayout screenName="Dashboard" activeScreen="dashboard">
      <Grid container spacing={3} className="animate-fade-in">
        {/* Stats Row – 4 cards as direct items so they occupy one row; filter is next item and wraps below */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<InventoryIcon sx={{ fontSize: 20, color: "#6366f1" }} />}
            label="Total Items"
            value={totalItems}
            color="#6366f1"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<CategoryIcon sx={{ fontSize: 20, color: "#8b5cf6" }} />}
            label="Categories"
            value={uniqueCategories}
            color="#8b5cf6"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<WarningAmberIcon sx={{ fontSize: 20, color: "#f59e0b" }} />}
            label="Out of Stock"
            value={outOfStock}
            color={outOfStock > 0 ? "#f59e0b" : "#10b981"}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoneyIcon sx={{ fontSize: 20, color: "#10b981" }} />}
            label="Total Value"
            value={`$${totalValue.toLocaleString()}`}
            color="#10b981"
            loading={loading}
          />
        </Grid>

        {/* Filter – full width, always on its own row below the 4 cards */}
        <Grid className="filter-wrapper" item xs={12} sx={{ flexBasis: "100%", width: "100%", maxWidth: "100%" }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(10, 15, 26, 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(148, 163, 184, 0.08)",
              borderRadius: 3,
              p: 2,
            }}
          >
            <FilterToggle
              filterVisible={filterVisible}
              setFilterVisible={setFilterVisible}
            />
            <Filter
              filterVisible={filterVisible}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              clearFilter={() => {
                setFilterOption(initialFilterOption);
                localStorage.removeItem("filterOption");
              }}
            />
          </Paper>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(148, 163, 184, 0.12)",
            }}
          >
            {!loading && filteredItems.length !== totalItems && (
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  background: "rgba(99, 102, 241, 0.05)",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Showing {filteredItems.length} of {totalItems} items
                </Typography>
              </Box>
            )}
            {tableComp}
          </Paper>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}

export default Dashboard;
