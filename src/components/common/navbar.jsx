import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../theme";
import { Navbar as RBNavbar, Nav, Container, Button } from "react-bootstrap";
import { SunFill, MoonFill } from "react-bootstrap-icons";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <RBNavbar 
            style={{ background: 'linear-gradient(135deg, #6366f1, #4338ca)' }}
            variant="dark" 
            expand="md" 
            sticky="top" 
            className="shadow-sm"
        >
            <Container>
                <RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold">
                    <span role="img" aria-label="compare" className="me-2">🔍</span>
                    Product Comparison
                </RBNavbar.Brand>
                <RBNavbar.Toggle aria-controls="main-navbar-nav" />
                <RBNavbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link 
                            as={Link} 
                            to="/" 
                            className={`nav-link-custom ${location.pathname === "/" ? "active" : ""}`}
                            style={{
                                color: location.pathname === "/" ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                                fontWeight: location.pathname === "/" ? '600' : '500',
                                borderBottom: location.pathname === "/" ? '2px solid #fff' : 'none',
                                paddingBottom: '0.5rem'
                            }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/compare" 
                            className={`nav-link-custom ${location.pathname === "/compare" ? "active" : ""}`}
                            style={{
                                color: location.pathname === "/compare" ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                                fontWeight: location.pathname === "/compare" ? '600' : '500',
                                borderBottom: location.pathname === "/compare" ? '2px solid #fff' : 'none',
                                paddingBottom: '0.5rem'
                            }}
                        >
                            Compare
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/about" 
                            className={`nav-link-custom ${location.pathname === "/about" ? "active" : ""}`}
                            style={{
                                color: location.pathname === "/about" ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                                fontWeight: location.pathname === "/about" ? '600' : '500',
                                borderBottom: location.pathname === "/about" ? '2px solid #fff' : 'none',
                                paddingBottom: '0.5rem'
                            }}
                        >
                            About
                        </Nav.Link>
                        <Button
                            className="ms-3 d-flex align-items-center theme-toggle-btn border-0"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.15)',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                justifyContent: 'center'
                            }}
                        >
                            {theme === "dark" ? <MoonFill /> : <SunFill />}
                        </Button>
                    </Nav>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
};

export default Navbar;