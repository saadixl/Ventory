import { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DateTimeLabel from "./DateTimeLabel";
import ItemMenu from "../widgets/ItemMenu";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import InboxIcon from "@mui/icons-material/Inbox";
import PlaceIcon from "@mui/icons-material/Place";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    color: "rgba(148, 163, 184, 0.55)",
    fontWeight: 500,
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderBottom: "1px solid rgba(148, 163, 184, 0.06)",
    padding: theme.spacing(1, 1.5),
    verticalAlign: "middle",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.78rem",
    borderBottom: "1px solid rgba(148, 163, 184, 0.05)",
    padding: theme.spacing(0.9, 1.5),
    verticalAlign: "middle",
    lineHeight: 1.3,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  transition: "background-color 0.15s ease",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.04)",
  },
  "&:last-child td, &:last-child th": {
    borderBottom: "none",
  },
}));

const EmptyState = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 8,
      px: 3,
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: "18px",
        background: "rgba(99, 102, 241, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
      }}
    >
      <InboxIcon sx={{ fontSize: 30, color: "#6366f1", opacity: 0.4 }} />
    </Box>
    <Typography variant="body1" sx={{ color: "rgba(241, 245, 249, 0.8)", fontWeight: 600, mb: 0.5, fontSize: "0.9rem" }}>
      No items found
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(148, 163, 184, 0.45)", fontSize: "0.78rem" }}>
      Try adjusting your filters or add some items
    </Typography>
  </Box>
);

export default function CustomizedTables(props) {
  const [showPrice, setShowPrice] = useState(false);

  const handleShowPrice = (e) => {
    setShowPrice(e.target.checked);
  };

  const { data, setDirtyUpdate } = props;

  if (!data.length) {
    return <EmptyState />;
  }

  const renderTableRows = data.map((row) => {
    const {
      name,
      categoryId,
      subCategoryId,
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
    } = row;

    const hasConfig = config != null && String(config).trim() !== "" && String(config) !== "NaN";
    const hasDesc = description != null && String(description).trim() !== "" && String(description) !== "NaN";
    const hasTags = tags && tags.length > 0;

    return (
      <StyledTableRow
        key={id}
        sx={{
          ...(quantity < 1 && { opacity: 0.4 }),
        }}
      >
        {/* Brand */}
        <StyledTableCell component="th" scope="row">
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.7rem",
              color: "#a5b4fc",
              letterSpacing: "0.02em",
            }}
          >
            {brandId}
          </Typography>
        </StyledTableCell>

        {/* Item */}
        <StyledTableCell component="th">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.15 }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
              <Typography
                sx={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.8rem", lineHeight: 1.3 }}
              >
                {name}
              </Typography>
              {hasConfig && (
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontFamily: "'SF Mono', 'Monaco', 'Consolas', monospace",
                    color: "rgba(167, 139, 250, 0.6)",
                    fontWeight: 500,
                  }}
                >
                  {String(config)}
                </Typography>
              )}
            </Box>
            {hasDesc && (
              <Typography
                sx={{
                  color: "rgba(148, 163, 184, 0.5)",
                  fontSize: "0.68rem",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 280,
                }}
              >
                {String(description)}
              </Typography>
            )}
            {hasTags && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mt: 0.2 }}>
                {tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag.label}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      borderRadius: "4px",
                      backgroundColor: "rgba(99, 102, 241, 0.08)",
                      border: "none",
                      color: "rgba(165, 180, 252, 0.7)",
                      "& .MuiChip-label": { px: 0.6 },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </StyledTableCell>

        {/* Category */}
        <StyledTableCell>
          <Typography sx={{ fontWeight: 500, fontSize: "0.75rem", color: "rgba(241, 245, 249, 0.8)", lineHeight: 1.2 }}>
            {categoryId}
          </Typography>
          {subCategoryId && (
            <Typography sx={{ color: "rgba(148, 163, 184, 0.4)", fontSize: "0.65rem" }}>
              {subCategoryId}
            </Typography>
          )}
        </StyledTableCell>

        {/* Gift */}
        <StyledTableCell align="center" sx={{ px: 0.5 }}>
          {isGift ? (
            <CardGiftcardIcon sx={{ color: "rgba(167, 139, 250, 0.5)", fontSize: 14 }} />
          ) : null}
        </StyledTableCell>

        {/* Price */}
        <StyledTableCell align="right">
          {showPrice ? (
            <Typography
              sx={{
                fontWeight: 600,
                fontFeatureSettings: "'tnum'",
                fontSize: "0.75rem",
                color: "#6ee7b7",
              }}
            >
              {typeof price === "number" && !Number.isNaN(price) ? (
                <>
                  <span style={{ opacity: 0.4, fontSize: "0.65rem" }}>$</span>
                  {price}
                </>
              ) : (
                <span style={{ color: "rgba(148, 163, 184, 0.2)" }}>—</span>
              )}
            </Typography>
          ) : (
            <VisibilityOffIcon sx={{ color: "rgba(148, 163, 184, 0.15)", fontSize: 14 }} />
          )}
        </StyledTableCell>

        {/* Quantity */}
        <StyledTableCell align="center">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 26,
              height: 22,
              borderRadius: "6px",
              px: 0.8,
              fontWeight: 700,
              fontSize: "0.72rem",
              fontFeatureSettings: "'tnum'",
              ...(quantity < 1
                ? { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }
                : quantity <= 2
                ? { backgroundColor: "rgba(245, 158, 11, 0.08)", color: "#fcd34d" }
                : { backgroundColor: "rgba(99, 102, 241, 0.08)", color: "#a5b4fc" }),
            }}
          >
            {quantity}
          </Box>
        </StyledTableCell>

        {/* Location */}
        <StyledTableCell align="right">
          {locationId && (
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.3 }}>
              <PlaceIcon sx={{ fontSize: 11, color: "rgba(148, 163, 184, 0.3)" }} />
              <Typography sx={{ fontSize: "0.68rem", color: "rgba(148, 163, 184, 0.55)" }}>
                {locationId}
              </Typography>
            </Box>
          )}
        </StyledTableCell>

        {/* Bought at */}
        <StyledTableCell align="right">
          <DateTimeLabel timestamp={createdTimestamp} />
        </StyledTableCell>

        {/* Last used */}
        <StyledTableCell align="right">
          <DateTimeLabel timestamp={lastUsedTimestamp} />
        </StyledTableCell>

        {/* Actions */}
        <StyledTableCell align="right" sx={{ px: 0.5 }}>
          <ItemMenu
            data={row}
            quantity={quantity}
            setDirtyUpdate={setDirtyUpdate}
            id={id}
          />
        </StyledTableCell>
      </StyledTableRow>
    );
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2.5,
        overflowX: "auto",
        overflowY: "hidden",
        boxShadow: "none",
        border: "1px solid rgba(148, 163, 184, 0.06)",
        background: "rgba(10, 15, 26, 0.4)",
      }}
    >
      <Table
        sx={{
          minWidth: 1000,
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
        aria-label="inventory table"
      >
        <colgroup>
          <col style={{ width: "8%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "4%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "6%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "4%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell>Brand</StyledTableCell>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="center" sx={{ px: 0.5 }}>Gift</StyledTableCell>
            <StyledTableCell align="right">
              <FormControlLabel
                control={
                  <Switch
                    checked={showPrice}
                    onChange={handleShowPrice}
                    size="small"
                    sx={{
                      transform: "scale(0.75)",
                      "& .MuiSwitch-switchBase.Mui-checked": { color: "#818cf8" },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#818cf8" },
                      "& .MuiSwitch-track": { backgroundColor: "rgba(148, 163, 184, 0.15)" },
                    }}
                  />
                }
                label="Price"
                labelPlacement="start"
                sx={{ margin: 0, gap: 0, "& .MuiFormControlLabel-label": { fontSize: "0.62rem" } }}
              />
            </StyledTableCell>
            <StyledTableCell align="center">Qty</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Bought</StyledTableCell>
            <StyledTableCell align="right">Last used</StyledTableCell>
            <StyledTableCell align="right" sx={{ px: 0.5 }}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
