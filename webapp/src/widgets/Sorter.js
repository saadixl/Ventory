import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Sorter(props) {
  const [sort, setSort] = useState(props.value);
  const handleChange = (e) => {
    const value = e.target.value;
    setSort(value);
    props.onChange(value);
  };

  useEffect(() => {
    setSort(props.value);
  }, [props.value]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          defaultValue={props.value}
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="oldest-to-newest">Oldest to newest</MenuItem>
          <MenuItem value="newest-to-oldest">Newest to oldest</MenuItem>
          <MenuItem value="qty-low-hi">Qty low to high</MenuItem>
          <MenuItem value="qty-hi-low">Qty high to low</MenuItem>
          <MenuItem value="price-low-hi">Price low to high</MenuItem>
          <MenuItem value="price-hi-low">Price high to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
