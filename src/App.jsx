import React, { useState, useMemo, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";
import ProductList from "./components/ProductList";
import ComparisonView from "./components/ComparisonView";
import CompareBar from "./components/CompareBar";
import { products as allProducts } from "./data/products";
import { ThemeProvider } from "./components/theme";
import "./App.scss";

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
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  // Load from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("compareProducts");
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setSelected(parsedProducts);
      } catch (error) {
        console.error("Error loading saved products:", error);
      }
    }
  }, []);

  // Save to localStorage whenever selected products change
  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(selected));
  }, [selected]);

  const handleSelect = useCallback(
    (product) => {
      if (selected.length >= 3) {
        alert("You can compare up to 3 products only. Please remove a product first.");
        return;
      }
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

  const handleClearAll = useCallback(() => {
    setSelected([]);
    localStorage.removeItem("compareProducts");
  }, []);

  const handleCompare = useCallback(
    () => {
      if (selected.length >= 2) navigate("/compare");
    },
    [selected, navigate]
  );

  const filteredProducts = useMemo(
    () =>
      allProducts.filter(
        (p) => {
          const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
          const matchesCategory = category === "All" || p.category === category;
          return matchesSearch && matchesCategory;
        }
      ),
    [search, category]
  );

  const features = useMemo(() => getAllFeatures(selected), [selected]);
  const categories = useMemo(() => ["All", ...new Set(allProducts.map(p => p.category))], []);

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
                  <p className="lead text-muted mb-4">Compare the latest smartphones and laptops side by side</p>
                  <div className="hero-stats d-flex justify-content-center gap-4 flex-wrap">
                    <div className="stat-item">
                      <span className="stat-number h3 text-primary fw-bold">{allProducts.length}</span>
                      <span className="stat-label d-block text-muted">Products Available</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number h3 text-success fw-bold">{selected.length}/3</span>
                      <span className="stat-label d-block text-muted">Selected for Compare</span>
                    </div>
                  </div>
                </div>
                <ProductList
                  products={filteredProducts}
                  onCompare={handleSelect}
                  selected={selected}
                  onSearch={setSearch}
                  categories={categories}
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  onClearAll={handleClearAll}
                />
              </div>
            }
          />
          <Route
            path="/compare"
            element={
              <Container className="compare-page">
                <div className="text-center mb-4">
                  <h1 className="display-5 fw-bold text-primary">Product Comparison</h1>
                  <p className="text-muted">Detailed side-by-side comparison of {selected.length} products</p>
                </div>
                <ComparisonView
                  products={selected}
                  features={features}
                  onClearAll={handleClearAll}
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
                        <h1 className="display-5 fw-bold text-primary mb-4">About Product Comparison Hub</h1>
                        <p className="lead mb-4">
                          Our platform helps you make informed decisions by comparing features and specifications of the latest smartphones and laptops.
                        </p>
                        <h3 className="h4 fw-semibold mb-3">Key Features:</h3>
                        <ul className="list-unstyled">
                          <li className="mb-2">✓ Compare up to 3 products simultaneously</li>
                          <li className="mb-2">✓ Filter by category and search functionality</li>
                          <li className="mb-2">✓ Visual difference highlighting</li>
                          <li className="mb-2">✓ Persistent comparison list with localStorage</li>
                          <li className="mb-2">✓ Responsive design for all devices</li>
                          <li className="mb-2">✓ Light/Dark mode support</li>
                        </ul>
                        <p className="mt-4">
                          Built with React, Bootstrap, and modern web technologies to provide the best user experience.
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
        onClearAll={handleClearAll}
        maxItems={3}
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
