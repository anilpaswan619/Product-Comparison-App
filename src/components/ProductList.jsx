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
      style={{
        height: '48px',
        border: '1px solid #ced4da',
        outline: 'none',
        boxShadow: 'none'
      }}
      onFocus={(e) => {
        e.target.style.outline = 'none';
        e.target.style.boxShadow = 'none';
      }}
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
      <div className="filter-section bg-light rounded-3 shadow-sm mb-3 p-3">
        {/* Mobile Filter Toggle */}
        <div className="d-md-none mb-2">
          <Button
            variant="outline-primary"
            onClick={() => setShowFilters(!showFilters)}
            className="w-100 d-flex align-items-center justify-content-between py-2"
            style={{ fontSize: '0.9rem' }}
          >
            <div className="d-flex align-items-center gap-2">
              <Filter size={18} />
              <span className="fw-semibold">Filters & Search</span>
            </div>
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>

        {/* Desktop Filters (Always Visible) */}
        <div className="d-none d-md-block">
          <Row className="g-2 g-lg-3 align-items-end">
            <Col lg={5} md={12}>
              <label className="form-label small fw-medium mb-1">Search Products</label>
              <SearchBar 
                placeholder="Search products, brands, or features..." 
                onSearch={onSearch}
                style={{
                  height: '44px',
                  border: '1px solid #ced4da',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              />
            </Col>
            <Col lg={3} md={6}>
              <label className="form-label small fw-medium mb-1">Category</label>
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </Col>
            <Col lg={2} md={3}>
              <label className="form-label small fw-medium mb-1">Actions</label>
              <Button 
                onClick={selected.length > 0 ? onClearAll : undefined}
                disabled={selected.length === 0}
                className="w-100 d-flex align-items-center justify-content-center gap-1"
                variant={selected.length > 0 ? "outline-danger" : "outline-secondary"}
                style={{
                  height: '44px',
                  outline: 'none',
                  boxShadow: 'none',
                  opacity: selected.length === 0 ? 0.5 : 1,
                  cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                <X size={14} />
                <span className="d-none d-lg-inline fw-bold">Clear All</span>
                <span className="d-inline d-lg-none">Clear</span>
              </Button>
            </Col>
            <Col lg={2} md={3}>
              <label className="form-label small fw-medium mb-1">View</label>
              <div className="btn-group w-100" role="group">
                <Button
                  variant={viewMode === 'grid' ? 'primary btn-custom-primary' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: '44px', fontSize: '0.8rem' }}
                >
                  <Grid3x3Gap size={14} />
                  <span className="d-none d-xl-inline ms-1">Grid</span>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary btn-custom-primary' : 'outline-secondary'}
                  onClick={() => setViewMode('list')}
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: '44px', fontSize: '0.8rem' }}
                >
                  <List size={14} />
                  <span className="d-none d-xl-inline ms-1">List</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile Filters (Collapsible) */}
        {showFilters && (
          <div className="d-md-none mt-3 pt-3 border-top">
            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small fw-medium mb-1">Search Products</label>
                <SearchBar 
                  placeholder="Search products..." 
                  onSearch={onSearch}
                  style={{
                    height: '40px',
                    border: '1px solid #ced4da',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
              <div>
                <label className="form-label small fw-medium mb-1">Category</label>
                <CategoryFilter 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                />
              </div>
              <Row className="g-2">
                <Col xs={6}>
                  <label className="form-label small fw-medium mb-1">Actions</label>
                  <Button 
                    onClick={selected.length > 0 ? onClearAll : undefined}
                    disabled={selected.length === 0}
                    className="w-100 d-flex align-items-center justify-content-center gap-1"
                    variant={selected.length > 0 ? "outline-danger" : "outline-secondary"}
                    style={{
                      height: '40px',
                      outline: 'none',
                      boxShadow: 'none',
                      opacity: selected.length === 0 ? 0.5 : 1,
                      cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    <X size={12} />
                    Clear {selected.length > 0 && `(${selected.length})`}
                  </Button>
                </Col>
                <Col xs={6}>
                  <label className="form-label small fw-medium mb-1">View</label>
                  <div className="btn-group w-100" role="group">
                    <Button
                      variant={viewMode === 'grid' ? 'primary btn-custom-primary' : 'outline-secondary'}
                      onClick={() => setViewMode('grid')}
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: '40px', fontSize: '0.75rem' }}
                    >
                      <Grid3x3Gap size={12} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'primary btn-custom-primary' : 'outline-secondary'}
                      onClick={() => setViewMode('list')}
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: '40px', fontSize: '0.75rem' }}
                    >
                      <List size={12} />
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>

      {/* Results Info Bar */}
      <div className="results-info bg-white rounded-3 shadow-sm border p-2 p-md-3 mb-3 mb-md-4">
        <Row className="align-items-center">
          <Col xs={12} sm={8}>
            <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <FilterCircle className="text-custom-primary" size={16} />
                <span className="fw-semibold small">
                  Showing {products.length} {selectedCategory !== "All" ? selectedCategory.toLowerCase() : "product"}
                  {products.length !== 1 ? "s" : ""}
                </span>
              </div>
              {selectedCategory !== "All" && (
                <Badge className="badge-custom-primary" style={{ fontSize: '0.7rem' }}>
                  {selectedCategory}
                </Badge>
              )}
            </div>
          </Col>
          {selected.length > 0 && (
            <Col xs={12} sm={4} className="mt-2 mt-sm-0">
              <div className="d-flex align-items-center gap-2 justify-content-sm-end">
                <Badge 
                  className={`${
                    selected.length >= 3 
                      ? 'badge-custom-success' 
                      : 'badge-custom-warning'
                  }`}
                  style={{ fontSize: '0.75rem' }}
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

      {/* Product Grid/List */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3 shadow-sm border p-4 p-md-5 text-center">
          <FilterCircle size={40} className="text-muted mb-3" />
          <h3 className="h5 fw-semibold text-muted mb-2">No Products Found</h3>
          <p className="text-muted mb-3 small">
            Try adjusting your search terms or category filter to find what you're looking for.
          </p>
          <Button 
            onClick={() => {
              onSearch('');
              onCategoryChange('All');
            }}
            className="btn-custom-primary"
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="product-list">
          <Row className="g-2 g-md-3 g-lg-4">
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