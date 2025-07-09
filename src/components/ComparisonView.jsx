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
        <Card className="comparison-toolbar-card mb-4 border-0 shadow-sm">
            <Card.Body className="py-3">
                <Container>
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                <div className="comparison-stats d-flex gap-2">
                                    <Badge className="badge-custom-primary px-3 py-2">
                                        <strong>{products.length}</strong> Products
                                    </Badge>
                                    <Badge className="badge-custom-secondary px-3 py-2">
                                        <strong>{currentFeatures.length}</strong> Features
                                    </Badge>
                                </div>
                                <div className="comparison-progress-mini d-none d-lg-block">
                                    <small className="text-muted d-block mb-1 fw-medium">Comparison Score</small>
                                    <ProgressBar 
                                        now={85}
                                        style={{ 
                                            height: '8px', 
                                            width: '100px', 
                                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                            borderRadius: '50px'
                                        }}
                                        className="rounded-pill"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex align-items-center justify-content-md-end gap-2">
                                <div className="view-mode-toggle d-flex">
                                    <Button 
                                        size="sm"
                                        onClick={() => setViewMode('table')}
                                        className={`d-flex align-items-center ${
                                            viewMode === 'table' ? 'btn-custom-primary' : 'btn-custom-outline-secondary'
                                        }`}
                                        style={{
                                            borderRadius: '8px 0 0 8px',
                                            padding: '8px 16px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        <List size={14} className="me-1" />
                                        <span className="d-none d-lg-inline">Table</span>
                                    </Button>
                                    
                                    <Button 
                                        size="sm"
                                        onClick={() => setViewMode('cards')}
                                        className={`d-flex align-items-center ${
                                            viewMode === 'cards' ? 'btn-custom-primary' : 'btn-custom-outline-secondary'
                                        }`}
                                        style={{
                                            borderRadius: '0 8px 8px 0',
                                            padding: '8px 16px',
                                            fontWeight: '500',
                                            borderLeft: 'none'
                                        }}
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
        <Card className="comparison-card border-0 shadow-lg">
            {/* Enhanced Feature Categories Tabs */}
            <div className="feature-tabs-container">
                <Container>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={setActiveTab}
                        className="comparison-tabs border-0"
                    >
                        <Tab 
                            eventKey="all" 
                            title={
                                <div className="tab-title">
                                    <span>All Features</span>
                                    <Badge bg="light" text="dark" className="ms-2 rounded-pill">{categorizedFeatures.all.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="basic" 
                            title={
                                <div className="tab-title">
                                    <span>Essential</span>
                                    <Badge bg="light" text="dark" className="ms-2 rounded-pill">{categorizedFeatures.basic.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="performance" 
                            title={
                                <div className="tab-title">
                                    <span>Performance</span>
                                    <Badge bg="light" text="dark" className="ms-2 rounded-pill">{categorizedFeatures.performance.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="display" 
                            title={
                                <div className="tab-title">
                                    <span>Display</span>
                                    <Badge bg="light" text="dark" className="ms-2 rounded-pill">{categorizedFeatures.display.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="other" 
                            title={
                                <div className="tab-title">
                                    <span>Other</span>
                                    <Badge bg="light" text="dark" className="ms-2 rounded-pill">{categorizedFeatures.other.length}</Badge>
                                </div>
                            } 
                        />
                    </Tabs>
                </Container>
            </div>

            <Card.Body className="p-0">
                <div className="comparison-table-container">
                    <Table responsive borderless className="comparison-table mb-0">
                        <thead>
                            <tr>
                                <th className="feature-header sticky-column">
                                    <div className="feature-header-content">
                                        <span className="fw-bold">Features</span>
                                    </div>
                                </th>
                                {products.map((product) => (
                                    <th key={product.id} className="product-header">
                                        <Card className="product-header-card">
                                            <Card.Body className="text-center p-3">
                                                <div className="product-image-container mb-3">
                                                    <img src={product.image} alt={product.name} className="product-header-image" />
                                                </div>
                                                <h6 className="product-header-name mb-2">{product.name}</h6>
                                                <div className="product-header-meta">
                                                    <Badge className="badge-custom-secondary mb-2">{product.brand}</Badge>
                                                    <div className="product-header-price mb-2 text-custom-success">${product.price}</div>
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
                                    <tr key={feature} className={`comparison-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <td className="feature-cell sticky-column">
                                            <div className="feature-name">
                                                <span className="feature-label fw-semibold">{feature}</span>
                                            </div>
                                        </td>
                                        {products.map((product) => {
                                            const value = product.specs && product.specs[feature];
                                            const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                            
                                            return (
                                                <td key={product.id} className={`value-cell ${valueType}`}>
                                                    <div className="value-container">
                                                        {valueType === 'best' && highlightBest && (
                                                            <Award size={14} className="value-icon text-custom-success" />
                                                        )}
                                                        <span className="value-text">
                                                            {value || <span className="text-muted">Not specified</span>}
                                                        </span>
                                                        {valueType === 'best' && highlightBest && (
                                                            <div className="best-indicator">BEST</div>
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
                    <Col key={product.id} xl={4} lg={6} md={12} className="mb-4">
                        <Card className="product-comparison-card h-100 border-0 shadow-lg">
                            <div className="comparison-card-header">
                                <div className="product-rank">#{index + 1}</div>
                                <div className="product-image-section">
                                    <img src={product.image} alt={product.name} className="comparison-card-image" />
                                </div>
                                <div className="product-info-section text-center">
                                    <h5 className="product-name mb-2">{product.name}</h5>
                                    <Badge className="badge-custom-secondary mb-2">{product.brand}</Badge>
                                    <div className="product-price mb-2 text-custom-success">${product.price}</div>
                                    <Badge className={product.category === 'Mobile' ? 'badge-custom-primary' : 'badge-custom-success'}>
                                        {product.category}
                                    </Badge>
                                </div>
                            </div>
                            
                            <Card.Body className="specs-section">
                                <h6 className="specs-section-title mb-3">
                                    Specifications
                                </h6>
                                {currentFeatures.map((feature) => {
                                    const value = product.specs[feature];
                                    const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                    const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                    
                                    return (
                                        <div key={feature} className={`comparison-spec-item ${valueType}`}>
                                            <div className="spec-label-container">
                                                <span className="spec-label">{feature}:</span>
                                            </div>
                                            <div className="spec-value-container">
                                                {valueType === 'best' && highlightBest && (
                                                    <Award size={12} className="me-1 text-custom-success" />
                                                )}
                                                <span className="spec-value">
                                                    {value || <span className="text-muted">-</span>}
                                                </span>
                                                {valueType === 'best' && highlightBest && (
                                                    <Badge className="badge-custom-success ms-2">Best</Badge>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

    return (
        <div className="comparison-container">
            {/* Enhanced Page Header */}
            <Container className="comparison-page-header mb-4">
                <Row className="align-items-center">
                    <Col>
                        <div className="page-title-section">
                            <h1 className="page-title text-custom-primary">
                                Product Comparison
                            </h1>
                            <p className="page-subtitle">
                                Analyzing {products.length} products across {currentFeatures.length} features • 
                                <span className="text-custom-success ms-1">Data updated live</span>
                            </p>
                        </div>
                    </Col>
                    <Col xs="auto">
                        <div className="page-actions d-flex gap-2">
                            <Button 
                                as={Link} 
                                to="/" 
                                className="d-flex align-items-center btn-custom-outline-primary"
                            >
                                <ArrowLeft className="me-2" />
                                <span className="d-none d-md-inline">Back to Products</span>
                                <span className="d-inline d-md-none">Back</span>
                            </Button>
                            <Button 
                                onClick={onClearAll}
                                className="d-flex align-items-center btn-custom-outline-danger"
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
            <Card className="comparison-legend mt-4 border-0 shadow-sm">
                <Card.Body className="py-4">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h6 className="legend-title mb-3 fw-bold">Legend & Guide</h6>
                                <div className="d-flex align-items-center gap-4 flex-wrap">
                                    <div className="legend-item d-flex align-items-center">
                                        <Award size={16} className="me-2 text-custom-success" />
                                        <span>Best Value</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center">
                                        <div className="legend-dot me-2 neutral" style={{ 
                                            width: '12px', 
                                            height: '12px', 
                                            borderRadius: '50%',
                                            background: 'rgba(99, 102, 241, 0.4)'
                                        }}></div>
                                        <span>Standard</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center">
                                        <div className="legend-dot me-2 muted" style={{ 
                                            width: '12px', 
                                            height: '12px', 
                                            borderRadius: '50%',
                                            background: 'rgba(156, 163, 175, 0.4)'
                                        }}></div>
                                        <span>Not Specified</span>
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