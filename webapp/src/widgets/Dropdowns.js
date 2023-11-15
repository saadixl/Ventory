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

  const brandOptions = brandList.map((brand) => {
    const { label, value } = brand;
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
        props.onChange(e.target.value);
      }}
      select
      label="Brand"
      defaultValue="-"
    >
      {brandOptions}
    </TextField>
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

  const locationOptions = locationList.map((location) => {
    const { label, value } = location;
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
        props.onChange(e.target.value);
      }}
      select
      label="Location"
      defaultValue="-"
    >
      {locationOptions}
    </TextField>
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

  const categoryOptions = categoryList.map((category) => {
    const { label, value } = category;
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
        props.onChange(e.target.value);
      }}
      select
      label="Categories"
      defaultValue="-"
    >
      {categoryOptions}
    </TextField>
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

  const subCategoryOptions = subCategoryList.map((category) => {
    const { label, value } = category;
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
        props.onChange(e.target.value);
      }}
      select
      label="Sub-categories"
      defaultValue="-"
    >
      {subCategoryOptions}
    </TextField>
  );
}
