import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <Row>
          <Col>
            <Link to="/privacy-policy" className="text-white">Privacy Policy</Link>
          </Col>
          <Col>
            <Link to="/terms-of-use" className="text-white">Terms of Use</Link>
          </Col>
          <Col>
            <Link to="/fair-reporting-policy" className="text-white">Fair Reporting Policy</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;