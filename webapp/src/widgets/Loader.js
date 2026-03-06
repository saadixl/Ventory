import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        gap: 2,
      }}
    >
      <CircularProgress
        size={36}
        thickness={3}
        sx={{
          color: "#6366f1",
        }}
      />
      {props.message && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.message}
        </Typography>
      )}
    </Box>
  );
}
