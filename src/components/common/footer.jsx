import React from 'react';

const Footer = () => (
    <footer className="footer bg-dark text-light text-center py-3 mt-auto border-top">
        <span>&copy; {new Date().getFullYear()} Product Comparison App. All rights reserved.</span>
    </footer>
);

export default Footer;