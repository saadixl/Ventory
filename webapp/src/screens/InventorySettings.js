import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CreatableSelect from "react-select/creatable";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StyleIcon from "@mui/icons-material/Style";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  getInventoryOptions,
  addInventoryOptions,
  deleteInventoryOptions,
} from "../services/api";
import { clearCache } from "../services/cache";

const inventoryOptions = {
  BRANDS: "Brands",
  CATEGORIES: "Categories",
  SUBCATEGORIES: "Subcategories",
  LOCATIONS: "Locations",
  TAGS: "Tags",
};

const customSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#6366f1" : "rgba(148, 163, 184, 0.15)",
    backgroundColor: "rgba(10, 15, 26, 0.8)",
    color: "#fff",
    borderRadius: 10,
    minHeight: 44,
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "rgba(99, 102, 241, 0.1)" : "#0a0f1a",
  }),
};

const TAB_CONFIG = [
  { key: "brands", label: "Brands", icon: <LocalOfferIcon sx={{ fontSize: 18 }} />, color: "#6366f1", collection: inventoryOptions.BRANDS, description: "Manage product brands" },
  { key: "categories", label: "Categories", icon: <CategoryIcon sx={{ fontSize: 18 }} />, color: "#8b5cf6", collection: inventoryOptions.CATEGORIES, description: "Organize items by category" },
  { key: "subcategories", label: "Sub-categories", icon: <AccountTreeIcon sx={{ fontSize: 18 }} />, color: "#a78bfa", collection: inventoryOptions.SUBCATEGORIES, description: "Add finer-grained groupings" },
  { key: "locations", label: "Locations", icon: <LocationOnIcon sx={{ fontSize: 18 }} />, color: "#10b981", collection: inventoryOptions.LOCATIONS, description: "Where you store your items" },
  { key: "tags", label: "Tags", icon: <StyleIcon sx={{ fontSize: 18 }} />, color: "#f59e0b", collection: inventoryOptions.TAGS, description: "Labels for quick search and filtering" },
];

function InventorySettings() {
  const [activeTab, setActiveTab] = useState(0);
  const [optionsData, setOptionsData] = useState({});
  const [dirtyUpdates, setDirtyUpdates] = useState({});

  const fetchOptions = async (collectionName) => {
    const options = await getInventoryOptions({ collectionName });
    setOptionsData((prev) => ({ ...prev, [collectionName]: options }));
  };

  useEffect(() => {
    TAB_CONFIG.forEach((tab) => fetchOptions(tab.collection));
  }, []);

  useEffect(() => {
    const tab = TAB_CONFIG[activeTab];
    if (tab && dirtyUpdates[tab.collection]) {
      fetchOptions(tab.collection);
    }
  }, [dirtyUpdates, activeTab]);

  const handleCreate = async (newValue, collectionName) => {
    await addInventoryOptions({ collectionName, label: newValue });
    setDirtyUpdates((prev) => ({ ...prev, [collectionName]: Date.now() }));
    fetchOptions(collectionName);
  };

  const handleChange = async (newValue, actionMeta, collectionName) => {
    if (actionMeta.action === "remove-value" && actionMeta.removedValue) {
      const optionId = actionMeta.removedValue.value;
      await deleteInventoryOptions({ collectionName, id: optionId });
      setDirtyUpdates((prev) => ({ ...prev, [collectionName]: Date.now() }));
      fetchOptions(collectionName);
    }
  };

  const currentTab = TAB_CONFIG[activeTab];
  const currentOptions = optionsData[currentTab.collection] || [];

  return (
    <AuthenticatedLayout
      screenName="Inventory settings"
      activeScreen="inventorysettings"
    >
      <Box className="animate-fade-in" sx={{ maxWidth: 900, mx: "auto" }}>
        <Paper
          sx={{
            background: "rgba(10, 15, 26, 0.5)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(148, 163, 184, 0.08)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <Box sx={{ borderBottom: "1px solid rgba(148, 163, 184, 0.08)" }}>
            <Tabs
              value={activeTab}
              onChange={(_, val) => setActiveTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: 1,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.82rem",
                  color: "rgba(148, 163, 184, 0.6)",
                  minHeight: 56,
                  gap: 0.75,
                  "&.Mui-selected": {
                    color: currentTab.color,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: currentTab.color,
                  height: 2,
                },
              }}
            >
              {TAB_CONFIG.map((tab) => (
                <Tab
                  key={tab.key}
                  icon={tab.icon}
                  iconPosition="start"
                  label={tab.label}
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "14px",
                  background: `${currentTab.color}12`,
                  border: `1px solid ${currentTab.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {currentTab.icon}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "1.05rem", color: "#f1f5f9" }}>
                  {currentTab.label}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.45)" }}>
                  {currentTab.description}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }} />
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "10px",
                  background: "rgba(148, 163, 184, 0.06)",
                }}
              >
                <Typography sx={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.5)", fontWeight: 500 }}>
                  {currentOptions.length} {currentOptions.length === 1 ? "item" : "items"}
                </Typography>
              </Box>
            </Box>

            {/* Creatable Select */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                border: "1px solid rgba(148, 163, 184, 0.06)",
                background: "rgba(2, 6, 23, 0.3)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: "rgba(148, 163, 184, 0.4)",
                  mb: 1.5,
                  fontWeight: 500,
                }}
              >
                Type to create new or remove existing {currentTab.label.toLowerCase()}
              </Typography>
              <CreatableSelect
                classNamePrefix="react-select"
                styles={customSelectStyle}
                isMulti
                isClearable
                options={currentOptions}
                value={currentOptions}
                onChange={(newValue, actionMeta) => {
                  handleChange(newValue, actionMeta, currentTab.collection);
                }}
                onCreateOption={(newValue) => {
                  handleCreate(newValue, currentTab.collection);
                }}
                placeholder={`Add a ${currentTab.label.toLowerCase().replace(/s$/, "")}...`}
              />
            </Box>
          </Box>
        </Paper>

        {/* Clear Cache */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={clearCache}
            startIcon={<AutorenewIcon />}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "rgba(148, 163, 184, 0.15)",
              color: "text.secondary",
              borderRadius: 2,
              "&:hover": {
                borderColor: "rgba(99, 102, 241, 0.4)",
                backgroundColor: "rgba(99, 102, 241, 0.05)",
                color: "#6366f1",
              },
            }}
          >
            Clear cache
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}

export default InventorySettings;
