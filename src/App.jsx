import React, { useState, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import ProductList from "./components/ProductList";
import ComparisonView from "./components/ComparisonView";
import CompareBar from "./components/CompareBar";
import { products as allProducts } from "./data/products";
import { ThemeProvider } from "./components/theme";
import "./App.scss";
import { Container, Row, Col, Card } from "react-bootstrap";

// Utility to get all unique features from selected products
const getAllFeatures = (products) => {
  const featureSet = new Set();
  products.forEach((p) => {
    Object.keys(p.specs).forEach((f) => featureSet.add(f));
  });
  return Array.from(featureSet);
};

function AppContent() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (product) => {
      if (!selected.some((p) => p.id === product.id)) {
        setSelected((prev) => [...prev, product]);
      }
    },
    [selected]
  );

  const handleRemove = useCallback(
    (id) => setSelected((prev) => prev.filter((p) => p.id !== id)),
    []
  );

  const handleCompare = useCallback(
    () => {
      if (selected.length >= 2) navigate("/compare");
    },
    [selected, navigate]
  );

  const filteredProducts = useMemo(
    () =>
      allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const features = useMemo(() => getAllFeatures(selected), [selected]);

  return (
    <div className="App app-root">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <div className="hero-section text-center mb-5">
                  <h1 className="display-4 fw-bold text-primary mb-3">Product Comparison Hub</h1>
                  <p className="lead text-muted">Compare the latest smartphones and laptops side by side</p>
                </div>
                <ProductList
                  products={filteredProducts}
                  onCompare={handleSelect}
                  selected={selected}
                  onSearch={setSearch}
                />
              </div>
            }
          />
          <Route
            path="/compare"
            element={
              <Container className="compare-page">
                <div className="text-center mb-4">
                  <h1 className="display-5 fw-bold text-primary">Compare Products</h1>
                  <p className="text-muted">Detailed side-by-side comparison</p>
                </div>
                <ComparisonView
                  products={selected}
                  features={features}
                />
              </Container>
            }
          />
          <Route
            path="/about"
            element={
              <Container className="about-page">
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <Card className="border-0 shadow-lg">
                      <Card.Body className="p-5">
                        <h1 className="display-5 fw-bold text-primary mb-4">About Our Platform</h1>
                        <p className="lead mb-4">
                          Product Comparison Hub helps you make informed decisions by comparing features and specifications of the latest smartphones and laptops.
                        </p>
                        <p>
                          Our platform provides detailed side-by-side comparisons, making it easy to spot differences and choose the perfect device for your needs.
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            }
          />
        </Routes>
      </main>
      <CompareBar
        selectedItems={selected}
        onRemove={handleRemove}
        onCompare={handleCompare}
      />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
