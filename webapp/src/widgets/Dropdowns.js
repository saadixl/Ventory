import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { getInventoryOptions } from "../services/api";

const inventoryOptions = {
  BRANDS: "Brands",
  CATEGORIES: "Categories",
  SUBCATEGORIES: "Subcategories",
  LOCATIONS: "Locations",
};

function DropdownCore(props) {
  const { list, label, onChange, showAll, value, defaultValue = "-" } = props;
  let joinedList = showAll ? [{ label: "ALL", value: "ALL" }] : [];
  joinedList = [...joinedList, ...list];
  const options = joinedList.map((item) => {
    const { label, value } = item;
    return (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    );
  });
  return (
    <TextField
      size="small"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      select
      label={label}
      defaultValue={defaultValue}
      value={value}
    >
      {options}
    </TextField>
  );
}

export function BrandDropdown(props) {
  const [brandList, setBrandList] = useState([]);

  async function fetchBrands() {
    const brands = await getInventoryOptions({
      collectionName: inventoryOptions.BRANDS,
    });
    setBrandList(brands);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <DropdownCore
      defaultValue={props.defaultValue}
      value={props.value}
      showAll={props.showAll}
      onChange={props.onChange}
      label="Brand"
      list={brandList}
    />
  );
}

export function LocationDropdown(props) {
  const [locationList, setLocationList] = useState([]);

  async function fetchLocations() {
    const locations = await getInventoryOptions({
      collectionName: inventoryOptions.LOCATIONS,
    });
    setLocationList(locations);
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <DropdownCore
      defaultValue={props.defaultValue}
      value={props.value}
      showAll={props.showAll}
      onChange={props.onChange}
      label="Location"
      list={locationList}
    />
  );
}

export function CategoryDropdown(props) {
  const [categoryList, setCategoryList] = useState([]);

  async function fetchCategories() {
    const categories = await getInventoryOptions({
      collectionName: inventoryOptions.CATEGORIES,
    });
    setCategoryList(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DropdownCore
      defaultValue={props.defaultValue}
      value={props.value}
      showAll={props.showAll}
      onChange={props.onChange}
      label="Category"
      list={categoryList}
    />
  );
}

export function SubCategoryDropdown(props) {
  const [subCategoryList, setSubCategoryList] = useState([]);

  async function fetchSubCategories() {
    const subCategories = await getInventoryOptions({
      collectionName: inventoryOptions.SUBCATEGORIES,
    });
    setSubCategoryList(subCategories);
  }

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return (
    <DropdownCore
      defaultValue={props.defaultValue}
      value={props.value}
      showAll={props.showAll}
      onChange={props.onChange}
      label="Sub-categories"
      list={subCategoryList}
    />
  );
}
