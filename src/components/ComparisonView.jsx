import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Card, Badge, Alert, Button, Row, Col, Tabs, Tab, Container, Dropdown, ProgressBar } from "react-bootstrap";
import { Trash3, ArrowLeft, Grid3x3Gap, List, Award, ExclamationTriangle, Download, Share, Filter, Sliders, Eye } from "react-bootstrap-icons";
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
    const [highlightBest, setHighlightBest] = useState(true);
    const [compactView, setCompactView] = useState(false);

    if (!products || products.length === 0) {
        return (
            <Container className="text-center py-5">
                <Alert variant="info" className="comparison-empty-state">
                    <div className="empty-state-icon mb-3">
                        <Grid3x3Gap size={48} className="text-primary" />
                    </div>
                    <h4>No Products Selected</h4>
                    <p className="mb-3">Select at least 2 products from the home page to start comparing their features and specifications.</p>
                    <Button as={Link} to="/" variant="primary" size="lg">
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
                <Alert variant="warning" className="comparison-empty-state">
                    <div className="empty-state-icon mb-3">
                        <ExclamationTriangle size={48} className="text-warning" />
                    </div>
                    <h4>Need More Products</h4>
                    <p className="mb-3">You have {products.length} product selected. Add at least one more to start comparing.</p>
                    <Button as={Link} to="/" variant="primary" size="lg">
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
                        <Col md={6}>
                            <div className="d-flex align-items-center gap-3">
                                <div className="comparison-stats">
                                    <Badge bg="primary" className="px-3 py-2 me-2">
                                        <strong>{products.length}</strong> Products
                                    </Badge>
                                    <Badge bg="secondary" className="px-3 py-2">
                                        <strong>{currentFeatures.length}</strong> Features
                                    </Badge>
                                </div>
                                <div className="comparison-progress-mini">
                                    <small className="text-muted d-block mb-1">Comparison Score</small>
                                    <ProgressBar 
                                        variant="success" 
                                        now={85} 
                                        style={{ height: '6px', width: '80px' }}
                                        className="rounded-pill"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex align-items-center justify-content-md-end gap-2">
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center">
                                        <Sliders size={14} className="me-2" />
                                        Options
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item onClick={() => setHighlightBest(!highlightBest)}>
                                            <Eye size={14} className="me-2" />
                                            {highlightBest ? '✓' : '○'} Highlight Best Values
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCompactView(!compactView)}>
                                            <List size={14} className="me-2" />
                                            {compactView ? '✓' : '○'} Compact View
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>
                                            <Download size={14} className="me-2" />
                                            Export as PDF
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Share size={14} className="me-2" />
                                            Share Comparison
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                
                                <Button 
                                    variant={viewMode === 'table' ? "primary" : "outline-primary"}
                                    size="sm"
                                    onClick={() => setViewMode('table')}
                                    className="d-flex align-items-center"
                                >
                                    <List size={14} className="me-1" />
                                    <span className="d-none d-lg-inline">Table</span>
                                </Button>
                                
                                <Button 
                                    variant={viewMode === 'cards' ? "primary" : "outline-primary"}
                                    size="sm"
                                    onClick={() => setViewMode('cards')}
                                    className="d-flex align-items-center"
                                >
                                    <Grid3x3Gap size={14} className="me-1" />
                                    <span className="d-none d-lg-inline">Cards</span>
                                </Button>
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
                                    <Badge bg="light" text="dark" className="ms-2">{categorizedFeatures.all.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="basic" 
                            title={
                                <div className="tab-title">
                                    <span>Essential</span>
                                    <Badge bg="light" text="dark" className="ms-2">{categorizedFeatures.basic.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="performance" 
                            title={
                                <div className="tab-title">
                                    <span>Performance</span>
                                    <Badge bg="light" text="dark" className="ms-2">{categorizedFeatures.performance.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="display" 
                            title={
                                <div className="tab-title">
                                    <span>Display</span>
                                    <Badge bg="light" text="dark" className="ms-2">{categorizedFeatures.display.length}</Badge>
                                </div>
                            } 
                        />
                        <Tab 
                            eventKey="other" 
                            title={
                                <div className="tab-title">
                                    <span>Other</span>
                                    <Badge bg="light" text="dark" className="ms-2">{categorizedFeatures.other.length}</Badge>
                                </div>
                            } 
                        />
                    </Tabs>
                </Container>
            </div>

            <Card.Body className="p-0">
                <div className="comparison-table-container">
                    <Table responsive borderless className={`comparison-table mb-0 ${compactView ? 'compact' : ''}`}>
                        <thead>
                            <tr>
                                <th className="feature-header sticky-column">
                                    <div className="feature-header-content">
                                        <Filter size={16} className="me-2 text-primary" />
                                        <span>Features</span>
                                    </div>
                                </th>
                                {products.map((product) => (
                                    <th key={product.id} className="product-header">
                                        <Card className="product-header-card">
                                            <Card.Body className="text-center p-3">
                                                <div className="product-image-container mb-3">
                                                    <img src={product.image} alt={product.name} className="product-header-image" />
                                                    <div className="product-rating">
                                                        <div className="rating-stars">
                                                            {'★'.repeat(4)}{'☆'.repeat(1)}
                                                        </div>
                                                        <small className="text-muted">4.0/5</small>
                                                    </div>
                                                </div>
                                                <h6 className="product-header-name mb-2">{product.name}</h6>
                                                <div className="product-header-meta">
                                                    <Badge bg="secondary" className="mb-2">{product.brand}</Badge>
                                                    <div className="product-header-price mb-2">${product.price}</div>
                                                    <Badge bg={product.category === 'Mobile' ? 'primary' : 'success'} className="category-badge">
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
                                                <div className="feature-icon">
                                                    {feature.toLowerCase().includes('display') && '📱'}
                                                    {feature.toLowerCase().includes('processor') && '⚡'}
                                                    {feature.toLowerCase().includes('ram') && '💾'}
                                                    {feature.toLowerCase().includes('storage') && '💿'}
                                                    {feature.toLowerCase().includes('battery') && '🔋'}
                                                    {feature.toLowerCase().includes('camera') && '📷'}
                                                    {feature.toLowerCase().includes('os') && '💻'}
                                                </div>
                                                <span className="feature-label">{feature}</span>
                                            </div>
                                        </td>
                                        {products.map((product) => {
                                            const value = product.specs && product.specs[feature];
                                            const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                            
                                            return (
                                                <td key={product.id} className={`value-cell ${valueType}`}>
                                                    <div className="value-container">
                                                        {valueType === 'best' && highlightBest && (
                                                            <Award size={14} className="value-icon" />
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
                                    <Badge bg="secondary" className="mb-2">{product.brand}</Badge>
                                    <div className="product-price mb-2">${product.price}</div>
                                    <Badge bg={product.category === 'Mobile' ? 'primary' : 'success'}>
                                        {product.category}
                                    </Badge>
                                </div>
                            </div>
                            
                            <Card.Body className="specs-section">
                                <h6 className="specs-section-title mb-3">
                                    <Filter size={16} className="me-2" />
                                    Specifications
                                </h6>
                                {currentFeatures.map((feature) => {
                                    const value = product.specs[feature];
                                    const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                    const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                    
                                    return (
                                        <div key={feature} className={`comparison-spec-item ${valueType}`}>
                                            <div className="spec-label-container">
                                                <span className="spec-icon">
                                                    {feature.toLowerCase().includes('display') && '📱'}
                                                    {feature.toLowerCase().includes('processor') && '⚡'}
                                                    {feature.toLowerCase().includes('ram') && '💾'}
                                                    {feature.toLowerCase().includes('storage') && '💿'}
                                                    {feature.toLowerCase().includes('battery') && '🔋'}
                                                    {feature.toLowerCase().includes('camera') && '📷'}
                                                    {feature.toLowerCase().includes('os') && '💻'}
                                                </span>
                                                <span className="spec-label">{feature}:</span>
                                            </div>
                                            <div className="spec-value-container">
                                                {valueType === 'best' && highlightBest && (
                                                    <Award size={12} className="me-1 text-success" />
                                                )}
                                                <span className="spec-value">
                                                    {value || <span className="text-muted">-</span>}
                                                </span>
                                                {valueType === 'best' && highlightBest && (
                                                    <Badge bg="success" size="sm" className="ms-2">Best</Badge>
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
                            <h1 className="page-title">Product Comparison</h1>
                            <p className="page-subtitle">
                                Analyzing {products.length} products across {currentFeatures.length} features • 
                                <span className="text-success ms-1">Data updated live</span>
                            </p>
                        </div>
                    </Col>
                    <Col xs="auto">
                        <div className="page-actions d-flex gap-2">
                            <Button 
                                as={Link} 
                                to="/" 
                                variant="outline-primary"
                                className="d-flex align-items-center"
                            >
                                <ArrowLeft className="me-2" />
                                <span className="d-none d-md-inline">Back to Products</span>
                                <span className="d-inline d-md-none">Back</span>
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                onClick={onClearAll}
                                className="d-flex align-items-center"
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
                                <h6 className="legend-title mb-3">Legend & Guide</h6>
                                <div className="d-flex align-items-center gap-4 flex-wrap">
                                    <div className="legend-item">
                                        <Award size={16} className="text-success me-2" />
                                        <span>Best Value</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-dot neutral me-2"></div>
                                        <span>Standard</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-dot muted me-2"></div>
                                        <span>Not Specified</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} className="text-md-end mt-3 mt-md-0">
                                <small className="text-muted">
                                    Comparison updated: {new Date().toLocaleDateString()} • 
                                    <span className="text-primary ms-1">Real-time pricing</span>
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