import React from 'react';
import { Button, Badge, Container, Row, Col, ProgressBar } from "react-bootstrap";
import { XCircle, ArrowRightCircle, Eye, Trash3 } from "react-bootstrap-icons";

const CompareBar = ({ selectedItems = [], onRemove, onCompare, onClearAll, maxItems = 3 }) => {
    if (selectedItems.length === 0) return null;

    const progress = (selectedItems.length / maxItems) * 100;
    const canCompare = selectedItems.length >= 2;

    return (
        <div className="compare-bar-wrapper">
            <Container fluid className="compare-bar-container">
                {/* Progress Bar */}
                <div className="compare-progress mb-2">
                    <ProgressBar 
                        now={progress} 
                        variant={progress === 100 ? "warning" : "info"}
                        className="mb-1"
                        style={{ height: '4px' }}
                    />
                    <small className="text-light opacity-75">
                        {selectedItems.length} of {maxItems} products selected
                    </small>
                </div>

                <Row className="align-items-center">
                    <Col xs={12} md="auto" className="compare-info mb-2 mb-md-0">
                        <div className="d-flex align-items-center">
                            <Eye className="me-2 text-primary" size={18} />
                            <span className="compare-label fw-semibold">
                                Selected ({selectedItems.length}/{maxItems}):
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
                                        aria-label={`Remove ${item.name} from comparison`}
                                    >
                                        <XCircle size={14} className="text-danger" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    </Col>
                    
                    <Col xs={12} md="auto">
                        <div className="d-flex gap-2">
                            <Button
                                onClick={onClearAll}
                                variant="outline-light"
                                size="sm"
                                className="d-flex align-items-center"
                            >
                                <Trash3 className="me-1" size={14} />
                                Clear
                            </Button>
                            <Button
                                onClick={onCompare}
                                disabled={!canCompare}
                                size="lg"
                                className="compare-action-btn d-flex align-items-center"
                                variant="success"
                            >
                                <ArrowRightCircle className="me-2" />
                                Compare Now
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CompareBar;