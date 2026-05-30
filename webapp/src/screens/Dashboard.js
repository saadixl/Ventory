import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SortIcon from "@mui/icons-material/Sort";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ItemCardGrid from "../widgets/ItemCard";
import Filter from "../widgets/Filter";
import { getInventoryItems } from "../services/api";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import FilterToggle from "../widgets/FilterToggle";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "newest-to-oldest", label: "Newest to oldest" },
  { value: "oldest-to-newest", label: "Oldest to newest" },
  { value: "price-hi-low", label: "Price high to low" },
  { value: "price-low-hi", label: "Price low to high" },
  { value: "qty-hi-low", label: "Qty high to low" },
  { value: "qty-low-hi", label: "Qty low to high" },
];

function Dashboard() {
  const navigate = useNavigate();
  const searchRef = useRef(null);
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
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortAnchor, setSortAnchor] = useState(null);
  const [searchOpen, setSearchOpen] = useState(!!cachedFilterOptions.keyword);

  async function fetchInventoryItems() {
    setLoading(true);
    const items = await getInventoryItems();
    setInventoryItems(items);
    setLoading(false);
  }

  useEffect(() => {
    fetchInventoryItems();
  }, [dirtyUpdate]);

  const updateFilterOptions = (updated) => {
    setFilterOption(updated);
    localStorage.setItem("filterOption", JSON.stringify(updated));
  };

  const handleSearchToggle = () => {
    if (searchOpen) {
      const updated = { ...filterOption, keyword: "" };
      updateFilterOptions(updated);
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const filterData = (inventoryItems) => {
    const filteredData = inventoryItems.filter((item) => {
      const createdAtYear = new Date(item.createdTimestamp).getFullYear();
      if (filterOption.keyword && filterOption.keyword.trim() !== "") {
        const kw = filterOption.keyword.toLowerCase().trim();
        const searchable = [item.name, item.categoryId, item.subCategoryId, item.brandId, item.description, item.config]
          .map((v) => String(v || "").toLowerCase());
        if (!searchable.some((s) => s.includes(kw))) {
          return false;
        }
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

  const isFiltered = filteredItems.length !== totalItems;

  return (
    <AuthenticatedLayout screenName="Dashboard" activeScreen="dashboard">
      <Box className="animate-fade-in" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Toolbar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Left: add button + item count */}
          <Button
            onClick={() => navigate("/add-new-item")}
            size="small"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#818cf8",
              px: 1.5,
              py: 0.5,
              borderRadius: "10px",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              minHeight: 0,
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                borderColor: "rgba(99, 102, 241, 0.4)",
              },
            }}
          >
            Add item
          </Button>
          {!loading && (
            <Typography
              sx={{
                fontSize: "0.82rem",
                color: "rgba(148, 163, 184, 0.6)",
                fontWeight: 500,
              }}
            >
              {isFiltered
                ? `${filteredItems.length} of ${totalItems} items`
                : `${totalItems} items`}
            </Typography>
          )}

          <Box sx={{ flex: 1 }} />

          {/* Search expandable */}
          {searchOpen && (
            <TextField
              inputRef={searchRef}
              value={filterOption.keyword || ""}
              onChange={(e) =>
                updateFilterOptions({ ...filterOption, keyword: e.target.value })
              }
              placeholder="Search items..."
              variant="outlined"
              size="small"
              sx={{
                width: 220,
                transition: "width 0.2s ease",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: 36,
                  fontSize: "0.82rem",
                },
              }}
              InputProps={{
                endAdornment: filterOption.keyword ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateFilterOptions({ ...filterOption, keyword: "" })
                      }
                      sx={{ p: 0.25 }}
                    >
                      <CloseIcon sx={{ fontSize: 14, color: "rgba(148,163,184,0.4)" }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          )}

          {/* Search icon */}
          <Tooltip title={searchOpen ? "Close search" : "Search"} arrow>
            <IconButton
              onClick={handleSearchToggle}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: (searchOpen || filterOption.keyword)
                  ? "rgba(99, 102, 241, 0.15)"
                  : "rgba(148, 163, 184, 0.06)",
                border: (searchOpen || filterOption.keyword)
                  ? "1px solid rgba(99, 102, 241, 0.3)"
                  : "1px solid rgba(148, 163, 184, 0.08)",
                color: (searchOpen || filterOption.keyword) ? "#818cf8" : "rgba(148, 163, 184, 0.5)",
                transition: "all 0.15s ease",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                  borderColor: "rgba(99, 102, 241, 0.4)",
                  color: "#a5b4fc",
                },
              }}
            >
              <SearchIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {/* Sort icon */}
          <Tooltip title="Sort" arrow>
            <IconButton
              onClick={(e) => setSortAnchor(e.currentTarget)}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: filterOption.sortId !== "default"
                  ? "rgba(99, 102, 241, 0.15)"
                  : "rgba(148, 163, 184, 0.06)",
                border: filterOption.sortId !== "default"
                  ? "1px solid rgba(99, 102, 241, 0.3)"
                  : "1px solid rgba(148, 163, 184, 0.08)",
                color: filterOption.sortId !== "default" ? "#818cf8" : "rgba(148, 163, 184, 0.5)",
                transition: "all 0.15s ease",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                  borderColor: "rgba(99, 102, 241, 0.4)",
                  color: "#a5b4fc",
                },
              }}
            >
              <SortIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={sortAnchor}
            open={Boolean(sortAnchor)}
            onClose={() => setSortAnchor(null)}
            PaperProps={{
              sx: {
                backgroundColor: "rgba(30, 41, 59, 0.97)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
                borderRadius: 2,
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                minWidth: 200,
              },
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem
                key={opt.value}
                selected={filterOption.sortId === opt.value}
                onClick={() => {
                  updateFilterOptions({ ...filterOption, sortId: opt.value });
                  setSortAnchor(null);
                }}
                sx={{
                  fontSize: "0.82rem",
                  py: 0.75,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                  },
                }}
              >
                {filterOption.sortId === opt.value && (
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckIcon sx={{ fontSize: 16, color: "#818cf8" }} />
                  </ListItemIcon>
                )}
                <ListItemText
                  inset={filterOption.sortId !== opt.value}
                  primary={opt.label}
                />
              </MenuItem>
            ))}
          </Menu>

          {/* Filter icon */}
          <FilterToggle
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
          />
        </Box>

        {/* Filter Modal */}
        <Filter
          filterVisible={filterVisible}
          setFilterVisible={setFilterVisible}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          clearFilter={() => {
            setFilterOption(initialFilterOption);
            localStorage.removeItem("filterOption");
          }}
          stats={{ totalItems, uniqueCategories, outOfStock, totalValue }}
          loading={loading}
        />

        {/* Card Grid */}
        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={220}
                sx={{
                  bgcolor: "rgba(148, 163, 184, 0.06)",
                  borderRadius: "16px",
                }}
              />
            ))}
          </Box>
        ) : (
          <ItemCardGrid data={filteredItems} setDirtyUpdate={setDirtyUpdate} />
        )}
      </Box>
    </AuthenticatedLayout>
  );
}

export default Dashboard;
