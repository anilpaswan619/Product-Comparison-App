import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Card,  Button, Row, Col, Tabs, Tab, Container,  } from "react-bootstrap";
import { Trash3, ArrowLeft, Grid3x3Gap, List, Award, ExclamationTriangle, Star, StarFill } from "react-bootstrap-icons";
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!products || products.length === 0) {
        return (
            <Container className="text-center py-5">
                <div className="empty-state-wrapper mx-auto" style={{ maxWidth: '500px' }}>
                    <Card className="border-0 shadow-lg" style={{ 
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important',
                        color: 'white'
                    }}>
                        <Card.Body className="p-5">
                            <div className="empty-state-icon mb-4">
                                <div className="icon-circle mx-auto d-flex align-items-center justify-content-center" style={{
                                    width: isMobile ? '80px' : '100px',
                                    height: isMobile ? '80px' : '100px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%'
                                }}>
                                    <Grid3x3Gap size={isMobile ? 32 : 40} />
                                </div>
                            </div>
                            <h3 className="mb-3" style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>No Products Selected</h3>
                            <p className="mb-4 opacity-90" style={{ fontSize: isMobile ? '0.9rem' : '1.1rem' }}>
                                Start comparing products by selecting at least 2 items from our catalog
                            </p>
                            <Button 
                                as={Link} 
                                to="/" 
                                size={isMobile ? "md" : "lg"}
                                className="btn-light text-dark fw-bold px-4 py-2"
                                style={{ borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                            >
                                <ArrowLeft className="me-2" size={16} />
                                Browse Products
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }

    if (products.length < 2) {
        return (
            <Container className="text-center py-5">
                <div className="empty-state-wrapper mx-auto" style={{ maxWidth: '500px' }}>
                    <Card className="border-0 shadow-lg" style={{ 
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #d63031 100%)',
                        color: 'white'
                    }}>
                        <Card.Body className="p-5">
                            <div className="empty-state-icon mb-4">
                                <div className="icon-circle mx-auto d-flex align-items-center justify-content-center" style={{
                                    width: isMobile ? '80px' : '100px',
                                    height: isMobile ? '80px' : '100px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%'
                                }}>
                                    <ExclamationTriangle size={isMobile ? 32 : 40} />
                                </div>
                            </div>
                            <h3 className="mb-3" style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>Need More Products</h3>
                            <p className="mb-4 opacity-90" style={{ fontSize: isMobile ? '0.9rem' : '1.1rem' }}>
                                You have {products.length} product selected. Add at least one more to start comparing.
                            </p>
                            <Button 
                                as={Link} 
                                to="/" 
                                size={isMobile ? "md" : "lg"}
                                className="btn-light text-dark fw-bold px-4 py-2"
                                style={{ borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                            >
                                <ArrowLeft className="me-2" size={16} />
                                Add More Products
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }

    const categorizedFeatures = {
        all: features,
        basic: features.filter(f => ['display', 'processor', 'ram', 'storage'].some(key => f.toLowerCase().includes(key))),
        performance: features.filter(f => ['processor', 'ram', 'battery', 'cpu', 'gpu'].some(key => f.toLowerCase().includes(key))),
        display: features.filter(f => ['display', 'screen', 'resolution'].some(key => f.toLowerCase().includes(key))),
        other: features.filter(f => !['display', 'processor', 'ram', 'storage', 'battery', 'cpu', 'gpu', 'screen', 'resolution'].some(key => f.toLowerCase().includes(key)))
    };

    const currentFeatures = categorizedFeatures[activeTab] || features;

    const renderModernToolbar = () => (
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                <Card.Body className="py-3 px-4">
                    <Row className="align-items-center">
                        <Col xs={12} lg={8} className="mb-3 mb-lg-0">
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                <div className="stats-group d-flex gap-2 flex-wrap">
                                    <div className="stat-badge d-flex align-items-center px-3 py-2 rounded-pill" style={{
                                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        fontWeight: '600'
                                    }}>
                                        <span>{products.length} Products</span>
                                    </div>
                                    <div className="stat-badge d-flex align-items-center px-3 py-2 rounded-pill" style={{
                                        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        fontWeight: '600'
                                    }}>
                                        <span>{currentFeatures.length} Features</span>
                                    </div>
                                </div>
                                
                                {!isMobile && (
                                    <div className="comparison-score d-flex align-items-center gap-2">
                                        <span className="text-muted fw-medium" style={{ fontSize: '0.8rem' }}>Similarity:</span>
                                        <div className="score-bar" style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ 
                                                width: '85%', 
                                                height: '100%', 
                                                background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                                                borderRadius: '3px'
                                            }}></div>
                                        </div>
                                        <span className="fw-bold" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>85%</span>
                                    </div>
                                )}
                            </div>
                        </Col>
                        
                        <Col xs={12} lg={4}>
                            <div className="view-toggle-wrapper d-flex justify-content-center justify-content-lg-end">
                                <div className="view-toggle d-flex p-1 rounded-pill" style={{ 
                                    background: 'white',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <Button 
                                        onClick={() => setViewMode('table')}
                                        className={`d-flex align-items-center justify-content-center px-3 py-2 border-0 rounded-pill transition-all ${
                                            viewMode === 'table' 
                                                ? 'text-white' 
                                                : 'text-muted bg-transparent'
                                        }`}
                                        style={{ 
                                            background: viewMode === 'table' 
                                                ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important'
                                                : 'transparent',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            minWidth: isMobile ? '80px' : '90px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <List size={14} className="me-1" />
                                        Table
                                    </Button>
                                    
                                    <Button 
                                        onClick={() => setViewMode('cards')}
                                        className={`d-flex align-items-center justify-content-center px-3 py-2 border-0 rounded-pill transition-all ${
                                            viewMode === 'cards' 
                                                ? 'text-white' 
                                                : 'text-muted bg-transparent'
                                        }`}
                                        style={{ 
                                            background: viewMode === 'cards' 
                                                ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important'
                                                : 'transparent',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            minWidth: isMobile ? '80px' : '90px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <Grid3x3Gap size={14} className="me-1" />
                                        Cards
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </div>
        </Card>
    );

    const renderModernTableView = () => (
        <Card className="border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
            {/* Feature Tabs */}
            <div style={{ background: '#f8fafc' }}>
                <Container fluid className="px-4 pt-3">
                    <Tabs
                        activeKey={activeTab}
                        onSelect={setActiveTab}
                        className="modern-tabs border-0"
                        variant="pills"
                    >
                        {Object.entries(categorizedFeatures).map(([key, featureList]) => (
                            <Tab 
                                key={key}
                                eventKey={key} 
                                title={
                                    <div className="modern-tab-title d-flex align-items-center gap-2">
                                        <span className="fw-semibold text-capitalize" style={{ fontSize: isMobile ? '0.75rem' : '0.85rem' }}>
                                            {key === 'basic' ? 'Essential' : key}
                                        </span>
                                        <div className="feature-count px-2 py-1 rounded-pill" style={{
                                            background: activeTab === key ? 'rgba(255,255,255,0.3)' : 'rgba(var(--primary-rgb), 0.1)',
                                            color: activeTab === key ? 'white' : 'var(--primary-color)',
                                            fontSize: '0.7rem',
                                            fontWeight: '600',
                                            minWidth: '24px',
                                            textAlign: 'center'
                                        }}>
                                            {featureList.length}
                                        </div>
                                    </div>
                                } 
                            />
                        ))}
                    </Tabs>
                </Container>
            </div>

            <Card.Body className="p-0">
                <div className="table-wrapper" style={{ overflowX: 'auto', maxHeight: isMobile ? '70vh' : 'none' }}>
                    <Table className="modern-comparison-table mb-0">
                        <thead style={{ 
                            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important',
                            color: 'white',
                            position: 'sticky',
                            top: 0,
                            zIndex: 10
                        }}>
                            <tr>
                                <th className="feature-column" style={{ 
                                    width: isMobile ? '140px' : '200px',
                                    minWidth: isMobile ? '140px' : '200px',
                                    padding: isMobile ? '12px 8px' : '16px 20px',
                                    fontWeight: '700',
                                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 11,
                                    verticalAlign: 'middle',
                                    borderRight: '2px solid rgba(255,255,255,0.2)'
                                }}>
                                    Features
                                </th>
                                {products.map((product) => (
                                    <th key={product.id} className="product-column text-center" style={{ 
                                        width: isMobile ? '140px' : '200px',
                                        minWidth: isMobile ? '140px' : '200px',
                                        padding: isMobile ? '8px 4px' : '12px 8px'
                                    }}>
                                        <div className="product-header-content">
                                            <div className="product-image mb-3">
                                                <div className="image-wrapper d-inline-block p-3 rounded-circle" style={{
                                                    background: 'rgba(255,255,255,0.2)',
                                                    border: '2px solid rgba(255,255,255,0.3)'
                                                }}>
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        style={{ 
                                                            width: isMobile ? '40px' : '50px', 
                                                            height: isMobile ? '40px' : '50px', 
                                                            objectFit: 'contain',
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="product-info">
                                                <div className="product-name fw-bold mb-2" style={{ 
                                                    fontSize: isMobile ? '0.75rem' : '0.85rem', 
                                                    lineHeight: '1.2'
                                                }}>
                                                    {product.name.length > (isMobile ? 12 : 16) ? 
                                                        product.name.substring(0, isMobile ? 12 : 16) + '...' : 
                                                        product.name}
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                                                    <div className="brand-badge px-2 py-1 rounded-pill" style={{
                                                        background: 'rgba(255,255,255,0.2)',
                                                        fontSize: isMobile ? '0.6rem' : '0.65rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        {product.brand}
                                                    </div>
                                                    <div className="price fw-bold" style={{ 
                                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                                        color: '#ffd700'
                                                    }}>
                                                        ${product.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeatures.map((feature, index) => {
                                const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                
                                return (
                                    <tr key={feature} className={index % 2 === 0 ? 'row-even' : 'row-odd'} style={{
                                        background: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                                        borderBottom: '1px solid #e2e8f0',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <td className="feature-name-cell" style={{ 
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 9,
                                            background: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                                            padding: isMobile ? '12px 8px' : '16px 20px',
                                            borderRight: '2px solid #e2e8f0',
                                            fontWeight: '600',
                                            fontSize: isMobile ? '0.75rem' : '0.85rem',
                                            color: '#374151',
                                            verticalAlign: 'middle',
                                        }}>
                                            <div className="feature-label justify-content-center d-flex align-items-center gap-2">
                                                <span style={{ 
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {feature}
                                                </span>
                                            </div>
                                        </td>
                                        {products.map((product) => {
                                            const value = product.specs && product.specs[feature];
                                            const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                            
                                            return (
                                                <td key={product.id} className="value-cell text-center" style={{ 
                                                    padding: isMobile ? '12px 4px' : '16px 8px',
                                                    verticalAlign: 'middle'
                                                }}>
                                                    <div className="value-container">
                                                        {valueType === 'best' && highlightBest && (
                                                            <div className="best-indicator mb-1">
                                                                <Award size={isMobile ? 12 : 14} className="text-warning" />
                                                            </div>
                                                        )}
                                                        <div className={`value-display px-3 py-2 rounded-pill d-inline-block ${
                                                            valueType === 'best' 
                                                                ? 'best-value' 
                                                                : 'normal-value'
                                                        }`} style={{ 
                                                            background: valueType === 'best' 
                                                                ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                                                                : '#f1f5f9',
                                                            color: valueType === 'best' ? 'white' : '#475569',
                                                            fontSize: isMobile ? '0.7rem' : '0.8rem',
                                                            fontWeight: valueType === 'best' ? '700' : '600',
                                                            minWidth: isMobile ? '60px' : '80px',
                                                            maxWidth: isMobile ? '100px' : '140px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            border: valueType === 'best' ? 'none' : '1px solid #e2e8f0'
                                                        }}>
                                                            {value || <span className="text-muted">N/A</span>}
                                                        </div>
                                                        {valueType === 'best' && highlightBest && (
                                                            <div className="best-badge mt-1">
                                                                <span className="px-2 py-1 rounded-pill d-inline-block" style={{
                                                                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                                                                    color: '#744210',
                                                                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                                                                    fontWeight: '700',
                                                                    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)'
                                                                }}>
                                                                    {isMobile ? '★' : 'BEST'}
                                                                </span>
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

    const renderModernCardView = () => (
        <div className="modern-cards-container">
            <Row className={`g-${isMobile ? '3' : '4'}`}>
                {products.map((product, index) => (
                    <Col key={product.id} xs={12} sm={6} lg={4} xl={4}>
                        <Card className="product-card h-100 border-0 shadow-lg position-relative overflow-hidden" style={{ 
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                            background: 'white'
                        }}>
                            {/* Card Header with Theme Gradient */}
                            <div className="card-header-modern p-4" style={{ 
                                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important',
                                color: 'white'
                            }}>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="rank-badge px-3 py-1 rounded-pill" style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        #{index + 1}
                                    </div>
                                    <div className="rating-display d-flex align-items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="star-icon">
                                                {i < 4 ? <StarFill size={12} className="text-warning" /> : <Star size={12} className="text-warning opacity-50" />}
                                            </span>
                                        ))}
                                        <span className="ms-1" style={{ fontSize: '0.75rem', opacity: 0.9 }}>4.0</span>
                                    </div>
                                </div>
                                
                                <div className="product-showcase text-center">
                                    <div className="product-image-container mb-3">
                                        <div className="image-wrapper d-inline-block p-4 rounded-circle" style={{
                                            background: 'rgba(255,255,255,0.15)',
                                            border: '3px solid rgba(255,255,255,0.2)'
                                        }}>
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                style={{
                                                    width: isMobile ? '60px' : '70px',
                                                    height: isMobile ? '60px' : '70px',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    
                                    <h5 className="product-title mb-3 fw-bold" style={{ 
                                        fontSize: isMobile ? '1rem' : '1.1rem',
                                        lineHeight: '1.3'
                                    }}>
                                        {product.name}
                                    </h5>
                                    
                                    <div className="product-meta d-flex justify-content-center align-items-center gap-3 mb-0">
                                        <span className="brand-badge px-3 py-1 rounded-pill" style={{
                                            background: 'rgba(255,255,255,0.2)',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {product.brand}
                                        </span>
                                        <div className="price-tag" style={{ 
                                            fontSize: isMobile ? '1.2rem' : '1.3rem',
                                            fontWeight: '800',
                                            color: '#ffd700'
                                        }}>
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Card Body with Specifications */}
                            <Card.Body className="p-4">
                                <div className="specs-header d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                                    <h6 className="specs-title mb-0 fw-bold text-dark" style={{ 
                                        fontSize: isMobile ? '0.9rem' : '1rem'
                                    }}>
                                        Key Specifications
                                    </h6>
                                </div>
                                
                                <div className="specs-grid">
                                    {currentFeatures.slice(0, isMobile ? 5 : 6).map((feature) => {
                                        const value = product.specs[feature];
                                        const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                        const valueType = highlightBest && value ? getValueType(value, feature, allValues) : 'neutral';
                                        
                                        return (
                                            <div key={feature} className={`spec-row d-flex justify-content-between align-items-center py-2 px-3 rounded-lg mb-2 ${
                                                valueType === 'best' ? 'best-spec' : 'normal-spec'
                                            }`} style={{
                                                background: valueType === 'best' 
                                                    ? 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%)'
                                                    : '#f8fafc',
                                                border: valueType === 'best' 
                                                    ? '1px solid rgba(72, 187, 120, 0.2)'
                                                    : '1px solid #e2e8f0',
                                                borderRadius: '8px'
                                            }}>
                                                <div className="spec-label-container d-flex align-items-center gap-2">
                                                    {valueType === 'best' && (
                                                        <Award size={12} className="text-success" />
                                                    )}
                                                    <span className="spec-label fw-medium text-dark" style={{ 
                                                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                        maxWidth: isMobile ? '80px' : '100px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {feature}:
                                                    </span>
                                                </div>
                                                
                                                <div className="spec-value-container d-flex align-items-center gap-1">
                                                    <span className={`spec-value fw-bold ${
                                                        valueType === 'best' ? 'text-success' : 'text-dark'
                                                    }`} style={{ 
                                                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                        maxWidth: isMobile ? '70px' : '90px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {value || <span className="text-muted">N/A</span>}
                                                    </span>
                                                    {valueType === 'best' && (
                                                        <span className="best-star px-1 py-0 rounded-circle d-inline-flex align-items-center justify-content-center" style={{
                                                            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                                                            color: '#744210',
                                                            fontSize: '0.6rem',
                                                            fontWeight: '700',
                                                            width: '18px',
                                                            height: '18px'
                                                        }}>
                                                            ★
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {currentFeatures.length > (isMobile ? 5 : 6) && (
                                        <div className="more-specs text-center mt-2">
                                            <span className="more-indicator px-3 py-1 rounded-pill d-inline-block" style={{
                                                background: '#e2e8f0',
                                                color: '#6b7280',
                                                fontSize: '0.7rem',
                                                fontWeight: '600'
                                            }}>
                                                +{currentFeatures.length - (isMobile ? 5 : 6)} more features
                                            </span>
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
        <div className="modern-comparison-container" style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            minHeight: '100vh',
            padding: isMobile ? '1rem' : '2rem 0'
        }}>
            <Container fluid className={isMobile ? 'px-2' : 'px-4'}>
                {/* Modern Page Header */}
                <div className="page-header-modern mb-4">
                    <Card className="border-0 shadow-lg" style={{ 
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important',
                        color: 'white',
                        overflow: 'hidden'
                    }}>
                        <Card.Body className="p-4">
                            <Row className="align-items-center">
                                <Col xs={12} lg={8} className="mb-3 mb-lg-0">
                                    <div className="header-content">
                                        <h1 className="display-6 fw-bold mb-2" style={{ 
                                            fontSize: isMobile ? '1.8rem' : '2.5rem'
                                        }}>
                                            Product Comparison
                                        </h1>
                                        <p className="mb-0 opacity-90" style={{ 
                                            fontSize: isMobile ? '0.9rem' : '1.1rem',
                                            fontWeight: '500'
                                        }}>
                                            Analyzing {products.length} products across {currentFeatures.length} features with real-time insights
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <div className="header-actions d-flex gap-2 justify-content-center justify-content-lg-end">
                                        <Button 
                                            as={Link} 
                                            to="/" 
                                            className="action-btn d-flex align-items-center px-4 py-2 border-0 rounded-pill"
                                            style={{ 
                                                background: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                backdropFilter: 'blur(10px)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <ArrowLeft className="me-2" size={16} />
                                            Back to Products
                                        </Button>
                                        <Button 
                                            onClick={onClearAll}
                                            className="action-btn d-flex align-items-center px-4 py-2 border-0 rounded-pill"
                                            style={{ 
                                                background: 'rgba(248, 113, 113, 0.2)',
                                                color: 'white',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                backdropFilter: 'blur(10px)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <Trash3 className="me-2" size={16} />
                                            Clear All
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>

                {/* Modern Toolbar */}
                {renderModernToolbar()}

                {/* Comparison Content */}
                {viewMode === 'table' ? renderModernTableView() : renderModernCardView()}

                {/* Modern Footer Legend */}
                <Card className="border-0 shadow-lg mt-4" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                        <Row className="align-items-center">
                            <Col xs={12} lg={8} className="mb-3 mb-lg-0">
                                <h6 className="legend-title fw-bold mb-3 text-dark text-start">
                                    Legend & Guide
                                </h6>
                                <div className="legend-items d-flex gap-4 flex-wrap">
                                    <div className="legend-item d-flex align-items-center gap-2">
                                        <Award size={16} className="text-warning" />
                                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Best Value</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center gap-2">
                                        <div className="legend-dot rounded-circle" style={{ 
                                            width: '12px', 
                                            height: '12px',
                                            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                                        }}></div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Superior Performance</span>
                                    </div>
                                    <div className="legend-item d-flex align-items-center gap-2">
                                        <div className="legend-dot rounded-circle" style={{ 
                                            width: '12px', 
                                            height: '12px',
                                            background: '#f1f5f9',
                                            border: '1px solid #e2e8f0'
                                        }}></div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Standard</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} lg={4} className="text-center text-lg-end">
                                <div className="update-info">
                                    <small className="text-muted d-block mb-1" style={{ fontSize: '0.8rem' }}>
                                        Last updated: {new Date().toLocaleDateString()}
                                    </small>
                                    <div className="status-indicator d-flex align-items-center justify-content-center justify-content-lg-end gap-1">
                                        <div className="status-dot rounded-circle" style={{
                                            width: '8px',
                                            height: '8px',
                                            background: 'var(--primary-color)',
                                            animation: 'pulse 2s infinite'
                                        }}></div>
                                        <span className="fw-semibold" style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                                            Live Data
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

          
        </div>
    );
};

ComparisonView.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            category: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            specs: PropTypes.object.isRequired,
        })
    ).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClearAll: PropTypes.func.isRequired,
};

export default ComparisonView;