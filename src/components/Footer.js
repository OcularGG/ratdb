import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <p>&copy; {new Date().getFullYear()} ratDB. All rights reserved.</p>
        <button id="theme-toggle" className="btn btn-secondary">Toggle Theme</button>
      </Container>
    </footer>
  );
};

export default Footer;