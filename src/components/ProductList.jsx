import React from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { Container, Row, Col, Alert } from "react-bootstrap";

const ProductList = ({ products, onCompare, selected, onSearch }) => (
    <Container className="product-list-container">
        <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} lg={5}>
                <SearchBar placeholder="Search products..." onSearch={onSearch} />
            </Col>
        </Row>
        <Row className="product-list gx-4 gy-4">
            {products.length === 0 ? (
                <Col xs={12}>
                    <Alert variant="info" className="text-center product-list-empty">
                        No products found.
                    </Alert>
                </Col>
            ) : (
                products.map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard
                            product={product}
                            onCompare={onCompare}
                            isSelected={selected.some((p) => p.id === product.id)}
                        />
                    </Col>
                ))
            )}
        </Row>
    </Container>
);

export default ProductList;
