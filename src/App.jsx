import React, { useState, useMemo, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
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


const HeroSection = ({ totalProducts, selectedCount, onGetStarted }) => {
  return (
    <div className="hero-section animate-fade-in hero-mt-5">
      <Container>
        <Row className="align-items-center min-vh-75">
          <Col lg={8} className="mx-auto text-center">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Badge className="badge-custom-primary mb-3 px-3 py-2 fs-6 rounded-pill">
                <i className="fas fa-star me-2"></i>
                Trusted by 10,000+ users
              </Badge>
            </div>
            
            <h1 className="display-3 fw-bold mb-4 text-gradient animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Compare Products
              <span className="text-custom-primary d-block">Like a Pro</span>
            </h1>
            
            <p className="lead mb-5 text-muted fs-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Make smarter purchasing decisions with our advanced comparison tool.
              Compare features, specs, and prices across multiple products instantly.
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                className="btn-custom-primary px-4 py-3 fw-semibold"
                onClick={onGetStarted}
              >
                <i className="fas fa-rocket me-2"></i>
                Start Comparing
              </Button>
              <Button
                className="btn-custom-outline-primary px-4 py-3"
                size="lg"
              >
                <i className="fas fa-play me-2"></i>
                Watch Demo
              </Button>
            </div>
            
            <div className="hero-stats animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <Row className="g-4">
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-mobile-alt text-custom-primary"></i>
                    </div>
                    <div className="stat-number">{totalProducts}</div>
                    <div className="stat-label">Products Available</div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-chart-line text-custom-success"></i>
                    </div>
                    <div className="stat-number">{selectedCount}/3</div>
                    <div className="stat-label">Selected Items</div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-users text-custom-info"></i>
                    </div>
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Happy Users</div>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-award text-custom-warning"></i>
                    </div>
                    <div className="stat-number">4.9</div>
                    <div className="stat-label">User Rating</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

//  About Page
const AboutPage = () => {
  return (
    <Container className="about-page py-5">
      <Row className="justify-content-center hero-mt-5">
        <Col lg={10}>
          <div className="animate-fade-in">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-custom-primary mb-3">About Product Comparison Hub</h1>
              <p className="lead text-muted">
                Empowering consumers to make informed decisions through intelligent product comparison
              </p>
            </div>
            
            <Row className="g-4 mb-5">
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="icon-box me-3">
                        <i className="fas fa-bullseye text-custom-primary"></i>
                      </div>
                      <h3 className="h4 fw-semibold mb-0">Our Mission</h3>
                    </div>
                    <p className="text-muted">
                      To simplify the decision-making process by providing comprehensive, 
                      accurate, and easy-to-understand product comparisons that help consumers 
                      choose the best products for their needs.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="icon-box me-3">
                        <i className="fas fa-eye text-custom-success"></i>
                      </div>
                      <h3 className="h4 fw-semibold mb-0">Our Vision</h3>
                    </div>
                    <p className="text-muted">
                      To become the world's most trusted platform for product comparisons, 
                      helping millions of users make confident purchasing decisions every day.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Card className="border-0 shadow-sm animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Card.Body className="p-5">
                <h3 className="h4 fw-semibold mb-4 text-center">Platform Features</h3>
                <Row className="g-4">
                  <Col md={6}>
                    <div className="feature-list">
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-custom-success me-3"></i>
                        <span>Compare up to 3 products simultaneously</span>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-custom-success me-3"></i>
                        <span>Advanced filtering and search capabilities</span>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-custom-success me-3"></i>
                        <span>Visual difference highlighting</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="feature-list">
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-custom-success me-3"></i>
                        <span>Persistent comparison lists</span>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-custom-success me-3"></i>
                        <span>Fully responsive design</span>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-custom-success me-3"></i>
                        <span>Light/Dark mode support</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Built with modern web technologies including React, Bootstrap, and cutting-edge UI frameworks
                    to deliver the best possible user experience across all devices.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function AppContent() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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

  const showNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSelect = useCallback(
    (product) => {
      if (selected.length >= 3) {
        showNotification("Maximum 3 products can be compared. Please remove a product first.");
        return;
      }
      if (!selected.some((p) => p.id === product.id)) {
        setSelected((prev) => [...prev, product]);
        showNotification(`${product.name} added to comparison`);
      }
    },
    [selected]
  );

  const handleRemove = useCallback(
    (id) => {
      const product = selected.find(p => p.id === id);
      setSelected((prev) => prev.filter((p) => p.id !== id));
      if (product) {
        showNotification(`${product.name} removed from comparison`);
      }
    },
    [selected]
  );

  const handleClearAll = useCallback(() => {
    setSelected([]);
    localStorage.removeItem("compareProducts");
    showNotification("All products cleared from comparison");
  }, []);

  const handleCompare = useCallback(
    () => {
      if (selected.length >= 2) {
        navigate("/compare");
      } else {
        showNotification("Please select at least 2 products to compare");
      }
    },
    [selected, navigate]
  );

  const handleGetStarted = () => {
    const element = document.querySelector('.products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      
 
      {showAlert && (
        <div className="alert-container animate-slide-down">
          <Alert variant="info" className="mb-0 shadow-sm">
            <i className="fas fa-info-circle me-2"></i>
            {alertMessage}
          </Alert>
        </div>
      )}

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <HeroSection
                  totalProducts={allProducts.length}
                  selectedCount={selected.length}
                  onGetStarted={handleGetStarted}
                />
                <section className="products-section py-5 animate-fade-in">
                  <Container>
                    <Row>
                      <Col lg={8} className="mx-auto text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Browse Products</h2>
                        <p className="lead text-muted">
                          Explore our comprehensive database of smartphones and laptops
                        </p>
                      </Col>
                    </Row>
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
                  </Container>
                </section>
              </div>
            }
          />
          <Route
            path="/compare"
            element={
              <div className="compare-page py-5">
                <Container>
                  <div className="animate-fade-in hero-mt-5">
                    <div className="text-center mb-5">
                      <h1 className="display-4 fw-bold text-custom-primary mb-3">Product Comparison</h1>
                      <p className="lead text-muted">
                        Detailed side-by-side comparison of {selected.length} products
                      </p>
                      {selected.length < 2 && (
                        <Alert variant="warning" className="mt-3">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          Please select at least 2 products to compare
                        </Alert>
                      )}
                    </div>
                    <ComparisonView
                      products={selected}
                      features={features}
                      onClearAll={handleClearAll}
                    />
                  </div>
                </Container>
              </div>
            }
          />
          <Route path="/about" element={<AboutPage />} />
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