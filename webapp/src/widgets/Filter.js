import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Sorter from "./Sorter";

import {
  LocationDropdown,
  BrandDropdown,
  CategoryDropdown,
  SubCategoryDropdown,
} from "./Dropdowns";

export default function Filter(props) {
  const { filterOption, setFilterOption, clearFilter, filterVisible } = props;
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilterOptions = useCallback(
    (newFilterOption) => {
      setFilterOption(newFilterOption);
      localStorage.setItem("filterOption", JSON.stringify(newFilterOption));
    },
    [setFilterOption]
  );

  if (!filterVisible) {
    return null;
  }

  const {
    keyword,
    brandId,
    categoryId,
    subCategoryId,
    locationId,
    sortId,
    fromYear,
    toYear,
    minPrice,
    maxPrice,
    minQty,
    maxQty,
  } = filterOption;

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

  const advancedActive = [fromYear, toYear, minPrice, maxPrice, minQty, maxQty].filter(Boolean).length;

  return (
    <Paper
      className="ventory-filter"
      sx={{
        background: "rgba(10, 15, 26, 0.5)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(148, 163, 184, 0.08)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
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
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#f1f5f9",
            letterSpacing: "0.02em",
          }}
        >
          Filters
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
      </Box>

      {/* Main filters */}
      <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
        {/* Search row */}
        <TextField
          onChange={(e) => {
            updateFilterOptions({ ...filterOption, keyword: e.target.value });
          }}
          label="Search items"
          variant="outlined"
          size="small"
          value={keyword || ""}
          fullWidth
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{ mr: 1, fontSize: 18, color: "rgba(148, 163, 184, 0.4)" }}
              />
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Dropdowns row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr 1fr",
            },
            gap: 1.5,
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
          <Sorter
            value={sortId}
            onChange={(s) => {
              updateFilterOptions({ ...filterOption, sortId: s });
            }}
          />
        </Box>

        {/* Advanced toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            pt: 1.5,
            borderTop: "1px solid rgba(148, 163, 184, 0.05)",
          }}
        >
          <IconButton
            onClick={() => setShowAdvanced(!showAdvanced)}
            size="small"
            sx={{
              borderRadius: "8px",
              color: "rgba(148, 163, 184, 0.45)",
              p: 0.5,
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.08)",
                color: "#818cf8",
              },
            }}
          >
            {showAdvanced ? (
              <ExpandLessIcon sx={{ fontSize: 16 }} />
            ) : (
              <ExpandMoreIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
          <Typography
            onClick={() => setShowAdvanced(!showAdvanced)}
            sx={{
              fontSize: "0.7rem",
              color: "rgba(148, 163, 184, 0.4)",
              cursor: "pointer",
              userSelect: "none",
              "&:hover": { color: "rgba(148, 163, 184, 0.6)" },
            }}
          >
            Range filters
          </Typography>
          {advancedActive > 0 && (
            <Box
              sx={{
                ml: 0.75,
                px: 0.6,
                py: 0.1,
                borderRadius: "5px",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <Typography
                sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#f59e0b" }}
              >
                {advancedActive}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Advanced filters */}
        <Collapse in={showAdvanced}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "1fr 1fr 1fr",
                md: "repeat(6, 1fr)",
              },
              gap: 1.5,
              mt: 1.5,
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
        </Collapse>
      </Box>
    </Paper>
  );
}
