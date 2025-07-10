import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="footer-navbar text-light mt-auto"
            style={{
                background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
                borderTop: '1px solid #334155'
            }}
        >
            <div className="container-fluid px-4 px-lg-5 py-4">
                <div className="d-flex py-5 flex-column flex-lg-row align-items-center justify-content-between gap-4">
                
                    <div className="d-flex align-items-center gap-2 mb-2 mb-lg-0">
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '0.03em'
                            }}
                        >
                            CompareHub
                        </span>
                        <span className="d-none d-md-inline  small ms-2" style={{ fontWeight: 400 }}>
                            | Smart Product Comparisons
                        </span>
                    </div>

             
                    <nav className="footer-nav mb-2 mb-lg-0">
                        <ul className="d-flex flex-wrap gap-3 list-unstyled mb-0">
                            {['Home', 'Compare', 'About'].map((link) => {
                  
                                const linkUrls = {
                                    'Home': '/',
                                    'Compare': '/compare',
                                    'About': '/about'
                                };
                                return (
                                    <li key={link}>
                                        <a
                                            href={linkUrls[link]}
                                            className="text-decoration-none small px-2 py-1"
                                            style={{
                                                color: '#cbd5e1',
                                                borderRadius: '4px',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            onMouseEnter={e => {
                                                e.target.style.background = '#334155';
                                                e.target.style.color = '#fff';
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.color = '#cbd5e1';
                                            }}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

            
                    <div className="d-flex align-items-center gap-2 mb-2 mb-lg-0">
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: '#475569',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                color: '#fff',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = '#3b82f6';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = '#475569';
                                e.target.style.transform = 'scale(1)';
                            }}
                            aria-label="Twitter"
                        >
                            <Twitter size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/anil-paswan-91466578/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: '#475569',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                color: '#fff',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = '#0077b5';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = '#475569';
                                e.target.style.transform = 'scale(1)';
                            }}
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                        <a
                            href="https://github.com/anilpaswan619"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: '#475569',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                color: '#fff',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = '#7c3aed';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = '#475569';
                                e.target.style.transform = 'scale(1)';
                            }}
                            aria-label="GitHub"
                        >
                            <Github size={16} />
                        </a>
                    </div>

   
                    <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                        <div className="d-flex align-items-center gap-2">
                            <Mail size={16} style={{ color: '#60a5fa' }} />
                            <a
                                href="mailto:hello@comparehub.com"
                                className="text-light text-decoration-none small"
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={e => e.target.style.color = '#60a5fa'}
                                onMouseLeave={e => e.target.style.color = '#fff'}
                            >
                                info@comparehub.com
                            </a>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <Phone size={16} style={{ color: '#10b981' }} />
                            <a
                                href="tel:+1234567890"
                                className="text-light text-decoration-none small"
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={e => e.target.style.color = '#10b981'}
                                onMouseLeave={e => e.target.style.color = '#fff'}
                            >
                                +91 12345 67890
                            </a>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <MapPin size={16} style={{ color: '#a855f7' }} />
                            <span className="text-light small">
                                India
                            </span>
                        </div>
                    </div>
                </div>
      
                <div className="mt-4" style={{ borderTop: '1px solid #334155' }}></div>
       
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-3 pb-1">
                    <span className="small ">
                        &copy; {currentYear} CompareHub. All rights reserved.
                    </span>
                    <span className="small d-flex align-items-center gap-1">
                        Made with <Heart size={14} style={{ color: '#ef4444' }} /> by Anil Paswan
                    </span>
                </div>
            </div>
            <style jsx>{`
                .footer-navbar a {
                    text-decoration: none;
                }
            `}</style>
        </footer>
    );
};

export default Footer;