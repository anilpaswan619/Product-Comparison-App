import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search, XCircle } from "react-bootstrap-icons";


const SearchBar = ({ placeholder = "Search products, brands, or categories...", onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const clearSearch = () => {
        setQuery("");
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div className="search-container">
            <InputGroup size="lg" className="search-input-group shadow-sm">
                <InputGroup.Text className="search-icon-wrapper bg-white border-end-0">
                    <Search className="search-icon text-primary" />
                </InputGroup.Text>
                <FormControl
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="search-input border-start-0 border-end-0"
                    aria-label="Search products"
                />
                {query && (
                    <Button 
                        variant="outline-secondary" 
                        className="clear-search-btn border-start-0"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        <XCircle />
                    </Button>
                )}
            </InputGroup>
        </div>
    );
};

export default SearchBar;