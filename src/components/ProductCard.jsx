import React from 'react';
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { CheckCircleFill, PlusCircle } from "react-bootstrap-icons";

const ProductCard = ({ product, onCompare, isSelected }) => {
    if (!product) return null;

    return (
        <Card className="product-card h-100 border-0 shadow-hover">
            <div className="product-image-container position-relative">
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                />
                <Badge 
                    bg={product.category === 'Mobile' ? 'primary' : 'success'} 
                    className="position-absolute top-0 end-0 m-2"
                >
                    {product.category}
                </Badge>
            </div>
            
            <Card.Body className="d-flex flex-column p-4">
                <div className="product-header mb-3">
                    <Card.Title className="product-title h5 fw-bold mb-2">{product.name}</Card.Title>
                    <Row className="align-items-center mb-2">
                        <Col>
                            <span className="product-brand text-primary fw-semibold">{product.brand}</span>
                        </Col>
                        <Col xs="auto">
                            <span className="product-price h5 fw-bold text-success mb-0">${product.price}</span>
                        </Col>
                    </Row>
                    <p className="product-description text-muted small mb-3">{product.description}</p>
                </div>

                <div className="product-specs mb-4">
                    <h6 className="specs-title text-dark fw-semibold mb-3">Key Specifications</h6>
                    <div className="specs-grid">
                        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="spec-item d-flex justify-content-between py-1">
                                <span className="spec-key text-muted small text-capitalize">{key}:</span>
                                <span className="spec-value small fw-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    variant={isSelected ? "outline-success" : "primary"}
                    size="lg"
                    className={`product-compare-btn mt-auto ${isSelected ? 'selected' : ''}`}
                    onClick={() => !isSelected && onCompare(product)}
                    disabled={isSelected}
                >
                    {isSelected ? (
                        <>
                            <CheckCircleFill className="me-2" /> 
                            <span>Selected</span>
                        </>
                    ) : (
                        <>
                            <PlusCircle className="me-2" /> 
                            <span>Add to Compare</span>
                        </>
                    )}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;