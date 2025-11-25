import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClearIcon from "@mui/icons-material/Clear";
import Sorter from "./Sorter";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "./Dropdowns";

const FilterSection = ({ title, icon, children, ...props }) => (
  <Card
    sx={{
      height: "100%",
      background: "rgba(10, 15, 26, 0.6)",
      border: "1px solid rgba(148, 163, 184, 0.08)",
      borderRadius: 2,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        borderColor: "rgba(99, 102, 241, 0.3)",
        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.1)",
      },
    }}
    {...props}
  >
    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {icon}
        <Typography
          variant="subtitle2"
          sx={{
            ml: 1,
            fontWeight: 600,
            color: "text.primary",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: "0.75rem",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {children}
      </Box>
    </CardContent>
  </Card>
);

export default function Filter(props) {
  const { filterOption, setFilterOption, clearFilter, filterVisible } = props;
  
  const updateFilterOptions = useCallback((newFilterOption) => {
    setFilterOption(newFilterOption);
    localStorage.setItem("filterOption", JSON.stringify(newFilterOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!filterVisible) {
    return null;
  }
  
  const { keyword, brandId, categoryId, subCategoryId, locationId, sortId, fromYear, toYear, minPrice, maxPrice, minQty, maxQty } =
    filterOption;

  // Count active filters
  const activeFiltersCount = [
    keyword,
    brandId !== "ALL" && brandId,
    categoryId !== "ALL" && categoryId,
    subCategoryId !== "ALL" && subCategoryId,
    locationId !== "ALL" && locationId,
    fromYear,
    toYear,
    minPrice,
    maxPrice,
    minQty,
    maxQty,
    sortId !== "default" && sortId,
  ].filter(Boolean).length;

  return (
    <Box className="ventory-filter" sx={{ mt: 2 }}>
      {activeFiltersCount > 0 && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Active filters:
          </Typography>
          <Chip
            label={activeFiltersCount}
            size="small"
            sx={{
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              color: "#6366f1",
              fontWeight: 600,
            }}
          />
          <Button
            onClick={clearFilter}
            size="small"
            startIcon={<ClearIcon />}
            sx={{
              ml: "auto",
              textTransform: "none",
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
              },
            }}
          >
            Clear all
          </Button>
        </Box>
      )}
      <Grid container spacing={2}>
        {/* Search & Brand */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FilterSection
            title="Search & Brand"
            icon={<SearchIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          >
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  keyword: e.target.value,
                });
              }}
              label="Search items"
              variant="outlined"
              size="small"
              value={keyword || ""}
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />,
              }}
            />
            <BrandDropdown
              value={brandId}
              showAll={true}
              onChange={(brandId) => {
                updateFilterOptions({ ...filterOption, brandId });
              }}
            />
          </FilterSection>
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FilterSection
            title="Category"
            icon={<CategoryIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          >
            <CategoryDropdown
              value={categoryId}
              showAll={true}
              onChange={(categoryId) => {
                updateFilterOptions({ ...filterOption, categoryId });
              }}
            />
            <SubCategoryDropdown
              value={subCategoryId}
              showAll={true}
              onChange={(subCategoryId) => {
                updateFilterOptions({ ...filterOption, subCategoryId });
              }}
            />
          </FilterSection>
        </Grid>

        {/* Date Range */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FilterSection
            title="Date Range"
            icon={<CalendarTodayIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          >
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  fromYear: e.target.value,
                });
              }}
              type="number"
              label="From year"
              variant="outlined"
              size="small"
              value={fromYear || ""}
              fullWidth
            />
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  toYear: e.target.value,
                });
              }}
              type="number"
              label="To year"
              variant="outlined"
              size="small"
              value={toYear || ""}
              fullWidth
            />
          </FilterSection>
        </Grid>

        {/* Price Range */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FilterSection
            title="Price Range"
            icon={<AttachMoneyIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          >
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  minPrice: e.target.value,
                });
              }}
              type="number"
              label="Min price"
              variant="outlined"
              size="small"
              value={minPrice || ""}
              fullWidth
              InputProps={{
                startAdornment: <Typography sx={{ mr: 0.5, color: "text.secondary" }}>$</Typography>,
              }}
            />
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  maxPrice: e.target.value,
                });
              }}
              type="number"
              label="Max price"
              variant="outlined"
              size="small"
              value={maxPrice || ""}
              fullWidth
              InputProps={{
                startAdornment: <Typography sx={{ mr: 0.5, color: "text.secondary" }}>$</Typography>,
              }}
            />
          </FilterSection>
        </Grid>

        {/* Quantity Range */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FilterSection
            title="Quantity"
            icon={<InventoryIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          >
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  minQty: e.target.value,
                });
              }}
              type="number"
              label="Min quantity"
              variant="outlined"
              size="small"
              value={minQty || ""}
              fullWidth
            />
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  maxQty: e.target.value,
                });
              }}
              type="number"
              label="Max quantity"
              variant="outlined"
              size="small"
              value={maxQty || ""}
              fullWidth
            />
          </FilterSection>
        </Grid>

        {/* Location & Sort */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FilterSection
            title="Location & Sort"
            icon={<LocationOnIcon sx={{ fontSize: 18, color: "#6366f1" }} />}
          >
            <LocationDropdown
              value={locationId}
              showAll={true}
              onChange={(locationId) => {
                updateFilterOptions({ ...filterOption, locationId });
              }}
            />
            <Sorter
              value={sortId}
              onChange={(s) => {
                updateFilterOptions({ ...filterOption, sortId: s });
              }}
            />
          </FilterSection>
        </Grid>
      </Grid>
    </Box>
  );
}
