import React from "react";
import { FormSelect } from "react-bootstrap";
import { Collection } from "react-bootstrap-icons";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="category-filter d-flex align-items-center">
            <Collection className="text-primary" />
            <FormSelect 
                value={selectedCategory} 
                onChange={(e) => onCategoryChange(e.target.value)}
                className="category-select ms-1"
                aria-label="Filter by category"
            >
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </FormSelect>
        </div>
    );
};

export default CategoryFilter;
