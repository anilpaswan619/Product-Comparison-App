import React from 'react';
import { Button, Badge, Container, Row, Col } from "react-bootstrap";
import { XCircle, ArrowRightCircle, Eye } from "react-bootstrap-icons";

const CompareBar = ({ selectedItems = [], onRemove, onCompare }) => {
    if (selectedItems.length === 0) return null;

    return (
        <div className="compare-bar-wrapper">
            <Container fluid className="compare-bar-container">
                <Row className="align-items-center">
                    <Col xs={12} md="auto" className="compare-info mb-2 mb-md-0">
                        <div className="d-flex align-items-center">
                            <Eye className="me-2 text-primary" size={18} />
                            <span className="compare-label fw-semibold">
                                Selected ({selectedItems.length}):
                            </span>
                        </div>
                    </Col>
                    
                    <Col xs={12} md className="selected-items mb-2 mb-md-0">
                        <div className="d-flex flex-wrap gap-2">
                            {selectedItems.map(item => (
                                <Badge
                                    key={item.id}
                                    bg="light"
                                    text="dark"
                                    className="selected-item-badge d-flex align-items-center"
                                >
                                    <span className="item-name">{item.name}</span>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        className="remove-item-btn p-0 ms-2"
                                        onClick={() => onRemove(item.id)}
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        <XCircle size={14} className="text-danger" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    </Col>
                    
                    <Col xs={12} md="auto">
                        <Button
                            onClick={onCompare}
                            disabled={selectedItems.length < 2}
                            size="lg"
                            className="compare-action-btn w-100 w-md-auto"
                            variant="success"
                        >
                            <ArrowRightCircle className="me-2" />
                            Compare Now
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CompareBar;