import React from 'react';
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { CheckCircleFill, PlusCircle, ExclamationTriangle } from "react-bootstrap-icons";

const ProductCard = ({ product, onCompare, isSelected, isMaxSelected }) => {
    if (!product) return null;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isSelected && !isMaxSelected) {
                onCompare(product);
            }
        }
    };

    const canSelect = !isSelected && !isMaxSelected;

    return (
        <Card 
            className={`product-card h-100 border-0 shadow-hover ${isSelected ? 'selected' : ''} ${isMaxSelected && !isSelected ? 'disabled' : ''}`}
            tabIndex={canSelect ? 0 : -1}
            onKeyDown={handleKeyPress}
            role="button"
            aria-label={`Product: ${product.name}. ${isSelected ? 'Selected for comparison' : canSelect ? 'Press Enter to add to comparison' : 'Maximum products selected'}`}
        >
            <div className="product-image-container position-relative">
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                />
                <Badge 
                    bg={product.category === 'Mobile' ? 'primary' : 'success'} 
                    className="position-absolute top-0 end-0 m-2 category-badge"
                >
                    {product.category}
                </Badge>
                {isSelected && (
                    <div className="selection-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                        <CheckCircleFill className="text-success" size={32} />
                    </div>
                )}
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
                    variant={isSelected ? "success" : isMaxSelected ? "outline-secondary" : "primary"}
                    size="lg"
                    className={`product-compare-btn mt-auto ${isSelected ? 'selected' : ''}`}
                    onClick={() => canSelect && onCompare(product)}
                    disabled={isSelected || isMaxSelected}
                >
                    {isSelected ? (
                        <>
                            <CheckCircleFill className="me-1" /> 
                            <span className="d-none d-sm-inline">Selected</span>
                            <span className="d-inline d-sm-none">✓</span>
                        </>
                    ) : isMaxSelected ? (
                        <>
                            <ExclamationTriangle className="me-1" />
                            <span className="d-none d-sm-inline">Max Reached</span>
                            <span className="d-inline d-sm-none">Max</span>
                        </>
                    ) : (
                        <>
                            <PlusCircle className="me-1" /> 
                            <span className="d-none d-sm-inline">Compare</span>
                            <span className="d-inline d-sm-none">Add</span>
                        </>
                    )}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;