import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: 2,
  backgroundColor: "rgba(99, 102, 241, 0.1)",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    borderColor: "rgba(99, 102, 241, 0.4)",
    color: theme.palette.primary.main,
  },
}));

export default function FilterToggle(props) {
  const { filterVisible, setFilterVisible } = props;
  const buttonText = filterVisible ? "Hide filters" : "Show filters";
  return (
    <StyledButton
      className="filter-toggle"
      onClick={() => {
        if (!filterVisible) {
          localStorage.setItem("filterVisible", filterVisible);
        } else {
          localStorage.removeItem("filterVisible");
        }
        setFilterVisible(!filterVisible);
      }}
      startIcon={<FilterListIcon />}
      endIcon={filterVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      sx={{
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {buttonText}
    </StyledButton>
  );
}
