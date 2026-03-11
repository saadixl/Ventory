import moment from "moment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DateTimeLabel(props) {
  if (!props.timestamp) return null;
  const m = moment(props.timestamp);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.7rem",
          fontWeight: 500,
          color: "rgba(241, 245, 249, 0.7)",
          fontFeatureSettings: "'tnum'",
          lineHeight: 1.3,
        }}
      >
        {m.format("MMM DD, YYYY")}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.6rem",
          color: "rgba(148, 163, 184, 0.4)",
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        {m.fromNow()}
      </Typography>
    </Box>
  );
}
