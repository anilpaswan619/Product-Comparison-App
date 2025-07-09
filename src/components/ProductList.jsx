import React from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { Container, Row, Col, Alert, Button, Card } from "react-bootstrap";
import { Trash3, FilterCircle } from "react-bootstrap-icons";

const ProductList = ({ 
  products, 
  onCompare, 
  selected, 
  onSearch, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  onClearAll 
}) => (
    <Container className="product-list-container">
        {/* Search and Filter Section */}
        <Card className="filter-section mb-4 border-0 shadow-sm">
            <Card.Body className="p-4">
                <Row className="align-items-center">
                    <Col xs={12} lg={6} className="mb-3 mb-lg-0">
                        <SearchBar placeholder="Search products, brands, or features..." onSearch={onSearch} />
                    </Col>
                    <Col xs={12} lg={4} className="mb-3 mb-lg-0">
                        <CategoryFilter 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={onCategoryChange}
                        />
                    </Col>
                    <Col xs={12} lg={2}>
                        {selected.length > 0 && (
                            <Button 
                                variant="outline-danger" 
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={onClearAll}
                            >
                                <Trash3 className="me-2" />
                                Clear All
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        {/* Results Info */}
        <div className="results-info mb-4 d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center gap-2">
                <FilterCircle className="text-primary" />
                <span className="fw-semibold">
                    Showing {products.length} {selectedCategory !== "All" ? selectedCategory.toLowerCase() : "product"}
                    {products.length !== 1 ? "s" : ""}
                </span>
            </div>
            {selected.length > 0 && (
                <small className="text-muted">
                    {selected.length}/3 products selected for comparison
                </small>
            )}
        </div>

        {/* Product Grid */}
        <Row className="product-list gx-4 gy-4">
            {products.length === 0 ? (
                <Col xs={12}>
                    <Alert variant="info" className="text-center product-list-empty py-5">
                        <h4>No Products Found</h4>
                        <p className="mb-0">Try adjusting your search terms or category filter.</p>
                    </Alert>
                </Col>
            ) : (
                products.map((product) => (
                    <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                        <ProductCard
                            product={product}
                            onCompare={onCompare}
                            isSelected={selected.some((p) => p.id === product.id)}
                            isMaxSelected={selected.length >= 3}
                        />
                    </Col>
                ))
            )}
        </Row>
    </Container>
);

export default ProductList;
