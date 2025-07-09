import React from 'react';

const Footer = () => (
    <footer 
        className="footer text-light text-center py-3 mt-auto border-top"
        style={{ 
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            borderTopColor: '#475569 !important'
        }}
    >
        <span>&copy; {new Date().getFullYear()} Product Comparison App. All rights reserved.</span>
    </footer>
);

export default Footer;