import Box from "@mui/material/Box";
import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BuildIcon from "@mui/icons-material/Build";
import ChairIcon from "@mui/icons-material/Chair";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BrushIcon from "@mui/icons-material/Brush";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PetsIcon from "@mui/icons-material/Pets";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WatchIcon from "@mui/icons-material/Watch";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import LaptopIcon from "@mui/icons-material/Laptop";
import BackpackIcon from "@mui/icons-material/Backpack";
import HomeIcon from "@mui/icons-material/Home";
import DiamondIcon from "@mui/icons-material/Diamond";
import EditIcon from "@mui/icons-material/Edit";

const CATEGORY_MAP = [
  { keywords: ["pen", "fountain pen", "ballpoint", "stationery", "writing"], icon: EditIcon, color: "#64748b" },
  { keywords: ["watch", "timepiece", "horology"], icon: WatchIcon, color: "#f59e0b" },
  { keywords: ["photo", "camera", "lens", "tripod"], icon: CameraAltIcon, color: "#06b6d4" },
  { keywords: ["audio", "headphone", "speaker", "earphone", "earbuds"], icon: HeadphonesIcon, color: "#a855f7" },
  { keywords: ["comput", "laptop", "desktop", "pc", "monitor"], icon: LaptopIcon, color: "#3b82f6" },
  { keywords: ["game", "gaming", "console", "play"], icon: SportsEsportsIcon, color: "#10b981" },
  { keywords: ["organiz", "storage", "container", "office"], icon: BackpackIcon, color: "#f97316" },
  { keywords: ["backpack", "bag", "luggage", "travel", "carry"], icon: BackpackIcon, color: "#f97316" },
  { keywords: ["home", "house", "living", "decor"], icon: HomeIcon, color: "#8b5cf6" },
  { keywords: ["jewel", "accessory", "ring", "necklace", "bracelet"], icon: DiamondIcon, color: "#ec4899" },
  { keywords: ["electron", "tech", "gadget", "device", "phone", "charger", "power"], icon: DevicesIcon, color: "#6366f1" },
  { keywords: ["cloth", "wear", "fashion", "apparel", "shirt", "shoe", "dress"], icon: CheckroomIcon, color: "#ec4899" },
  { keywords: ["kitchen", "cook", "utensil", "appliance"], icon: KitchenIcon, color: "#f59e0b" },
  { keywords: ["book", "read", "novel", "magazine"], icon: MenuBookIcon, color: "#8b5cf6" },
  { keywords: ["tool", "hardware", "repair"], icon: BuildIcon, color: "#64748b" },
  { keywords: ["furniture", "chair", "table", "desk", "shelf", "bed"], icon: ChairIcon, color: "#a78bfa" },
  { keywords: ["fitness", "gym", "sport", "exercise", "workout"], icon: FitnessCenterIcon, color: "#ef4444" },
  { keywords: ["car", "auto", "vehicle", "motor"], icon: DirectionsCarIcon, color: "#3b82f6" },
  { keywords: ["grocery", "food", "snack", "drink", "beverage"], icon: LocalGroceryStoreIcon, color: "#22c55e" },
  { keywords: ["health", "medical", "medicine", "pharma"], icon: MedicalServicesIcon, color: "#f43f5e" },
  { keywords: ["art", "craft", "paint", "draw", "design"], icon: BrushIcon, color: "#f97316" },
  { keywords: ["music", "sound", "instrument"], icon: MusicNoteIcon, color: "#a855f7" },
  { keywords: ["pet", "animal", "dog", "cat"], icon: PetsIcon, color: "#facc15" },
  { keywords: ["personal", "care", "beauty", "hygiene"], icon: SelfImprovementIcon, color: "#14b8a6" },
];

function matchCategory(name) {
  if (!name) return null;
  const lower = name.toLowerCase();
  for (const entry of CATEGORY_MAP) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { Icon: entry.icon, color: entry.color };
    }
  }
  return null;
}

function resolveIcon(categoryName, subCategoryName) {
  return (
    matchCategory(subCategoryName) ||
    matchCategory(categoryName) ||
    { Icon: Inventory2Icon, color: "#6366f1" }
  );
}

export default function CategoryIcon({ categoryName, subCategoryName, size = "md" }) {
  const { Icon: DisplayIcon, color: displayColor } = resolveIcon(categoryName, subCategoryName);

  const sizes = {
    sm: { box: 40, icon: 20, radius: "12px" },
    md: { box: 56, icon: 28, radius: "16px" },
    lg: { box: 72, icon: 36, radius: "20px" },
    xl: { box: 88, icon: 44, radius: "24px" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <Box
      sx={{
        width: s.box,
        height: s.box,
        borderRadius: s.radius,
        background: `${displayColor}15`,
        border: `1px solid ${displayColor}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.2s ease",
      }}
    >
      <DisplayIcon sx={{ fontSize: s.icon, color: displayColor, opacity: 0.85 }} />
    </Box>
  );
}

export { resolveIcon };
