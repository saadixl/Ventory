import { useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Skeleton from "@mui/material/Skeleton";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import InventoryIcon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "./Dropdowns";

const StatCard = ({ icon, label, value, color, loading }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.25,
      px: 1.5,
      py: 1,
      flex: 1,
      minWidth: 0,
      borderRadius: 2,
      background: "rgba(2, 6, 23, 0.4)",
      border: "1px solid rgba(148, 163, 184, 0.06)",
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
        sx={{
          color: "rgba(148, 163, 184, 0.5)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>
      {loading ? (
        <Skeleton
          width={32}
          height={20}
          sx={{ bgcolor: "rgba(148, 163, 184, 0.1)" }}
        />
      ) : (
        <Typography
          sx={{ fontWeight: 700, color, lineHeight: 1.2, fontSize: "1rem" }}
        >
          {value}
        </Typography>
      )}
    </Box>
  </Box>
);

export default function Filter(props) {
  const {
    filterOption,
    setFilterOption,
    clearFilter,
    filterVisible,
    setFilterVisible,
    stats,
    loading,
  } = props;

  const updateFilterOptions = useCallback(
    (newFilterOption) => {
      setFilterOption(newFilterOption);
      localStorage.setItem("filterOption", JSON.stringify(newFilterOption));
    },
    [setFilterOption]
  );

  const {
    brandId,
    categoryId,
    subCategoryId,
    locationId,
    fromYear,
    toYear,
    minPrice,
    maxPrice,
    minQty,
    maxQty,
  } = filterOption;

  const activeFiltersCount = [
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
  ].filter(Boolean).length;

  const handleClose = () => setFilterVisible(false);

  return (
    <Dialog
      open={!!filterVisible}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "rgba(30, 41, 59, 0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          borderRadius: 4,
          boxShadow: "0 32px 64px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 1.5,
            borderBottom: "1px solid rgba(148, 163, 184, 0.06)",
          }}
        >
          <TuneIcon sx={{ fontSize: 16, color: "#6366f1" }} />
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "0.02em",
            }}
          >
            Filters & Stats
          </Typography>
          {activeFiltersCount > 0 && (
            <Box
              sx={{
                px: 0.8,
                py: 0.1,
                borderRadius: "6px",
                background: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#818cf8",
                }}
              >
                {activeFiltersCount}
              </Typography>
            </Box>
          )}
          <Box sx={{ flex: 1 }} />
          {activeFiltersCount > 0 && (
            <Button
              onClick={clearFilter}
              size="small"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              sx={{
                textTransform: "none",
                fontSize: "0.72rem",
                color: "rgba(148, 163, 184, 0.5)",
                px: 1,
                py: 0.25,
                minHeight: 0,
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                  color: "#ef4444",
                },
              }}
            >
              Clear all
            </Button>
          )}
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "rgba(148, 163, 184, 0.5)" }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Stats */}
        {stats && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              px: 2.5,
              py: 2,
              borderBottom: "1px solid rgba(148, 163, 184, 0.06)",
            }}
          >
            <StatCard
              icon={<InventoryIcon sx={{ fontSize: 16, color: "#6366f1" }} />}
              label="Total Items"
              value={stats.totalItems}
              color="#6366f1"
              loading={loading}
            />
            <StatCard
              icon={<CategoryIcon sx={{ fontSize: 16, color: "#8b5cf6" }} />}
              label="Categories"
              value={stats.uniqueCategories}
              color="#8b5cf6"
              loading={loading}
            />
            <StatCard
              icon={
                <WarningAmberIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
              }
              label="Out of Stock"
              value={stats.outOfStock}
              color={stats.outOfStock > 0 ? "#f59e0b" : "#10b981"}
              loading={loading}
            />
            <StatCard
              icon={
                <AttachMoneyIcon sx={{ fontSize: 16, color: "#10b981" }} />
              }
              label="Total Value"
              value={`$${stats.totalValue.toLocaleString()}`}
              color="#10b981"
              loading={loading}
            />
          </Box>
        )}

        {/* Filters */}
        <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
          {/* Dropdowns row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 1,
            }}
          >
            <BrandDropdown
              value={brandId}
              showAll={true}
              onChange={(brandId) => {
                updateFilterOptions({ ...filterOption, brandId });
              }}
            />
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
            <LocationDropdown
              value={locationId}
              showAll={true}
              onChange={(locationId) => {
                updateFilterOptions({ ...filterOption, locationId });
              }}
            />
          </Box>

          {/* Range filters */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "repeat(3, 1fr)",
                md: "repeat(6, 1fr)",
              },
              gap: 1,
              mt: 1.5,
              pt: 1.5,
              borderTop: "1px solid rgba(148, 163, 184, 0.05)",
            }}
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
                startAdornment: (
                  <Typography sx={{ mr: 0.5, color: "text.secondary" }}>
                    $
                  </Typography>
                ),
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
                startAdornment: (
                  <Typography sx={{ mr: 0.5, color: "text.secondary" }}>
                    $
                  </Typography>
                ),
              }}
            />
            <TextField
              onChange={(e) => {
                updateFilterOptions({
                  ...filterOption,
                  minQty: e.target.value,
                });
              }}
              type="number"
              label="Min qty"
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
              label="Max qty"
              variant="outlined"
              size="small"
              value={maxQty || ""}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
