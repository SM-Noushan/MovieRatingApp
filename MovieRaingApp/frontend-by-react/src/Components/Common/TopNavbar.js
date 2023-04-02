import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ProtectedNav from './ProtectedNav';
import TopNavbarContent from './TopNavbarContent';

const TopNavbar = ({isLoggedIn, role}) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">MovieRT</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <ProtectedNav isLoggedIn={isLoggedIn} > <TopNavbarContent role={role} /> </ProtectedNav>
    </Container>
    </Navbar>
  )
}

export default TopNavbar