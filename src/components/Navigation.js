import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signInWithDiscord, signOut } from '../supabaseClient';

const Navigation = ({ user }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Albion ratDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {/* Add more links here */}
        </Nav>
        {user ? (
          <Button onClick={signOut} variant="outline-light">Logout</Button>
        ) : (
          <Button onClick={signInWithDiscord} variant="outline-light">Login with Discord</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;