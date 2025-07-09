import React, { useState } from "react";
import { Row, Col, Button, FormControl,  Badge,  } from "react-bootstrap";
import {  X, Filter, Grid3x3Gap, List, ChevronDown, ChevronUp, FilterCircle } from "react-bootstrap-icons";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => (
  <div className="position-relative">
    <FormControl
      as="select"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="form-select category-select"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </FormControl>
  </div>
);

const ProductList = ({ 
  products = [], 
  onCompare = () => {}, 
  selected = [], 
  onSearch = () => {}, 
  categories = ['All'], 
  selectedCategory = 'All', 
  onCategoryChange = () => {},
  onClearAll = () => {}
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="product-list-container">
      {/* Search and Filter Section */}
      <div className="filter-section bg-light rounded-3 shadow-sm mb-4 p-4">
        {/* Mobile Filter Toggle */}
        <div className="d-md-none">
          <Button
            variant="outline-primary"
            onClick={() => setShowFilters(!showFilters)}
            className="w-100 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center gap-2">
              <Filter size={20} />
              <span className="fw-semibold">Filters & Search</span>
            </div>
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
        </div>

        {/* Desktop Filters (Always Visible) */}
        <div className="d-none d-md-block">
          <Row className="g-3 align-items-center">
            <Col lg={6}>
              <SearchBar 
                placeholder="Search products, brands, or features..." 
                onSearch={onSearch} 
              />
            </Col>
            <Col lg={4}>
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </Col>
            <Col lg={2}>
              {selected.length > 0 && (
                <Button 
                  onClick={onClearAll}
                  className="w-100 d-flex align-items-center justify-content-center gap-2 btn-custom-outline-danger"
                >
                  <X size={16} />
                  Clear All
                </Button>
              )}
            </Col>
          </Row>
        </div>

        {/* Mobile Filters (Collapsible) */}
        {showFilters && (
          <div className="d-md-none mt-3 pt-3 border-top">
            <div className="d-flex flex-column gap-3">
              <SearchBar 
                placeholder="Search products, brands, or features..." 
                onSearch={onSearch} 
              />
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
              {selected.length > 0 && (
                <Button 
                  onClick={onClearAll}
                  className="w-100 d-flex align-items-center justify-content-center gap-2 btn-custom-outline-danger"
                >
                  <X size={16} />
                  Clear All ({selected.length})
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Info Bar */}
      <div className="results-info bg-white rounded-3 shadow-sm border p-3 mb-4">
        <Row className="align-items-center">
          <Col>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <FilterCircle className="text-custom-primary" size={20} />
                <span className="fw-semibold">
                  Showing {products.length} {selectedCategory !== "All" ? selectedCategory.toLowerCase() : "product"}
                  {products.length !== 1 ? "s" : ""}
                </span>
              </div>
              {selectedCategory !== "All" && (
                <Badge className="badge-custom-primary">
                  {selectedCategory}
                </Badge>
              )}
            </div>
          </Col>
          {selected.length > 0 && (
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <Badge 
                  className={`${
                    selected.length >= 3 
                      ? 'badge-custom-success' 
                      : 'badge-custom-warning'
                  }`}
                >
                  {selected.length}/3 selected
                </Badge>
                <span className="text-muted small d-none d-sm-inline">
                  for comparison
                </span>
              </div>
            </Col>
          )}
        </Row>
      </div>

      {/* View Mode Toggle (Desktop) */}
      <div className="d-none d-md-flex justify-content-end mb-3">
        <div className="btn-group" role="group">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
            onClick={() => setViewMode('grid')}
            className="d-flex align-items-center gap-2"
          >
            <Grid3x3Gap size={16} />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
            onClick={() => setViewMode('list')}
            className="d-flex align-items-center gap-2"
          >
            <List size={16} />
            List
          </Button>
        </div>
      </div>

      {/* Product Grid/List */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3 shadow-sm border p-5 text-center">
          <FilterCircle size={48} className="text-muted mb-3" />
          <h3 className="h4 fw-semibold text-muted mb-2">No Products Found</h3>
          <p className="text-muted mb-4">
            Try adjusting your search terms or category filter to find what you're looking for.
          </p>
          <Button 
            onClick={() => {
              onSearch('');
              onCategoryChange('All');
            }}
            className="btn-custom-primary"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="product-list">
          <Row className="g-4">
            {products.map((product) => (
              <Col 
                key={product.id} 
                xs={12} 
                sm={viewMode === 'list' ? 12 : 6} 
                lg={viewMode === 'list' ? 12 : 4} 
                xl={viewMode === 'list' ? 12 : 3}
              >
                <ProductCard
                  product={product}
                  onCompare={onCompare}
                  isSelected={selected.some((p) => p.id === product.id)}
                  isMaxSelected={selected.length >= 3}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductList;