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
    backgroundColor: "rgba(15, 23, 42, 0.98)",
    color: "rgba(148, 163, 184, 0.9)",
    fontWeight: 600,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
    padding: theme.spacing(2.25, 2),
    verticalAlign: "middle",
    lineHeight: 1.4,
    position: "sticky",
    top: 0,
    zIndex: 1,
    "&:first-of-type": {
      borderTopLeftRadius: 12,
    },
    "&:last-of-type": {
      borderTopRightRadius: 12,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
    padding: theme.spacing(1.75, 2),
    verticalAlign: "middle",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.15s ease, box-shadow 0.15s ease",
  position: "relative",
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(148, 163, 184, 0.02)",
  },
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.06) !important",
    "& td:first-of-type, & th:first-of-type": {
      boxShadow: "inset 3px 0 0 0 #6366f1",
    },
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
      py: 10,
      px: 3,
    }}
  >
    <Box
      sx={{
        width: 72,
        height: 72,
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 3,
      }}
    >
      <InboxIcon sx={{ fontSize: 36, color: "#6366f1", opacity: 0.5 }} />
    </Box>
    <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600, mb: 0.5 }}>
      No items found
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.6 }}>
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

    return (
      <StyledTableRow
        key={id}
        sx={{
          ...(quantity < 1 && {
            opacity: 0.45,
          }),
        }}
      >
        {/* Brand */}
        <StyledTableCell component="th" scope="row">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              border: "1px solid rgba(99, 102, 241, 0.12)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.78rem",
                color: "#c7d2fe",
                letterSpacing: "0.01em",
              }}
            >
              {brandId}
            </Typography>
          </Box>
        </StyledTableCell>

        {/* Item */}
        <StyledTableCell
          component="th"
          sx={{ wordWrap: "break-word", overflowWrap: "break-word", verticalAlign: "top" }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#f1f5f9", lineHeight: 1.4 }}
          >
            {name}
          </Typography>
          {config != null && String(config).trim() !== "" && String(config) !== "NaN" && (
            <Box
              sx={{
                mt: 0.5,
                px: 1,
                py: 0.3,
                borderRadius: "6px",
                backgroundColor: "rgba(167, 139, 250, 0.08)",
                border: "1px solid rgba(167, 139, 250, 0.12)",
                display: "inline-block",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontFamily: "'SF Mono', 'Monaco', 'Consolas', monospace",
                  color: "#a78bfa",
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {String(config)}
              </Typography>
            </Box>
          )}
          {description != null && String(description).trim() !== "" && String(description) !== "NaN" && (
            <Typography
              sx={{
                color: "rgba(148, 163, 184, 0.75)",
                fontSize: "0.75rem",
                lineHeight: 1.5,
                mt: 0.5,
                wordWrap: "break-word",
              }}
            >
              {String(description)}
            </Typography>
          )}
          {tags && tags.length > 0 && (
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag.label}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    color: "#a5b4fc",
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              ))}
            </Box>
          )}
        </StyledTableCell>

        {/* Category */}
        <StyledTableCell sx={{ verticalAlign: "top" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.82rem" }}
            >
              {categoryId}
            </Typography>
            {subCategoryId && (
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(148, 163, 184, 0.6)",
                  fontSize: "0.7rem",
                }}
              >
                {subCategoryId}
              </Typography>
            )}
          </Box>
        </StyledTableCell>

        {/* Gift */}
        <StyledTableCell align="center">
          {isGift ? (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "8px",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
              }}
            >
              <CardGiftcardIcon sx={{ color: "#a78bfa", fontSize: 16 }} />
            </Box>
          ) : null}
        </StyledTableCell>

        {/* Price */}
        <StyledTableCell align="center">
          {showPrice ? (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontFeatureSettings: "'tnum'",
                fontSize: "0.82rem",
                color: "#10b981",
              }}
            >
              {typeof price === "number" && !Number.isNaN(price) ? (
                <>
                  <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>$</span>
                  {price}
                </>
              ) : (
                <span style={{ color: "rgba(148, 163, 184, 0.4)", fontSize: "0.75rem" }}>—</span>
              )}
            </Typography>
          ) : (
            <VisibilityOffIcon sx={{ color: "rgba(148, 163, 184, 0.3)", fontSize: 16 }} />
          )}
        </StyledTableCell>

        {/* Quantity */}
        <StyledTableCell align="center">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 36,
              height: 28,
              borderRadius: "10px",
              px: 1.2,
              fontWeight: 700,
              fontSize: "0.82rem",
              fontFeatureSettings: "'tnum'",
              ...(quantity < 1
                ? {
                    backgroundColor: "rgba(239, 68, 68, 0.12)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }
                : quantity <= 2
                ? {
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    color: "#fbbf24",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                  }
                : {
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    color: "#818cf8",
                    border: "1px solid rgba(99, 102, 241, 0.15)",
                  }),
            }}
          >
            {quantity}
          </Box>
        </StyledTableCell>

        {/* Location */}
        <StyledTableCell align="right">
          {locationId && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1,
                py: 0.3,
                borderRadius: "8px",
                backgroundColor: "rgba(148, 163, 184, 0.06)",
                border: "1px solid rgba(148, 163, 184, 0.08)",
              }}
            >
              <PlaceIcon sx={{ fontSize: 13, color: "rgba(148, 163, 184, 0.5)" }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.8)" }}
              >
                {locationId}
              </Typography>
            </Box>
          )}
        </StyledTableCell>

        {/* Bought at */}
        <StyledTableCell align="right" sx={{ verticalAlign: "top" }}>
          <DateTimeLabel timestamp={createdTimestamp} />
        </StyledTableCell>

        {/* Last used */}
        <StyledTableCell align="right" sx={{ verticalAlign: "top" }}>
          <DateTimeLabel timestamp={lastUsedTimestamp} />
        </StyledTableCell>

        {/* Actions */}
        <StyledTableCell align="right" sx={{ verticalAlign: "middle" }}>
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
        borderRadius: 3,
        overflowX: "auto",
        overflowY: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        background: "rgba(15, 23, 42, 0.4)",
      }}
    >
      <Table
        sx={{
          minWidth: 1200,
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
        aria-label="inventory table"
      >
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "24%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "11%" }} />
          <col style={{ width: "3%" }} />
        </colgroup>
        <TableHead>
          <TableRow sx={{ "& th": { minHeight: 52, boxSizing: "border-box" } }}>
            <StyledTableCell>Brand</StyledTableCell>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>Gift</StyledTableCell>
            <StyledTableCell align="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={showPrice}
                    onChange={handleShowPrice}
                    size="small"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#6366f1",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#6366f1",
                      },
                    }}
                  />
                }
                label="Price"
                labelPlacement="start"
                sx={{ margin: 0, "& .MuiFormControlLabel-label": { fontSize: "0.68rem" } }}
              />
            </StyledTableCell>
            <StyledTableCell align="center">Qty</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Bought</StyledTableCell>
            <StyledTableCell align="right">Last used</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
