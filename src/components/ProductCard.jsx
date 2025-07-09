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
                    className={`position-absolute top-0 end-0 m-2 category-badge ${product.category === 'Mobile' ? 'badge-custom-primary' : 'badge-custom-success'}`}
                    style={{ fontSize: '0.65rem' }}
                >
                    <span className="d-none d-sm-inline">{product.category}</span>
                    <span className="d-inline d-sm-none">{product.category.substring(0, 3)}</span>
                </Badge>
                {isSelected && (
                    <div className="selection-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                        <CheckCircleFill className="text-custom-success" size={28} />
                    </div>
                )}
            </div>
            
            <Card.Body className="d-flex flex-column p-3 p-md-4">
                <div className="product-header mb-2 mb-md-3">
                    <Card.Title className="product-title h6 h5-md fw-bold mb-1 mb-md-2" 
                                style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                        {product.name}
                    </Card.Title>
                    <Row className="align-items-center mb-1 mb-md-2">
                        <Col xs={7} sm={8}>
                            <span className="product-brand fw-semibold text-custom-primary small">
                                {product.brand}
                            </span>
                        </Col>
                        <Col xs={5} sm={4} className="text-end">
                            <span className="product-price fw-bold mb-0 text-custom-success"
                                  style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                                ${product.price}
                            </span>
                        </Col>
                    </Row>
                    <p className="product-description text-muted mb-2 mb-md-3" 
                       style={{ 
                         fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                         lineHeight: '1.4',
                         display: '-webkit-box',
                         WebkitLineClamp: window.innerWidth < 576 ? '2' : '3',
                         WebkitBoxOrient: 'vertical',
                         overflow: 'hidden'
                       }}>
                        {product.description}
                    </p>
                </div>

                <div className="product-specs mb-3 mb-md-4">
                    <h6 className="specs-title fw-semibold mb-2 mb-md-3 small">
                        Key Specifications
                    </h6>
                    <div className="specs-grid">
                        {Object.entries(product.specs).slice(0, window.innerWidth < 576 ? 3 : 4).map(([key, value]) => (
                            <div key={key} className="spec-item d-flex justify-content-between align-items-center py-1" 
                                 style={{ fontSize: 'clamp(0.7rem, 2vw, 0.8rem)' }}>
                                <span className="spec-key text-muted text-capitalize" 
                                      style={{ 
                                        maxWidth: '45%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}>
                                    {key}:
                                </span>
                                <span className="spec-value fw-medium text-end" 
                                      style={{ 
                                        maxWidth: '50%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}>
                                    {value}
                                </span>
                            </div>
                        ))}
                        {Object.keys(product.specs).length > (window.innerWidth < 576 ? 3 : 4) && (
                            <div className="text-center mt-1">
                                <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                    +{Object.keys(product.specs).length - (window.innerWidth < 576 ? 3 : 4)} more
                                </small>
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    size="lg"
                    className={`product-compare-btn mt-auto ${
                        isSelected 
                            ? 'btn-custom-success' 
                            : isMaxSelected 
                                ? 'btn-custom-outline-secondary disabled' 
                                : 'btn-custom-primary'
                    }`}
                    onClick={() => canSelect && onCompare(product)}
                    disabled={isSelected || isMaxSelected}
                    style={{ 
                        fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                        padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.7rem, 2.5vw, 1rem)',
                        minHeight: 'clamp(40px, 10vw, 48px)'
                    }}
                >
                    {isSelected ? (
                        <>
                            <CheckCircleFill className="me-1" size={14} /> 
                            <span className="d-none d-sm-inline">Selected</span>
                            <span className="d-inline d-sm-none">✓</span>
                        </>
                    ) : isMaxSelected ? (
                        <>
                            <ExclamationTriangle className="me-1" size={14} />
                            <span className="d-none d-sm-inline">Max Reached</span>
                            <span className="d-inline d-sm-none">Max</span>
                        </>
                    ) : (
                        <>
                            <PlusCircle className="me-1" size={14} /> 
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