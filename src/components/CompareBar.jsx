import React, { useState, useEffect } from 'react';
import { Button, Badge, Container, Row, Col, Collapse, Card, ProgressBar } from "react-bootstrap";
import { XCircle, ArrowRightCircle, Eye, Trash3, ChevronUp, ChevronDown, Plus, CheckCircle } from "react-bootstrap-icons";

const CompareBar = ({ selectedItems = [], onRemove, onCompare, onClearAll, maxItems = 3 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        if (selectedItems.length > 0 && !isVisible) {
            setIsVisible(true);
        } else if (selectedItems.length === 0 && isVisible) {
            setIsExpanded(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [selectedItems.length, isVisible]);

    if (!isVisible) return null;

    const progress = (selectedItems.length / maxItems) * 100;
    const canCompare = selectedItems.length >= 2;
    const isAlmostFull = selectedItems.length === maxItems - 1;
    const isFull = selectedItems.length === maxItems;

    const getProgressVariant = () => {
        if (progress === 100) return 'success';
        if (progress >= 67) return 'warning';
        return 'info';
    };

    return (
        <>
            {/* Enhanced Floating Action Button */}
            <div className="compare-fab animate-scale-in">
                <div className="fab-container d-flex align-items-center gap-3">
                    {/* Main FAB Button */}
                    <Button
                        className={`fab-btn shadow-lg ${isFull ? 'btn-custom-success' : 'btn-custom-primary'}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label="Toggle comparison bar"
                        style={{
                            transform: isExpanded ? 'scale(0.95)' : 'scale(1)',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <div className="fab-content">
                            <Eye size={20} color="white" />
                            <Badge 
                                className={`fab-badge ${
                                    isFull ? 'badge-custom-success' : 
                                    isAlmostFull ? 'badge-custom-warning' : 
                                    'badge-custom-primary'
                                }`}
                                style={{
                                    animation: selectedItems.length > 0 ? 'pulse 2s infinite' : 'none'
                                }}
                            >
                                {selectedItems.length}
                            </Badge>
                        </div>
                    </Button>

                    {/* Quick Compare Button */}
                    {canCompare && !isExpanded && (
                        <Button
                            className="fab-compare-btn shadow-lg btn-custom-success animate-slide-up"
                            onClick={onCompare}
                            style={{
                                borderRadius: '50px',
                                padding: '12px 24px',
                                fontWeight: '600',
                                letterSpacing: '0.5px'
                            }}
                        >
                            <ArrowRightCircle size={18} className="me-2" />
                            <span className="d-none d-sm-inline">Compare Now</span>
                            <span className="d-inline d-sm-none">Compare</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Enhanced Expandable Compare Bar */}
            <div 
                className={`compare-bar-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}
                style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <Container fluid className="compare-bar-container">
                    {/* Enhanced Toggle Button */}
                    <div className="compare-bar-toggle text-center mb-3">
                        <Button
                            variant="link"
                            className="toggle-btn text-light p-2 border-0 rounded-circle"
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            {isExpanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
                        </Button>
                    </div>

                    <Collapse in={isExpanded}>
                        <div className="animate-fade-in">
                            {/* Enhanced Header Section */}
                            <div className="compare-header mb-4">
                                <Row className="align-items-center">
                                    <Col>
                                        <h5 className="text-light mb-2 fw-bold">
                                            Product Comparison
                                        </h5>
                                        <p className="text-light opacity-75 mb-0 small">
                                            {selectedItems.length === 0 && "No products selected"}
                                            {selectedItems.length === 1 && "Add one more product to compare"}
                                            {selectedItems.length === 2 && "Ready to compare! Add one more for better analysis"}
                                            {selectedItems.length === 3 && "Maximum products selected - Ready to compare!"}
                                        </p>
                                    </Col>
                                    <Col xs="auto">
                                        <Badge 
                                            className={`${
                                                isFull ? 'badge-custom-success' : 
                                                isAlmostFull ? 'badge-custom-warning' : 
                                                'badge-custom-info'
                                            } px-3 py-2`}
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {selectedItems.length}/{maxItems}
                                        </Badge>
                                    </Col>
                                </Row>
                            </div>

                            {/* Enhanced Progress Section */}
                            <div className="compare-progress mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <small className="text-light fw-medium">
                                        Progress: {selectedItems.length} of {maxItems} products
                                    </small>
                                    <small className="text-light fw-medium">
                                        {progress.toFixed(0)}% complete
                                    </small>
                                </div>
                                <ProgressBar 
                                    now={progress} 
                                    variant={getProgressVariant()}
                                    style={{ 
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: 'rgba(255, 255, 255, 0.1)'
                                    }}
                                    className="progress-animated"
                                />
                            </div>

                            {/* Enhanced Selected Products Grid */}
                            <Row className="selected-products-preview mb-4 g-3">
                                {selectedItems.map((item, index) => (
                                    <Col key={item.id} xs={6} md={4} className="animate-slide-up">
                                        <Card 
                                            className="product-mini-card h-100"
                                            style={{
                                                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                                border: 'none',
                                                borderRadius: '16px',
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s ease',
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                        >
                                            <Card.Body className="p-3 text-center position-relative">
                                                {/* Remove Button */}
                                                <Button
                                                    size="sm"
                                                    className="position-absolute top-0 end-0 m-1 rounded-circle"
                                                    variant="danger"
                                                    onClick={() => onRemove(item.id)}
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        padding: '0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    <XCircle size={12} />
                                                </Button>

                                                {/* Product Image */}
                                                <div className="mb-2">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="mini-product-image"
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            objectFit: 'contain',
                                                            borderRadius: '8px',
                                                            background: 'white',
                                                            padding: '4px',
                                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                                        }}
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="mini-product-name text-dark fw-semibold small mb-1" 
                                                     style={{ 
                                                         fontSize: '0.8rem',
                                                         lineHeight: '1.2',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                         whiteSpace: 'nowrap'
                                                     }}>
                                                    {item.name}
                                                </div>
                                                <div className="mini-product-price text-custom-success fw-bold small">
                                                    ${item.price}
                                                </div>
                                                
                                                {/* Selection Badge */}
                                                <Badge 
                                                    className="badge-custom-success mt-1"
                                                    style={{ fontSize: '0.7rem' }}
                                                >
                                                    <CheckCircle size={10} className="me-1" />
                                                    Selected
                                                </Badge>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                                
                                {/* Enhanced Empty Slots */}
                                {Array.from({ length: maxItems - selectedItems.length }).map((_, index) => (
                                    <Col key={`empty-${index}`} xs={6} md={4} className="animate-fade-in">
                                        <Card 
                                            className="product-mini-card empty-slot h-100"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '2px dashed rgba(255, 255, 255, 0.3)',
                                                borderRadius: '16px',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <Card.Body className="p-3 text-center d-flex flex-column justify-content-center">
                                                <div className="empty-slot-content text-light opacity-75">
                                                    <Plus size={32} className="mb-2 opacity-50" />
                                                    <div className="small fw-medium">Add Product</div>
                                                    <div className="text-xs opacity-75">Slot {selectedItems.length + index + 1}</div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Enhanced Action Buttons */}
                            <Row className="compare-actions g-3">
                                <Col xs={12} sm={6}>
                                    <Button
                                        onClick={onClearAll}
                                        className="w-100 d-flex align-items-center justify-content-center btn-custom-outline-light"
                                        style={{
                                            height: '50px',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        <Trash3 className="me-2" size={18} />
                                        Clear All ({selectedItems.length})
                                    </Button>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Button
                                        onClick={onCompare}
                                        disabled={!canCompare}
                                        className={`w-100 d-flex align-items-center justify-content-center ${
                                            canCompare ? 'btn-custom-success' : 'btn-custom-outline-secondary'
                                        }`}
                                        style={{
                                            height: '50px',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            letterSpacing: '0.5px',
                                            background: canCompare ? 
                                                'linear-gradient(135deg, #10b981, #059669)' : 
                                                'rgba(255, 255, 255, 0.1)',
                                            border: canCompare ? 'none' : '2px solid rgba(255, 255, 255, 0.3)'
                                        }}
                                    >
                                        <ArrowRightCircle className="me-2" size={18} />
                                        {canCompare ? 'Compare Now' : `Need ${2 - selectedItems.length} more`}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Collapse>
                </Container>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .compare-bar-wrapper {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .product-mini-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15) !important;
                }

                .empty-slot:hover {
                    border-color: rgba(255, 255, 255, 0.5) !important;
                    background: rgba(255, 255, 255, 0.15) !important;
                }

                .fab-container {
                    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
                }

                @media (max-width: 768px) {
                    .compare-bar-container {
                        padding: 1rem 1rem 2rem !important;
                    }
                    
                    .fab-compare-btn {
                        padding: 10px 16px !important;
                        font-size: 0.9rem !important;
                    }
                }
            `}</style>
        </>
    );
};

export default CompareBar;