import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import PlaceIcon from "@mui/icons-material/Place";
import InboxIcon from "@mui/icons-material/Inbox";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CategoryIcon from "./CategoryIcon";
import DateTimeLabel from "./DateTimeLabel";
import ItemMenu from "./ItemMenu";

const isValidText = (v) =>
  v != null &&
  !(typeof v === "number" && isNaN(v)) &&
  String(v).trim() !== "" &&
  String(v).trim().toLowerCase() !== "nan";

// ── Detail Modal ──

function DetailRow({ icon, label, children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 1.25 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: "rgba(99, 102, 241, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "rgba(148, 163, 184, 0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            lineHeight: 1.2,
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}

function ItemDetailModal({ item, open, onClose, setDirtyUpdate }) {
  if (!item) return null;

  const {
    name,
    categoryId,
    locationId,
    createdTimestamp,
    lastUsedTimestamp,
    description,
    price,
    quantity = 0,
    brandId,
    id,
    isGift,
    config,
    tags,
  } = item;

  const hasConfig = isValidText(config);
  const hasDesc = isValidText(description);
  const hasTags = tags && tags.length > 0;
  const hasPrice = typeof price === "number" && !Number.isNaN(price);

  const qtyColors =
    quantity < 1
      ? { bg: "rgba(239, 68, 68, 0.12)", text: "#fca5a5" }
      : quantity <= 2
      ? { bg: "rgba(245, 158, 11, 0.1)", text: "#fcd34d" }
      : { bg: "rgba(99, 102, 241, 0.1)", text: "#a5b4fc" };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "rgba(10, 15, 26, 0.97)",
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
            flexDirection: "column",
            alignItems: "center",
            pt: 4,
            pb: 3,
            px: 3,
            background: "rgba(2, 6, 23, 0.4)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.06)",
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 0.5 }}>
            <ItemMenu data={item} quantity={quantity} setDirtyUpdate={setDirtyUpdate} id={id} />
            <IconButton onClick={onClose} size="small" sx={{ color: "rgba(148, 163, 184, 0.5)" }}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <CategoryIcon categoryName={categoryId} size="xl" />

          {isValidText(brandId) && (
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#a5b4fc",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                mt: 2,
              }}
            >
              {brandId}
            </Typography>
          )}
          <Typography
            sx={{
              fontWeight: 700,
              color: "#f1f5f9",
              fontSize: "1.25rem",
              lineHeight: 1.3,
              mt: 0.5,
              textAlign: "center",
            }}
          >
            {name}
          </Typography>
          {hasConfig && (
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontFamily: "'SF Mono', 'Monaco', 'Consolas', monospace",
                color: "rgba(167, 139, 250, 0.6)",
                fontWeight: 500,
                mt: 0.5,
                textAlign: "center",
              }}
            >
              {String(config)}
            </Typography>
          )}
        </Box>

        {/* Details */}
        <Box sx={{ px: 3, py: 2 }}>
          {/* Description */}
          {hasDesc && (
            <>
              <DetailRow
                icon={<InfoOutlinedIcon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                label="Description"
              >
                <Typography sx={{ fontSize: "0.85rem", color: "rgba(241, 245, 249, 0.75)", lineHeight: 1.5 }}>
                  {String(description)}
                </Typography>
              </DetailRow>
              <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.06)" }} />
            </>
          )}

          {/* Category & Location row */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {isValidText(categoryId) && (
              <Box sx={{ flex: 1 }}>
                <DetailRow
                  icon={<Inventory2Icon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                  label="Category"
                >
                  <Typography sx={{ fontSize: "0.85rem", color: "#f1f5f9", fontWeight: 500 }}>
                    {categoryId}
                  </Typography>
                </DetailRow>
              </Box>
            )}
            {isValidText(locationId) && (
              <Box sx={{ flex: 1 }}>
                <DetailRow
                  icon={<PlaceIcon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                  label="Location"
                >
                  <Typography sx={{ fontSize: "0.85rem", color: "#f1f5f9", fontWeight: 500 }}>
                    {locationId}
                  </Typography>
                </DetailRow>
              </Box>
            )}
          </Box>
          <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.06)" }} />

          {/* Quantity, Price, Gift row */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <DetailRow
                icon={<Inventory2Icon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                label="Quantity"
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 1,
                    py: 0.25,
                    borderRadius: "8px",
                    backgroundColor: qtyColors.bg,
                  }}
                >
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: qtyColors.text }}>
                    {quantity}
                  </Typography>
                </Box>
              </DetailRow>
            </Box>
            {hasPrice && (
              <Box sx={{ flex: 1 }}>
                <DetailRow
                  icon={<AttachMoneyIcon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                  label="Price"
                >
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#6ee7b7" }}>
                    <span style={{ opacity: 0.5, fontSize: "0.8rem" }}>$</span>
                    {price}
                  </Typography>
                </DetailRow>
              </Box>
            )}
            {isGift && (
              <Box sx={{ flex: 1 }}>
                <DetailRow
                  icon={<CardGiftcardIcon sx={{ fontSize: 16, color: "rgba(167, 139, 250, 0.6)" }} />}
                  label="Gift"
                >
                  <Typography sx={{ fontSize: "0.85rem", color: "#a78bfa", fontWeight: 500 }}>
                    Yes
                  </Typography>
                </DetailRow>
              </Box>
            )}
          </Box>
          <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.06)" }} />

          {/* Dates row */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {createdTimestamp && (
              <Box sx={{ flex: 1 }}>
                <DetailRow
                  icon={<CalendarTodayIcon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                  label="Purchased"
                >
                  <DateTimeLabel timestamp={createdTimestamp} />
                </DetailRow>
              </Box>
            )}
            {lastUsedTimestamp && (
              <Box sx={{ flex: 1 }}>
                <DetailRow
                  icon={<UpdateIcon sx={{ fontSize: 16, color: "rgba(148, 163, 184, 0.5)" }} />}
                  label="Last used"
                >
                  <DateTimeLabel timestamp={lastUsedTimestamp} />
                </DetailRow>
              </Box>
            )}
          </Box>

          {/* Tags */}
          {hasTags && (
            <>
              <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.06)" }} />
              <Box sx={{ py: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "rgba(148, 163, 184, 0.45)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    mb: 1,
                  }}
                >
                  Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag.label}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        borderRadius: "8px",
                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                        color: "rgba(165, 180, 252, 0.8)",
                        "& .MuiChip-label": { px: 1 },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ── Simplified Card ──

function ItemCard({ item, setDirtyUpdate, onOpenDetail }) {
  const { name, categoryId, createdTimestamp, quantity = 0, id, brandId } = item;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        background: "rgba(10, 15, 26, 0.6)",
        border: "1px solid rgba(148, 163, 184, 0.08)",
        overflow: "hidden",
        transition: "all 0.2s ease",
        opacity: quantity < 1 ? 0.5 : 1,
        "&:hover": {
          borderColor: "rgba(99, 102, 241, 0.25)",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.08)",
        },
      }}
    >
      {/* Menu button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1, pt: 0.5 }}>
        <ItemMenu data={item} quantity={quantity} setDirtyUpdate={setDirtyUpdate} id={id} />
      </Box>

      {/* Clickable Icon */}
      <Box
        onClick={() => onOpenDetail(item)}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: -0.5,
          mb: 1.5,
          cursor: "pointer",
          "&:hover .category-icon-box": {
            transform: "scale(1.08)",
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.2)",
          },
        }}
      >
        <Box className="category-icon-box" sx={{ transition: "all 0.2s ease" }}>
          <CategoryIcon categoryName={categoryId} size="xl" />
        </Box>
      </Box>

      {/* Name + Brand */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: "#f1f5f9",
            fontSize: "0.92rem",
            lineHeight: 1.3,
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>
        {isValidText(brandId) && (
          <Typography
            sx={{
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#a5b4fc",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textAlign: "center",
              mt: 0.5,
            }}
          >
            {brandId}
          </Typography>
        )}
      </Box>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.25,
          borderTop: "1px solid rgba(148, 163, 184, 0.06)",
          background: "rgba(2, 6, 23, 0.3)",
        }}
      >
        {isValidText(categoryId) ? (
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "rgba(148, 163, 184, 0.4)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {categoryId}
          </Typography>
        ) : (
          <Box />
        )}

        {createdTimestamp && (
          <Typography
            sx={{
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "rgba(148, 163, 184, 0.4)",
              fontFeatureSettings: "'tnum'",
            }}
          >
            {new Date(createdTimestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// ── Empty State ──

const EmptyState = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 10,
      px: 3,
      gridColumn: "1 / -1",
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "24px",
        background: "rgba(99, 102, 241, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2.5,
      }}
    >
      <InboxIcon sx={{ fontSize: 36, color: "#6366f1", opacity: 0.35 }} />
    </Box>
    <Typography sx={{ color: "rgba(241, 245, 249, 0.8)", fontWeight: 600, mb: 0.5, fontSize: "1rem" }}>
      No items found
    </Typography>
    <Typography sx={{ color: "rgba(148, 163, 184, 0.4)", fontSize: "0.82rem" }}>
      Try adjusting your filters or add some items
    </Typography>
  </Box>
);

// ── Grid ──

export default function ItemCardGrid({ data, setDirtyUpdate }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 2,
        }}
      >
        {data.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            setDirtyUpdate={setDirtyUpdate}
            onOpenDetail={setSelectedItem}
          />
        ))}
      </Box>

      <ItemDetailModal
        item={selectedItem}
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        setDirtyUpdate={setDirtyUpdate}
      />
    </Box>
  );
}
