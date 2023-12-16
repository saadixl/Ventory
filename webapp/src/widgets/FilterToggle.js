import Box from "@mui/material/Box";

export default function FilterToggle(props) {
  const { filterVisible, setFilterVisible } = props;
  const buttonText = filterVisible ? "Hide filters" : "Show filters";
  return (
    <Box
      className="filter-toggle"
      onClick={() => {
        if (!filterVisible) {
          localStorage.setItem("filterVisible", filterVisible);
        } else {
          localStorage.removeItem("filterVisible");
        }
        setFilterVisible(!filterVisible);
      }}
    >
      {buttonText}
    </Box>
  );
}
