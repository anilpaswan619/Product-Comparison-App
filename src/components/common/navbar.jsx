import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../theme";
import { Navbar as RBNavbar, Nav, Container, Button } from "react-bootstrap";
import { SunFill, MoonFill } from "react-bootstrap-icons";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <RBNavbar bg="primary" variant="dark" expand="md" sticky="top" className="shadow-sm">
            <Container>
                <RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <span role="img" aria-label="compare" className="me-2">🔍</span>
                    Product Comparison
                </RBNavbar.Brand>
                <RBNavbar.Toggle aria-controls="main-navbar-nav" />
                <RBNavbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" active={location.pathname === "/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/compare" active={location.pathname === "/compare"}>Compare</Nav.Link>
                        <Nav.Link as={Link} to="/about" active={location.pathname === "/about"}>About</Nav.Link>
                        <Button
                            variant="outline-light"
                            className="ms-3 d-flex align-items-center theme-toggle-btn"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
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