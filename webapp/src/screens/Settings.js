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
import MuiCategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StyleIcon from "@mui/icons-material/Style";
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  getInventoryOptions,
  addInventoryOptions,
  deleteInventoryOptions,
} from "../services/api";
import { clearCache } from "../services/cache";
import { signInWithGoogle, signOut } from "../services/auth";
import { auth } from "../services/firebase";
import Loader from "../widgets/Loader";

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
  { key: "categories", label: "Categories", icon: <MuiCategoryIcon sx={{ fontSize: 18 }} />, color: "#8b5cf6", collection: inventoryOptions.CATEGORIES, description: "Organize items by category" },
  { key: "subcategories", label: "Sub-categories", icon: <AccountTreeIcon sx={{ fontSize: 18 }} />, color: "#a78bfa", collection: inventoryOptions.SUBCATEGORIES, description: "Add finer-grained groupings" },
  { key: "locations", label: "Locations", icon: <LocationOnIcon sx={{ fontSize: 18 }} />, color: "#10b981", collection: inventoryOptions.LOCATIONS, description: "Where you store your items" },
  { key: "tags", label: "Tags", icon: <StyleIcon sx={{ fontSize: 18 }} />, color: "#f59e0b", collection: inventoryOptions.TAGS, description: "Labels for quick search and filtering" },
];

function InventorySection() {
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
  );
}

function AccountSection() {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
      } else {
        setName();
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader message="Verifying authentication." />;

  if (name) {
    return (
      <Paper
        sx={{
          p: 3,
          background: "rgba(10, 15, 26, 0.5)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(148, 163, 184, 0.08)",
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            }}
          >
            <PersonIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
              Logged in as
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.3 }}>
              {name}
            </Typography>
          </Box>
          <Button
            onClick={signOut}
            startIcon={<LogoutIcon />}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                borderColor: "rgba(239, 68, 68, 0.5)",
                backgroundColor: "rgba(239, 68, 68, 0.05)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
        background: "rgba(10, 15, 26, 0.5)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(148, 163, 184, 0.08)",
        borderRadius: 3,
        textAlign: "center",
        maxWidth: 400,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "16px",
          background: "rgba(99, 102, 241, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        <PersonIcon sx={{ color: "#6366f1", fontSize: 28 }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Welcome to Ventory
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Sign in to manage your inventory
      </Typography>
      <Button
        onClick={signInWithGoogle}
        startIcon={<GoogleIcon />}
        fullWidth
        variant="contained"
        sx={{
          py: 1.2,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
          },
        }}
      >
        Login with Google
      </Button>
    </Paper>
  );
}

const SectionHeader = ({ title }) => (
  <Typography
    sx={{
      fontSize: "0.72rem",
      fontWeight: 600,
      color: "rgba(148, 163, 184, 0.4)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      mb: 1.5,
    }}
  >
    {title}
  </Typography>
);

function Settings() {
  return (
    <AuthenticatedLayout screenName="Settings" activeScreen="settings">
      <Box className="animate-fade-in" sx={{ maxWidth: 900, mx: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Account Section */}
        <Box>
          <SectionHeader title="Account" />
          <AccountSection />
        </Box>

        {/* Inventory Section */}
        <Box>
          <SectionHeader title="Inventory Options" />
          <InventorySection />
        </Box>

        {/* Clear Cache */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

export default Settings;
