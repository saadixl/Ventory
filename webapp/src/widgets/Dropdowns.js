import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "react-select";

import { getInventoryOptions } from "../services/api";

const customSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#6366f1" : "rgba(148, 163, 184, 0.15)",
    backgroundColor: "rgba(10, 15, 26, 0.8)",
    color: "#fff",
    borderRadius: 10,
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "rgba(99, 102, 241, 0.1)" : "#0a0f1a",
  }),
};

const inventoryOptions = {
  BRANDS: "Brands",
  CATEGORIES: "Categories",
  SUBCATEGORIES: "Subcategories",
  LOCATIONS: "Locations",
  TAGS: "Tags",
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
      fullWidth
      onChange={(e) => {
        onChange(e.target.value);
      }}
      select
      label={label}
      defaultValue={defaultValue}
      value={value}
      slotProps={{
        select: {
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 300,
                backgroundColor: "rgba(10, 15, 26, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
                borderRadius: 2,
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
              },
            },
          },
        },
      }}
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

export function TagsDropdown(props) {
  const [tagList, setTagList] = useState([]);

  async function fetchTags() {
    const tags = await getInventoryOptions({
      collectionName: inventoryOptions.TAGS,
    });
    setTagList(tags);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Select
      styles={{
        ...customSelectStyle,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#0a0f1a",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          borderRadius: 8,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
        }),
      }}
      menuPortalTarget={document.body}
      defaultValue={props.defaultValue}
      isMulti
      name="Tags"
      options={tagList}
      className="basic-multi-select"
      classNamePrefix="react-select"
      onChange={(newTag) => {
        props.onChange(newTag);
      }}
    />
  );
}
