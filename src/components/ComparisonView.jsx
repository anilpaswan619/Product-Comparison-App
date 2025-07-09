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
    // const [compactView, setCompactView] = useState(false);

    if (!products || products.length === 0) {
        return (
            <Container className="text-center py-5">
                <Alert className="comparison-empty-state border-0" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.02))' }}>
                    <div className="empty-state-icon mb-3">
                        <Grid3x3Gap size={48} className="text-custom-primary" />
                    </div>
                    <h4>No Products Selected</h4>
                    <p className="mb-3">Select at least 2 products from the home page to start comparing their features and specifications.</p>
                    <Button 
                        as={Link} 
                        to="/" 
                        size="lg"
                        className="btn-custom-primary"
                    >
                        <ArrowLeft className="me-2" />
                        Browse Products
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (products.length < 2) {
        return (
            <Container className="text-center py-5">
                <Alert className="comparison-empty-state border-0" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02))' }}>
                    <div className="empty-state-icon mb-3">
                        <ExclamationTriangle size={48} className="text-custom-warning" />
                    </div>
                    <h4>Need More Products</h4>
                    <p className="mb-3">You have {products.length} product selected. Add at least one more to start comparing.</p>
                    <Button 
                        as={Link} 
                        to="/" 
                        size="lg"
                        className="btn-custom-primary"
                    >
                        <ArrowLeft className="me-2" />
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
        <Card className="comparison-toolbar-card mb-3 border-0 shadow-sm">
            <Card.Body className="py-3 px-4">
                <Container>
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                <div className="comparison-stats d-flex gap-2">
                                    <Badge className="badge-custom-primary px-3 py-2 fs-6">
                                        <strong>{products.length}</strong> Products
                                    </Badge>
                                    <Badge className="badge-custom-secondary px-3 py-2 fs-6">
                                        <strong>{currentFeatures.length}</strong> Features
                                    </Badge>
                                </div>
                                <div className="comparison-progress-mini d-none d-lg-block">
                                    <small className="text-muted d-block mb-1 fw-medium">Comparison Score</small>
                                    <ProgressBar 
                                        now={85}
                                        style={{ 
                                            height: '6px', 
                                            width: '90px', 
                                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                            borderRadius: '3px'
                                        }}
                                        className="rounded-pill"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex align-items-center justify-content-md-end">
                                <div className="view-mode-toggle d-flex border rounded-2 overflow-hidden">
                                    <Button 
                                        size="sm"
                                        onClick={() => setViewMode('table')}
                                        className={`d-flex align-items-center px-3 py-2 border-0 ${
                                            viewMode === 'table' ? 'btn-custom-primary' : 'btn-outline-secondary bg-white'
                                        }`}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <List size={14} className="me-1" />
                                        <span className="d-none d-lg-inline">Table</span>
                                    </Button>
                                    
                                    <Button 
                                        size="sm"
                                        onClick={() => setViewMode('cards')}
                                        className={`d-flex align-items-center px-3 py-2 border-0 ${
                                            viewMode === 'cards' ? 'btn-custom-primary' : 'btn-outline-secondary bg-white'
                                        }`}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <Grid3x3Gap size={14} className="me-1" />
                                        <span className="d-none d-lg-inline">Cards</span>
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
        <Card className="comparison-card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            {/* Enhanced Feature Categories Tabs */}
            <div className="feature-tabs-container bg-light" style={{ borderRadius: '12px 12px 0 0' }}>
                <Container>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={setActiveTab}
                        className="comparison-tabs border-0 pt-3"
                    >
                        <Tab 
                            eventKey="all" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-2">
                                    <span className="fw-semibold">All Features</span>
                                    <Badge bg="secondary" className="rounded-pill">{categorizedFeatures.all.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="basic" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-2">
                                    <span className="fw-semibold">Essential</span>
                                    <Badge bg="secondary" className="rounded-pill">{categorizedFeatures.basic.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="performance" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-2">
                                    <span className="fw-semibold">Performance</span>
                                    <Badge bg="secondary" className="rounded-pill">{categorizedFeatures.performance.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="display" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-2">
                                    <span className="fw-semibold">Display</span>
                                    <Badge bg="secondary" className="rounded-pill">{categorizedFeatures.display.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="other" 
                            title={
                                <div className="tab-title d-flex align-items-center gap-2">
                                    <span className="fw-semibold">Other</span>
                                    <Badge bg="secondary" className="rounded-pill">{categorizedFeatures.other.length}</Badge>
                                </div>
                            } 
                        />
                    </Tabs>
                </Container>
            </div>

            <Card.Body className="p-0">
                <div className="comparison-table-container">
                    <Table responsive borderless className="comparison-table mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="feature-header sticky-column py-3 px-4" style={{ minWidth: '180px', backgroundColor: '#f8f9fa' }}>
                                    <div className="feature-header-content">
                                        <span className="fw-bold text-dark">Features</span>
                                    </div>
                                </th>
                                {products.map((product) => (
                                    <th key={product.id} className="product-header p-3" style={{ minWidth: '200px' }}>
                                        <Card className="product-header-card border-0 bg-white shadow-sm" style={{ borderRadius: '8px' }}>
                                            <Card.Body className="text-center p-3">
                                                <div className="product-image-container mb-3">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className="product-header-image" 
                                                        style={{ 
                                                            width: '60px', 
                                                            height: '60px', 
                                                            objectFit: 'contain',
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                </div>
                                                <h6 className="product-header-name mb-2 fw-bold text-dark" style={{ fontSize: '0.9rem', lineHeight: '1.3' }}>
                                                    {product.name}
                                                </h6>
                                                <div className="product-header-meta">
                                                    <Badge className="badge-custom-secondary mb-2">{product.brand}</Badge>
                                                    <div className="product-header-price mb-2 text-custom-success fw-bold h6">
                                                        ${product.price}
                                                    </div>
                                                    <Badge className={`${product.category === 'Mobile' ? 'badge-custom-primary' : 'badge-custom-success'} category-badge`}>
                                                        {product.category}
                                                    </Badge>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeatures.map((feature, index) => {
                                const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                
                                return (
                                    <tr key={feature} className={`comparison-row ${index % 2 === 0 ? 'bg-white' : 'bg-light bg-opacity-25'}`}>
                                        <td className="feature-cell sticky-column py-3 px-4 border-end" style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                                            <div className="feature-name">
                                                <span className="feature-label fw-semibold text-dark">{feature}</span>
                                            </div>
                                        </td>
                                        {products.map((product) => {
                                            const value = product.specs && product.specs[feature];
                                            const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                            
                                            return (
                                                <td key={product.id} className={`value-cell text-center py-3 px-3 ${valueType}`}>
                                                    <div className="value-container">
                                                        {valueType === 'best' && highlightBest && (
                                                            <Award size={14} className="value-icon text-custom-success mb-1" />
                                                        )}
                                                        <div className={`value-text d-inline-block px-3 py-2 rounded-2 ${
                                                            valueType === 'best' ? 'bg-success bg-opacity-10 text-success fw-bold border border-success border-opacity-25' :
                                                            'bg-primary bg-opacity-10 text-primary'
                                                        }`}>
                                                            {value || <span className="text-muted">Not specified</span>}
                                                        </div>
                                                        {valueType === 'best' && highlightBest && (
                                                            <div className="best-indicator mt-1">
                                                                <Badge className="badge-custom-success">BEST</Badge>
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
            <Row className="g-4">
                {products.map((product, index) => (
                    <Col key={product.id} xl={4} lg={6} md={12}>
                        <Card className="product-comparison-card h-100 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                            <div className="comparison-card-header p-4" style={{ background: 'linear-gradient(135deg, #f8fafc, #fff)', borderRadius: '12px 12px 0 0' }}>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Badge className="badge-custom-primary px-3 py-2">#{index + 1}</Badge>
                                    <div className="rating-stars text-warning">
                                        {'★'.repeat(4)}{'☆'.repeat(1)}
                                        <small className="text-muted ms-1">4.0</small>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <div className="product-image-section mb-3">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="comparison-card-image"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'contain',
                                                borderRadius: '8px',
                                                background: 'white',
                                                padding: '8px',
                                                border: '1px solid #e9ecef'
                                            }}
                                        />
                                    </div>
                                    
                                    <h5 className="product-name mb-2 fw-bold text-dark">{product.name}</h5>
                                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                                        <Badge className="badge-custom-secondary">{product.brand}</Badge>
                                        <Badge className={product.category === 'Mobile' ? 'badge-custom-primary' : 'badge-custom-success'}>
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <div className="product-price text-custom-success fw-bold h4 mb-0">${product.price}</div>
                                </div>
                            </div>
                            
                            <Card.Body className="p-4">
                                <h6 className="specs-section-title mb-3 fw-bold text-dark border-bottom pb-2">
                                    Specifications
                                </h6>
                                <div className="specs-list">
                                    {currentFeatures.map((feature) => {
                                        const value = product.specs[feature];
                                        const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                        const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                        
                                        return (
                                            <div key={feature} className={`comparison-spec-item d-flex justify-content-between align-items-center py-2 border-bottom border-light ${valueType === 'best' ? 'bg-success bg-opacity-10 px-3 rounded-2 my-1' : ''}`}>
                                                <span className="spec-label fw-medium text-dark">{feature}:</span>
                                                <div className="spec-value-container d-flex align-items-center gap-1">
                                                    {valueType === 'best' && highlightBest && (
                                                        <Award size={12} className="text-custom-success" />
                                                    )}
                                                    <span className={`spec-value ${valueType === 'best' ? 'fw-bold text-success' : 'text-dark'}`}>
                                                        {value || <span className="text-muted">-</span>}
                                                    </span>
                                                    {valueType === 'best' && highlightBest && (
                                                        <Badge className="badge-custom-success ms-1">Best</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

    return (
        <div className="comparison-container" style={{ paddingBottom: '2rem' }}>
            {/* Enhanced Page Header */}
            <Container className="comparison-page-header mb-4">
                <Row className="align-items-center">
                    <Col className="text-lg-start">
                        <h1 className="page-title text-custom-primary fw-bold mb-2" style={{ fontSize: '2rem' }}>
                            Selected Products
                        </h1>
                        <p className="page-subtitle text-muted mb-0">
                            Analyzing {products.length} products across {currentFeatures.length} features • 
                            <span className="text-custom-success ms-1">Data updated live</span>
                        </p>
                    </Col>
                    <Col xs="auto">
                        <div className="page-actions d-flex gap-2">
                            <Button 
                                as={Link} 
                                to="/" 
                                className="d-flex align-items-center btn-custom-outline-primary px-3 py-2"
                                style={{ borderRadius: '8px' }}
                            >
                                <ArrowLeft className="me-2" />
                                <span className="d-none d-md-inline">Back to Products</span>
                                <span className="d-inline d-md-none">Back</span>
                            </Button>
                            <Button 
                                onClick={onClearAll}
                                className="d-flex align-items-center btn-custom-outline-danger px-3 py-2"
                                style={{ borderRadius: '8px' }}
                            >
                                <Trash3 className="me-2" />
                                <span className="d-none d-md-inline">Clear All</span>
                                <span className="d-inline d-md-none">Clear</span>
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
            <Card className="comparison-legend mt-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <Card.Body className="p-4">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h6 className="legend-title fw-bold mb-3 text-dark">Legend & Guide</h6>
                                <div className="d-flex align-items-center gap-4 flex-wrap">
                                    <div className="legend-item d-flex align-items-center gap-2">
                                        <Award size={16} className="text-custom-success" />
                                        <span className="fw-medium">Best Value</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center gap-2">
                                        <div className="legend-dot bg-primary bg-opacity-25" style={{ 
                                            width: '12px', 
                                            height: '12px', 
                                            borderRadius: '50%'
                                        }}></div>
                                        <span className="fw-medium">Standard</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center gap-2">
                                        <div className="legend-dot bg-secondary bg-opacity-25" style={{ 
                                            width: '12px', 
                                            height: '12px', 
                                            borderRadius: '50%'
                                        }}></div>
                                        <span className="fw-medium">Not Specified</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} className="text-md-end mt-3 mt-md-0">
                                <small className="text-muted">
                                    Comparison updated: {new Date().toLocaleDateString()} • 
                                    <span className="text-custom-primary ms-1">Real-time pricing</span>
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