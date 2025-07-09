import React from "react";
import PropTypes from "prop-types";
import { Table, Card, Badge, Alert, Button, Row, Col } from "react-bootstrap";
import { Trash3, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const getValueType = (value, feature, allValues) => {
    if (feature.toLowerCase().includes('price') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('ram')) {
        const numValue = parseFloat(value);
        const allNums = allValues.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (allNums.length > 1) {
            const max = Math.max(...allNums);
            const min = Math.min(...allNums);
            if (numValue === max) return 'best';
            if (numValue === min) return feature.toLowerCase().includes('price') ? 'best' : 'worst';
        }
    }
    return 'neutral';
};

const ComparisonView = ({ products, features, onClearAll }) => {
    if (!products || products.length === 0) {
        return (
            <Alert variant="info" className="text-center py-5">
                <h4>No Products Selected</h4>
                <p className="mb-3">Please select at least 2 products from the home page to compare.</p>
                <Button as={Link} to="/" variant="primary">
                    <ArrowLeft className="me-2" />
                    Browse Products
                </Button>
            </Alert>
        );
    }

    if (products.length < 2) {
        return (
            <Alert variant="warning" className="text-center py-5">
                <h4>Need More Products</h4>
                <p className="mb-3">Please select at least 2 products to compare. Currently selected: {products.length}</p>
                <Button as={Link} to="/" variant="primary">
                    <ArrowLeft className="me-2" />
                    Add More Products
                </Button>
            </Alert>
        );
    }

    return (
        <div className="comparison-container">
            {/* Comparison Header */}
            <Row className="mb-4">
                <Col>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div>
                            <h2 className="h3 mb-1">Comparing {products.length} Products</h2>
                            <p className="text-muted mb-0">Side-by-side feature comparison</p>
                        </div>
                        <div className="d-flex gap-2">
                            <Button 
                                as={Link} 
                                to="/" 
                                variant="outline-primary"
                                className="d-flex align-items-center"
                            >
                                <ArrowLeft className="me-2" />
                                Back to Products
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                onClick={onClearAll}
                                className="d-flex align-items-center"
                            >
                                <Trash3 className="me-2" />
                                Clear All
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Card className="comparison-card border-0 shadow-lg">
                <Card.Header className="bg-gradient text-white text-center py-3">
                    <h4 className="mb-0">Product Comparison Table</h4>
                    <small>Hover over cells to see detailed information</small>
                </Card.Header>
                
                <div className="comparison-view p-0">
                    <div className="table-responsive">
                        <Table bordered hover className="comparison-table mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th className="comparison-th feature-column sticky-column">
                                        <div className="d-flex align-items-center">
                                            <span>Features</span>
                                        </div>
                                    </th>
                                    {products.map((product) => (
                                        <th key={product.id || product.name} className="comparison-th product-column text-center">
                                            <div className="product-header-info">
                                                <div className="product-image-small mb-2">
                                                    <img src={product.image} alt={product.name} className="rounded" />
                                                </div>
                                                <div className="fw-bold product-name">{product.name}</div>
                                                <Badge bg="secondary" className="mt-1">{product.brand}</Badge>
                                                <div className="text-warning mt-1 fw-bold price">${product.price}</div>
                                                <Badge bg={product.category === 'Mobile' ? 'primary' : 'success'} className="mt-1">
                                                    {product.category}
                                                </Badge>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, index) => {
                                    const allValues = products.map(p => p.specs[feature]).filter(Boolean);
                                    
                                    return (
                                        <tr key={feature} className={index % 2 === 0 ? 'table-light' : ''}>
                                            <td className="comparison-td feature-cell sticky-column">
                                                <span className="fw-semibold text-capitalize feature-name">{feature}</span>
                                            </td>
                                            {products.map((product) => {
                                                const value = product.specs && product.specs[feature];
                                                const valueType = value ? getValueType(value, feature, allValues) : 'neutral';
                                                
                                                return (
                                                    <td 
                                                        key={product.id || product.name + feature} 
                                                        className={`comparison-td value-cell text-center ${valueType}`}
                                                        title={value ? `${feature}: ${value}` : 'Not specified'}
                                                    >
                                                        <span className="spec-value">
                                                            {value || <span className="text-muted">-</span>}
                                                        </span>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Card>

            {/* Comparison Legend */}
            <Card className="mt-4 border-0 bg-light">
                <Card.Body className="py-3">
                    <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                            <div className="legend-box best"></div>
                            <small>Best Value</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <div className="legend-box worst"></div>
                            <small>Lower Value</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <div className="legend-box neutral"></div>
                            <small>Standard</small>
                        </div>
                    </div>
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