import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const categories = {
    "-": {
        title: "Select a category",
        subCategories: {}
    },
    "ELECTRONICS": {
        title: "Electronics",
        subCategories: {
            "PHONE": "Phone",
            "COMPUTER": "Computer",
            "TABLET": "Tablet",
        }
    },
    "CLOTHS": {
        title: "Cloths",
        subCategories: {
            "PANT": "Pant",
            "TSHIRT": "T-Shirt",
            "POLO": "Polo",
        }
    },
};

function CategoryDropdown(props) {
    const categoryOptions = Object.keys(categories).map((catKey) => {
        const catObj = categories[catKey];
        const { title } = catObj;
        return <MenuItem key={catKey} value={catKey}>
            {title}
        </MenuItem>;
    });
    return (<TextField
        id="outlined-select-currency"
        select
        label="Category"
        defaultValue="-"
        onChange={(e) => {
            props.onChange(e.target.value);
            props.onUnifiedCategoryChange(e.target.value);
        }}
    >
        {categoryOptions}
    </TextField>);
}

function SubCategoryDropdown(props) {
    const categoryOptions = Object.keys(props.subCategories).map((subCatKey) => {
        const subCatTitle = props.subCategories[subCatKey];
        return <MenuItem key={subCatKey} value={subCatKey}>
            {subCatTitle}
        </MenuItem>;
    });
    return (<TextField
        id="outlined-select-currency"
        select
        label="Sub-category"
        defaultValue="-"
        onChange={(e) => {
            props.onUnifiedCategoryChange(props.selectedCategory, e.target.value);
        }}
    >
        {categoryOptions}
    </TextField>);
}

export function UnifiedCategoryDropdown(props) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subCategories, setSubCategories] = useState({});
    const onCategoryChange = ((category) => {
        setSelectedCategory(category);
        setSubCategories(categories[category].subCategories);
    });
    return (<>
        <CategoryDropdown onUnifiedCategoryChange={props.onChange} onChange={onCategoryChange} />
        <SubCategoryDropdown
            selectedCategory={selectedCategory}
            onUnifiedCategoryChange={props.onChange}
            subCategories={subCategories}
        />
    </>);
}