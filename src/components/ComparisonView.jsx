import React from "react";
import PropTypes from "prop-types";
import { Table, Card, Badge, Alert } from "react-bootstrap";

const ComparisonView = ({ products, features }) => {
    if (!products || products.length === 0) {
        return (
            <Alert variant="info" className="text-center py-5">
                <h4>No Products Selected</h4>
                <p className="mb-0">Please select at least 2 products from the home page to compare.</p>
            </Alert>
        );
    }

    if (products.length < 2) {
        return (
            <Alert variant="warning" className="text-center py-5">
                <h4>Need More Products</h4>
                <p className="mb-0">Please select at least 2 products to compare. Currently selected: {products.length}</p>
            </Alert>
        );
    }

    return (
        <Card className="comparison-card border-0 shadow-lg">
            <Card.Header className="bg-primary text-white text-center py-3">
                <h4 className="mb-0">Product Comparison</h4>
                <small>Comparing {products.length} products</small>
            </Card.Header>
            
            <div className="comparison-view p-0">
                <Table responsive bordered hover className="comparison-table mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th className="comparison-th feature-column">
                                <div className="d-flex align-items-center">
                                    <span>Features</span>
                                </div>
                            </th>
                            {products.map((product) => (
                                <th key={product.id || product.name} className="comparison-th product-column text-center">
                                    <div className="product-header-info">
                                        <div className="fw-bold">{product.name}</div>
                                        <Badge bg="secondary" className="mt-1">{product.brand}</Badge>
                                        <div className="text-warning mt-1 fw-bold">${product.price}</div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, index) => (
                            <tr key={feature} className={index % 2 === 0 ? 'table-light' : ''}>
                                <td className="comparison-td feature-cell">
                                    <span className="fw-semibold text-capitalize">{feature}</span>
                                </td>
                                {products.map((product) => (
                                    <td key={product.id || product.name + feature} className="comparison-td value-cell text-center">
                                        <span className="spec-value">
                                            {product.specs && product.specs[feature]
                                                ? product.specs[feature]
                                                : <span className="text-muted">-</span>}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Card>
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
};

export default ComparisonView;