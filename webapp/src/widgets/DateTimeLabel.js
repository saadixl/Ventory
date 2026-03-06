import moment from "moment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DateTimeLabel(props) {
  if (!props.timestamp) return null;
  const m = moment(props.timestamp);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.2 }}>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "rgba(241, 245, 249, 0.8)",
          fontFeatureSettings: "'tnum'",
        }}
      >
        {m.format("MMM DD, YYYY")}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.65rem",
          color: "rgba(148, 163, 184, 0.5)",
          fontWeight: 400,
        }}
      >
        {m.fromNow()}
      </Typography>
    </Box>
  );
}
