import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Card, Badge, Alert, Button, Row, Col, Tabs, Tab, Container, ProgressBar } from "react-bootstrap";
import { Trash3, ArrowLeft, Grid3x3Gap, List, Award, ExclamationTriangle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const getValueType = (value, feature, allValues) => {
    if (feature.toLowerCase().includes('price')) {
        const numValue = parseFloat(value);
        const allNums = allValues.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (allNums.length > 1) {
            const min = Math.min(...allNums);
            if (numValue === min) return 'best';
        }
    } else if (feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('ram') || feature.toLowerCase().includes('battery')) {
        const numValue = parseFloat(value);
        const allNums = allValues.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (allNums.length > 1) {
            const max = Math.max(...allNums);
            if (numValue === max) return 'best';
        }
    }
    return 'neutral';
};

const ComparisonView = ({ products, features, onClearAll }) => {
    const [viewMode, setViewMode] = useState('table');
    const [activeTab, setActiveTab] = useState('all');
    const [highlightBest] = useState(true);

    if (!products || products.length === 0) {
        return (
            <Container className="text-center py-3 py-md-5">
                <Alert className="comparison-empty-state border-0" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.02))' }}>
                    <div className="empty-state-icon mb-3">
                        <Grid3x3Gap size={window.innerWidth < 768 ? 32 : 48} className="text-custom-primary" />
                    </div>
                    <h4 className="h5 h-md-4">No Products Selected</h4>
                    <p className="mb-3 small">Select at least 2 products from the home page to start comparing their features and specifications.</p>
                    <Button 
                        as={Link} 
                        to="/" 
                        size={window.innerWidth < 768 ? "md" : "lg"}
                        className="btn-custom-primary"
                    >
                        <ArrowLeft className="me-2" size={window.innerWidth < 768 ? 14 : 16} />
                        Browse Products
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (products.length < 2) {
        return (
            <Container className="text-center py-3 py-md-5">
                <Alert className="comparison-empty-state border-0" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02))' }}>
                    <div className="empty-state-icon mb-3">
                        <ExclamationTriangle size={window.innerWidth < 768 ? 32 : 48} className="text-custom-warning" />
                    </div>
                    <h4 className="h5 h-md-4">Need More Products</h4>
                    <p className="mb-3 small">You have {products.length} product selected. Add at least one more to start comparing.</p>
                    <Button 
                        as={Link} 
                        to="/" 
                        size={window.innerWidth < 768 ? "md" : "lg"}
                        className="btn-custom-primary"
                    >
                        <ArrowLeft className="me-2" size={window.innerWidth < 768 ? 14 : 16} />
                        Add More Products
                    </Button>
                </Alert>
            </Container>
        );
    }

    const categorizedFeatures = {
        all: features,
        basic: features.filter(f => ['display', 'processor', 'ram', 'storage'].includes(f)),
        performance: features.filter(f => ['processor', 'ram', 'battery'].includes(f)),
        display: features.filter(f => ['display'].includes(f)),
        other: features.filter(f => !['display', 'processor', 'ram', 'storage', 'battery'].includes(f))
    };

    const currentFeatures = categorizedFeatures[activeTab] || features;

    const renderEnhancedToolbar = () => (
        <Card className="comparison-toolbar-card mb-2 border-0 shadow-sm">
            <Card.Body className="py-2 px-2 px-md-3">
                <Container fluid>
                    <Row className="align-items-center">
                        <Col xs={12} md={8} className="mb-2 mb-md-0">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <div className="comparison-stats d-flex gap-2">
                                    <Badge className="badge-custom-primary px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                        <strong>{products.length}</strong> Products
                                    </Badge>
                                    <Badge className="badge-custom-secondary px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                        <strong>{currentFeatures.length}</strong> Features
                                    </Badge>
                                </div>
                                <div className="comparison-progress-mini d-none d-lg-block">
                                    <small className="text-muted d-block mb-1" style={{ fontSize: '0.7rem' }}>Score</small>
                                    <ProgressBar 
                                        now={85}
                                        style={{ 
                                            height: '4px', 
                                            width: '70px', 
                                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                            borderRadius: '2px'
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                                <div className="view-mode-toggle d-flex border rounded overflow-hidden ">
                                    <Button 
                                        size="sm"
                                        onClick={() => setViewMode('table')}
                                        className={`d-flex align-items-center justify-content-center flex-fill flex-md-grow-0 px-2 py-1 border-0 ${
                                            viewMode === 'table' ? 'btn-custom-primary' : 'btn-outline-secondary bg-white'
                                        }`}
                                        style={{ borderRadius: 0, fontSize: '0.7rem' }}
                                    >
                                        <List size={12} className="me-1" />
                                        <span>Table</span>
                                    </Button>
                                    
                                    <Button 
                                        size="sm"
                                        onClick={() => setViewMode('cards')}
                                        className={`d-flex align-items-center justify-content-center flex-fill flex-md-grow-0 px-2 py-1 border-0 ${
                                            viewMode === 'cards' ? 'btn-custom-primary' : 'btn-outline-secondary bg-white'
                                        }`}
                                        style={{ borderRadius: 0, fontSize: '0.7rem' }}
                                    >
                                        <Grid3x3Gap size={12} className="me-1" />
                                        <span>Cards</span>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );

    const renderTableView = () => (
        <Card className="comparison-card border-0 shadow-sm" style={{ borderRadius: '8px' }}>
            {/* Enhanced Feature Categories Tabs */}
            <div className="feature-tabs-container bg-light" style={{ borderRadius: '8px 8px 0 0' }}>
                <Container fluid className="px-2 px-md-3">
                    <Tabs
                        activeKey={activeTab}
                        onSelect={setActiveTab}
                        className="comparison-tabs border-0 pt-2"
                        variant="pills"
                    >
                        <Tab 
                            eventKey="all" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-1">
                                    <span className="fw-semibold" style={{ fontSize: '0.7rem' }}>All</span>
                                    <Badge bg="secondary" className="rounded-pill d-none d-sm-inline" style={{ fontSize: '0.6rem' }}>{categorizedFeatures.all.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="basic" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-1">
                                    <span className="fw-semibold" style={{ fontSize: '0.7rem' }}>Essential</span>
                                    <Badge bg="secondary" className="rounded-pill d-none d-sm-inline" style={{ fontSize: '0.6rem' }}>{categorizedFeatures.basic.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="performance" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-1">
                                    <span className="fw-semibold" style={{ fontSize: '0.7rem' }}>Performance</span>
                                    <Badge bg="secondary" className="rounded-pill d-none d-sm-inline" style={{ fontSize: '0.6rem' }}>{categorizedFeatures.performance.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="display" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-1">
                                    <span className="fw-semibold" style={{ fontSize: '0.7rem' }}>Display</span>
                                    <Badge bg="secondary" className="rounded-pill d-none d-sm-inline" style={{ fontSize: '0.6rem' }}>{categorizedFeatures.display.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="other" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-1">
                                    <span className="fw-semibold" style={{ fontSize: '0.7rem' }}>Other</span>
                                    <Badge bg="secondary" className="rounded-pill d-none d-sm-inline" style={{ fontSize: '0.6rem' }}>{categorizedFeatures.other.length}</Badge>
                                </div>
                            } 
                        />
                    </Tabs>
                </Container>
            </div>

            <Card.Body className="p-0">
                <div className="comparison-table-wrapper" style={{ overflowX: 'auto' }}>
                    <Table borderless className="comparison-table mb-0 table-fixed">
                        <thead className="bg-light sticky-top">
                            <tr>
                                <th className="feature-header sticky-column" style={{ 
                                    width: window.innerWidth < 768 ? '120px' : '160px',
                                    minWidth: window.innerWidth < 768 ? '120px' : '160px',
                                    maxWidth: window.innerWidth < 768 ? '120px' : '160px',
                                    backgroundColor: '#f8f9fa',
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 20,
                                    padding: window.innerWidth < 768 ? '8px 4px' : '12px 8px',
                                    borderRight: '1px solid #dee2e6'
                                }}>
                                    <span className="fw-bold text-dark" style={{ fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem' }}>Features</span>
                                </th>
                                {products.map((product) => (
                                    <th key={product.id} className="product-header" style={{ 
                                        width: window.innerWidth < 768 ? '110px' : '140px',
                                        minWidth: window.innerWidth < 768 ? '110px' : '140px',
                                        maxWidth: window.innerWidth < 768 ? '110px' : '140px',
                                        padding: window.innerWidth < 768 ? '6px 2px' : '8px 4px'
                                    }}>
                                        <div className="text-center">
                                            <div className="mb-1 mb-md-2">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    style={{ 
                                                        width: window.innerWidth < 768 ? '24px' : '32px', 
                                                        height: window.innerWidth < 768 ? '24px' : '32px', 
                                                        objectFit: 'contain',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            </div>
                                            <div className="fw-bold text-dark mb-1" style={{ 
                                                fontSize: window.innerWidth < 768 ? '0.6rem' : '0.7rem', 
                                                lineHeight: '1.2',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {product.name.length > (window.innerWidth < 768 ? 12 : 15) ? 
                                                    product.name.substring(0, window.innerWidth < 768 ? 12 : 15) + '...' : 
                                                    product.name}
                                            </div>
                                            <Badge className="badge-custom-secondary mb-1" style={{ fontSize: window.innerWidth < 768 ? '0.5rem' : '0.6rem' }}>{product.brand}</Badge>
                                            <div className="text-custom-success fw-bold" style={{ fontSize: window.innerWidth < 768 ? '0.7rem' : '0.8rem' }}>
                                                ${product.price}
                                            </div>
                                            <Badge className={`${product.category === 'Mobile' ? 'badge-custom-primary' : 'badge-custom-success'}`} style={{ fontSize: window.innerWidth < 768 ? '0.5rem' : '0.55rem' }}>
                                                {product.category.substring(0, 3)}
                                            </Badge>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeatures.map((feature, index) => {
                                const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                
                                return (
                                    <tr key={feature} className={index % 2 === 0 ? 'bg-white' : 'bg-light bg-opacity-25'}>
                                        <td className="feature-cell sticky-column" style={{ 
                                            backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 10,
                                            width: window.innerWidth < 768 ? '120px' : '160px',
                                            minWidth: window.innerWidth < 768 ? '120px' : '160px',
                                            maxWidth: window.innerWidth < 768 ? '120px' : '160px',
                                            padding: window.innerWidth < 768 ? '6px 4px' : '8px',
                                            borderRight: '1px solid #dee2e6'
                                        }}>
                                            <span className="fw-semibold text-dark" style={{ 
                                                fontSize: window.innerWidth < 768 ? '0.6rem' : '0.7rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                display: 'block'
                                            }}>
                                                {feature}
                                            </span>
                                        </td>
                                        {products.map((product) => {
                                            const value = product.specs && product.specs[feature];
                                            const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                            
                                            return (
                                                <td key={product.id} className="value-cell text-center" style={{ 
                                                    width: window.innerWidth < 768 ? '110px' : '140px',
                                                    minWidth: window.innerWidth < 768 ? '110px' : '140px',
                                                    maxWidth: window.innerWidth < 768 ? '110px' : '140px',
                                                    padding: window.innerWidth < 768 ? '6px 2px' : '8px 4px'
                                                }}>
                                                    <div className="value-container">
                                                        {valueType === 'best' && highlightBest && window.innerWidth >= 768 && (
                                                            <Award size={10} className="value-icon text-custom-success mb-1" />
                                                        )}
                                                        <div className={`value-text d-inline-block px-1 px-md-2 py-1 rounded ${
                                                            valueType === 'best' ? 'bg-success bg-opacity-10 text-success fw-bold' :
                                                            'bg-primary bg-opacity-10 text-primary'
                                                        }`} style={{ 
                                                            fontSize: window.innerWidth < 768 ? '0.55rem' : '0.65rem',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            maxWidth: window.innerWidth < 768 ? '90px' : '120px'
                                                        }}>
                                                            {value || <span className="text-muted">Normal</span>}
                                                        </div>
                                                        {valueType === 'best' && highlightBest && (
                                                            <div className="mt-1">
                                                                <Badge className="badge-custom-success" style={{ fontSize: window.innerWidth < 768 ? '0.4rem' : '0.5rem' }}>
                                                                    {window.innerWidth < 768 ? '★' : 'BEST'}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );

    const renderCardView = () => (
        <div className="comparison-cards-container">
            <Row className="g-2 g-md-3">
                {products.map((product, index) => (
                    <Col key={product.id} xs={12} sm={6} lg={4} xl={4}>
                        <Card className="product-comparison-card h-100 border-0 shadow-sm" style={{ borderRadius: '8px' }}>
                            <div className="comparison-card-header p-2 p-md-3" style={{ background: 'linear-gradient(135deg, #f8fafc, #fff)', borderRadius: '8px 8px 0 0' }}>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <Badge className="badge-custom-primary px-2 py-1" style={{ fontSize: '0.6rem' }}>#{index + 1}</Badge>
                                    <div className="rating-stars text-warning d-none d-sm-block" style={{ fontSize: '0.7rem' }}>
                                        {'★'.repeat(4)}{'☆'.repeat(1)}
                                        <small className="text-muted ms-1" style={{ fontSize: '0.6rem' }}>4.0</small>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <div className="product-image-section mb-2">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            style={{
                                                width: window.innerWidth < 768 ? '40px' : '50px',
                                                height: window.innerWidth < 768 ? '40px' : '50px',
                                                objectFit: 'contain',
                                                borderRadius: '6px',
                                                background: 'white',
                                                padding: '4px',
                                                border: '1px solid #e9ecef'
                                            }}
                                        />
                                    </div>
                                    
                                    <h6 className="product-name mb-2 fw-bold text-dark" style={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.85rem' }}>{product.name}</h6>
                                    <div className="d-flex align-items-center justify-content-center gap-1 mb-2 flex-wrap">
                                        <Badge className="badge-custom-secondary" style={{ fontSize: window.innerWidth < 768 ? '0.55rem' : '0.6rem' }}>{product.brand}</Badge>
                                        <Badge className={product.category === 'Mobile' ? 'badge-custom-primary' : 'badge-custom-success'} style={{ fontSize: window.innerWidth < 768 ? '0.55rem' : '0.6rem' }}>
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <div className="product-price text-custom-success fw-bold mb-0" style={{ fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>${product.price}</div>
                                </div>
                            </div>
                            
                            <Card.Body className="p-2 p-md-3">
                                <h6 className="specs-section-title mb-2 fw-bold text-dark border-bottom pb-1" style={{ fontSize: window.innerWidth < 768 ? '0.7rem' : '0.75rem' }}>
                                    Specifications
                                </h6>
                                <div className="specs-list">
                                    {currentFeatures.slice(0, window.innerWidth < 768 ? 4 : 5).map((feature) => {
                                        const value = product.specs[feature];
                                        const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                        const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                        
                                        return (
                                            <div key={feature} className={`comparison-spec-item d-flex justify-content-between align-items-center py-1 ${valueType === 'best' ? 'bg-success bg-opacity-10 px-2 rounded my-1' : ''}`}>
                                                <span className="spec-label fw-medium text-dark" style={{ 
                                                    fontSize: window.innerWidth < 768 ? '0.6rem' : '0.65rem',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: window.innerWidth < 768 ? '70px' : '80px'
                                                }}>{feature}:</span>
                                                <div className="spec-value-container d-flex align-items-center gap-1">
                                                    {valueType === 'best' && highlightBest && window.innerWidth >= 768 && (
                                                        <Award size={8} className="text-custom-success" />
                                                    )}
                                                    <span className={`spec-value ${valueType === 'best' ? 'fw-bold text-success' : 'text-dark'}`} style={{ 
                                                        fontSize: window.innerWidth < 768 ? '0.6rem' : '0.65rem',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        maxWidth: window.innerWidth < 768 ? '50px' : '60px'
                                                    }}>
                                                        {value || <span className="text-muted">-</span>}
                                                    </span>
                                                    {valueType === 'best' && highlightBest && (
                                                        <Badge className="badge-custom-success" style={{ fontSize: window.innerWidth < 768 ? '0.4rem' : '0.5rem' }}>★</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {currentFeatures.length > (window.innerWidth < 768 ? 4 : 5) && (
                                        <div className="text-center mt-1">
                                            <small className="text-muted" style={{ fontSize: '0.6rem' }}>
                                                +{currentFeatures.length - (window.innerWidth < 768 ? 4 : 5)} more
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

    return (
        <div className="comparison-container compact-comparison px-1 px-md-0">
            {/* Enhanced Page Header */}
            <Container fluid className="comparison-page-header mb-2">
                <Row className="align-items-center">
                    <Col xs={12} md={8} className="text-center text-md-start mb-2 mb-md-0">
                        <h1 className="page-title text-custom-primary fw-bold mb-1" style={{ fontSize: window.innerWidth < 768 ? '1.2rem' : '1.4rem' }}>
                            Selected Products
                        </h1>
                        <p className="page-subtitle text-muted mb-0" style={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.8rem' }}>
                            Analyzing {products.length} products across {currentFeatures.length} features • 
                            <span className="text-custom-success ms-1">Live data</span>
                        </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="page-actions d-flex gap-2 justify-content-center justify-content-md-end">
                            <Button 
                                as={Link} 
                                to="/" 
                                className="d-flex align-items-center btn-custom-outline-primary px-2 py-1 flex-fill flex-md-grow-0"
                                style={{ borderRadius: '6px', fontSize: '0.7rem' }}
                            >
                                <ArrowLeft className="me-1" size={12} />
                                <span>Back</span>
                            </Button>
                            <Button 
                                onClick={onClearAll}
                                className="d-flex align-items-center btn-custom-outline-danger px-2 py-1 flex-fill flex-md-grow-0"
                                style={{ borderRadius: '6px', fontSize: '0.7rem' }}
                            >
                                <Trash3 className="me-1" size={12} />
                                <span>Clear</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Enhanced Toolbar */}
            {renderEnhancedToolbar()}

            {/* Comparison Content */}
            {viewMode === 'table' ? renderTableView() : renderCardView()}

            {/* Enhanced Comparison Legend */}
            <Card className="comparison-legend mt-2 border-0 shadow-sm" style={{ borderRadius: '8px' }}>
                <Card.Body className="p-2 p-md-3">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col xs={12} md={6} className="mb-2 mb-md-0">
                                <h6 className="legend-title fw-bold mb-2 text-dark" style={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.8rem' }}>Legend</h6>
                                <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap justify-content-center justify-content-md-start">
                                    <div className="legend-item d-flex align-items-center gap-1">
                                        <Award size={12} className="text-custom-success" />
                                        <span style={{ fontSize: window.innerWidth < 768 ? '0.65rem' : '0.7rem' }}>Best</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center gap-1">
                                        <div className="legend-dot bg-primary bg-opacity-25" style={{ 
                                            width: '8px', 
                                            height: '8px', 
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{ fontSize: window.innerWidth < 768 ? '0.65rem' : '0.7rem' }}>Standard</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center gap-1">
                                        <div className="legend-dot bg-secondary bg-opacity-25" style={{ 
                                            width: '8px', 
                                            height: '8px', 
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{ fontSize: window.innerWidth < 768 ? '0.65rem' : '0.7rem' }}>Normal</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="text-center text-md-end">
                                <small className="text-muted" style={{ fontSize: window.innerWidth < 768 ? '0.6rem' : '0.65rem' }}>
                                    Updated: {new Date().toLocaleDateString()} • 
                                    <span className="text-custom-primary ms-1">Real-time</span>
                                </small>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
};

ComparisonView.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string.isRequired,
            specs: PropTypes.object.isRequired,
        })
    ).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClearAll: PropTypes.func.isRequired,
};

export default ComparisonView;