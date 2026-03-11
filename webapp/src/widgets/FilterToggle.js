import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

export default function FilterToggle(props) {
  const { filterVisible, setFilterVisible } = props;
  return (
    <Tooltip title={filterVisible ? "Hide filters" : "Show filters"} arrow>
      <IconButton
        className="filter-toggle"
        onClick={() => {
          if (!filterVisible) {
            localStorage.setItem("filterVisible", filterVisible);
          } else {
            localStorage.removeItem("filterVisible");
          }
          setFilterVisible(!filterVisible);
        }}
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          backgroundColor: filterVisible
            ? "rgba(99, 102, 241, 0.15)"
            : "rgba(148, 163, 184, 0.06)",
          border: filterVisible
            ? "1px solid rgba(99, 102, 241, 0.3)"
            : "1px solid rgba(148, 163, 184, 0.08)",
          color: filterVisible ? "#818cf8" : "rgba(148, 163, 184, 0.5)",
          transition: "all 0.15s ease",
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgba(99, 102, 241, 0.4)",
            color: "#a5b4fc",
          },
        }}
      >
        {filterVisible ? (
          <FilterListOffIcon sx={{ fontSize: 18 }} />
        ) : (
          <FilterListIcon sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
