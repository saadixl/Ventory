import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  "&:hover": {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
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
      startIcon={filterVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      sx={{
        justifyContent: "flex-start",
        px: 0,
      }}
    >
      {buttonText}
    </StyledButton>
  );
}
