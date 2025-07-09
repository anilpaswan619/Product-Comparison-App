import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../theme";
import { Navbar as RBNavbar, Nav, Container, Button } from "react-bootstrap";
import { SunFill, MoonFill, List, X, Stack } from "react-bootstrap-icons";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-toggle')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/compare', label: 'Compare' },
        { path: '/about', label: 'About' }
    ];

    const isActive = (path) => location.pathname === path;

    const handleMobileNavClick = (path) => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <RBNavbar 
                expand="lg" 
                fixed="top"
                className="custom-navbar"
            >
                <Container fluid className="px-4">
                    <RBNavbar.Brand 
                        as={Link} 
                        to="/" 
                        className="brand-logo"
                    >
                        <div className="brand-icon">
                            <Stack />
                        </div>
                        <span className="brand-text">CompareHub</span>
                    </RBNavbar.Brand>

                    {/* Custom Mobile Toggle */}
                    <Button
                        className="mobile-toggle d-lg-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
                    </Button>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav d-none d-lg-flex align-items-center ms-auto">
                        <Nav className="me-4">
                            {navItems.map((item) => (
                                <Nav.Link
                                    key={item.path}
                                    as={Link}
                                    to={item.path}
                                    className={`nav-item-custom mx-2 ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>

                        {/* Theme Toggle */}
                        <Button
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <MoonFill /> : <SunFill />}
                        </Button>
                    </div>
                </Container>
            </RBNavbar>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay d-lg-none ${isMobileMenuOpen ? 'show' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div className={`mobile-menu d-lg-none ${isMobileMenuOpen ? 'show' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-menu-header d-flex justify-content-between align-items-center mb-4 p-4 border-bottom">
                        <h5 className="text-white mb-0 fw-bold">Menu</h5>
                        <Button
                            className="mobile-close-btn btn-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    <div className="mobile-menu-body p-4">
                        <Nav className="flex-column gap-3">
                            {navItems.map((item) => (
                                <Nav.Link
                                    key={item.path}
                                    as={Link}
                                    to={item.path}
                                    className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                                    onClick={() => handleMobileNavClick(item.path)}
                                >
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>

                        <div className="mobile-theme-toggle mt-4 pt-4 border-top">
                            <Button
                                className="mobile-theme-btn w-100 d-flex align-items-center justify-content-center gap-2"
                                onClick={() => {
                                    toggleTheme();
                                    setIsMobileMenuOpen(false);
                                }}
                                variant="outline-light"
                            >
                                {theme === "dark" ? <MoonFill size={18} /> : <SunFill size={18} />}
                                <span>{theme === "dark" ? 'Dark Mode' : 'Light Mode'}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;