import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const TopNavbarContent = ({role}) => {
    // console.log('navContent')
    const adminNavContent =   
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="admin/dashboard"> Dashboard </Nav.Link>
            {/* <Nav.Link as={Link} to="#"> Movie List </Nav.Link> */}
            <NavDropdown title="Users" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="admin/user/view">View</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="admin/user/add">Add</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <NavDropdown title="Accounts" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="admin/signout">Sign out</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    const userNavContent =   
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="user/dashboard"> Dashboard </Nav.Link>
            <Nav.Link as={HashLink} smooth to="/user/dashboard/#movieList"> Movie List </Nav.Link>
            <Nav.Link as={Link} to="user/ratings"> My Ratings </Nav.Link>
            </Nav>
            <Nav>
            <NavDropdown title="Accounts" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="user/signout">Sign out</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>

    let navContent = null;
    if(role === 'admin')    
        navContent = adminNavContent;
    else if(role === 'user')
        navContent = userNavContent;
    return navContent;
}

export default TopNavbarContent