import React, { useState } from 'react';
import { Button, Badge, Container, Row, Col, ProgressBar, Collapse, Card } from "react-bootstrap";
import { XCircle, ArrowRightCircle, Eye, Trash3, ChevronUp, ChevronDown } from "react-bootstrap-icons";

const CompareBar = ({ selectedItems = [], onRemove, onCompare, onClearAll, maxItems = 3 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (selectedItems.length === 0) return null;

    const progress = (selectedItems.length / maxItems) * 100;
    const canCompare = selectedItems.length >= 2;

    return (
        <>
            {/* Floating Action Button - Always Visible */}
            <div className="compare-fab">
                <Button
                    variant="primary"
                    className="fab-btn shadow-lg"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label="Toggle comparison bar"
                >
                    <div className="fab-content">
                        <Eye size={20} />
                        <Badge bg="warning" text="dark" className="fab-badge">
                            {selectedItems.length}
                        </Badge>
                    </div>
                </Button>
                {canCompare && !isExpanded && (
                    <Button
                        variant="success"
                        className="fab-compare-btn shadow-lg ms-2"
                        onClick={onCompare}
                    >
                        <ArrowRightCircle size={18} className="me-1" />
                        Compare
                    </Button>
                )}
            </div>

            {/* Expandable Compare Bar */}
            <div className={`compare-bar-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <Container fluid className="compare-bar-container">
                    {/* Toggle Button */}
                    <div className="compare-bar-toggle text-center mb-2">
                        <Button
                            variant="link"
                            className="toggle-btn text-light p-0"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                        </Button>
                    </div>

                    <Collapse in={isExpanded}>
                        <div>
                            {/* Progress Bar */}
                            <div className="compare-progress mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <small className="text-light opacity-75">
                                        {selectedItems.length} of {maxItems} products selected
                                    </small>
                                    <small className="text-light opacity-75">
                                        {progress.toFixed(0)}% full
                                    </small>
                                </div>
                                <ProgressBar 
                                    now={progress} 
                                    variant={progress === 100 ? "warning" : progress >= 67 ? "info" : "success"}
                                    className="progress-animated"
                                    style={{ height: '6px' }}
                                />
                            </div>

                            {/* Selected Products Preview */}
                            <Row className="selected-products-preview mb-3">
                                {selectedItems.map(item => (
                                    <Col key={item.id} xs={4} className="mb-2">
                                        <Card className="product-mini-card bg-light text-dark">
                                            <Card.Body className="p-2 text-center">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="mini-product-image mb-1"
                                                />
                                                <div className="mini-product-name">{item.name}</div>
                                                <div className="mini-product-price text-success fw-bold">${item.price}</div>
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    className="mini-remove-btn mt-1"
                                                    onClick={() => onRemove(item.id)}
                                                >
                                                    <XCircle size={12} />
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                                
                                {/* Empty slots */}
                                {Array.from({ length: maxItems - selectedItems.length }).map((_, index) => (
                                    <Col key={`empty-${index}`} xs={4} className="mb-2">
                                        <Card className="product-mini-card empty-slot">
                                            <Card.Body className="p-2 text-center">
                                                <div className="empty-slot-content">
                                                    <div className="empty-icon">+</div>
                                                    <small>Add Product</small>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Action Buttons */}
                            <Row className="compare-actions">
                                <Col xs={6}>
                                    <Button
                                        onClick={onClearAll}
                                        variant="outline-light"
                                        className="w-100 d-flex align-items-center justify-content-center"
                                    >
                                        <Trash3 className="me-2" size={16} />
                                        Clear All
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button
                                        onClick={onCompare}
                                        disabled={!canCompare}
                                        variant="success"
                                        className="w-100 d-flex align-items-center justify-content-center compare-main-btn"
                                    >
                                        <ArrowRightCircle className="me-2" />
                                        Compare Now
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                </Container>
            </div>
        </>
    );
};

export default CompareBar;