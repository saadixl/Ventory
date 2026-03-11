import { useEffect, useState } from "react";
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
      gap: 1.25,
      px: 1.5,
      py: 1,
      width: "100%",
      height: "100%",
      borderRadius: 2,
      background: "rgba(10, 15, 26, 0.5)",
      border: "1px solid rgba(148, 163, 184, 0.06)",
      transition: "all 0.15s ease",
      "&:hover": {
        borderColor: `${color}25`,
        background: "rgba(10, 15, 26, 0.7)",
      },
    }}
  >
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: "8px",
        background: `${color}10`,
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
        sx={{ color: "rgba(148, 163, 184, 0.5)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.2 }}
      >
        {label}
      </Typography>
      {loading ? (
        <Skeleton width={32} height={20} sx={{ bgcolor: "rgba(148, 163, 184, 0.1)" }} />
      ) : (
        <Typography sx={{ fontWeight: 700, color, lineHeight: 1.2, fontSize: "1rem" }}>
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
      <Box className="animate-fade-in" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Stats + Filter Toggle Row */}
        <Box sx={{ display: "flex", alignItems: "stretch", gap: 1.5, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 0", minWidth: 140 }}>
            <StatCard
              icon={<InventoryIcon sx={{ fontSize: 16, color: "#6366f1" }} />}
              label="Total Items"
              value={totalItems}
              color="#6366f1"
              loading={loading}
            />
          </Box>
          <Box sx={{ flex: "1 1 0", minWidth: 140 }}>
            <StatCard
              icon={<CategoryIcon sx={{ fontSize: 16, color: "#8b5cf6" }} />}
              label="Categories"
              value={uniqueCategories}
              color="#8b5cf6"
              loading={loading}
            />
          </Box>
          <Box sx={{ flex: "1 1 0", minWidth: 140 }}>
            <StatCard
              icon={<WarningAmberIcon sx={{ fontSize: 16, color: "#f59e0b" }} />}
              label="Out of Stock"
              value={outOfStock}
              color={outOfStock > 0 ? "#f59e0b" : "#10b981"}
              loading={loading}
            />
          </Box>
          <Box sx={{ flex: "1 1 0", minWidth: 140 }}>
            <StatCard
              icon={<AttachMoneyIcon sx={{ fontSize: 16, color: "#10b981" }} />}
              label="Total Value"
              value={`$${totalValue.toLocaleString()}`}
              color="#10b981"
              loading={loading}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <FilterToggle
              filterVisible={filterVisible}
              setFilterVisible={setFilterVisible}
            />
          </Box>
        </Box>

        {/* Filter Panel (expands below) */}
        <Filter
          filterVisible={filterVisible}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          clearFilter={() => {
            setFilterOption(initialFilterOption);
            localStorage.removeItem("filterOption");
          }}
        />

        {/* Table */}
        <Box>
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
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}

export default Dashboard;
