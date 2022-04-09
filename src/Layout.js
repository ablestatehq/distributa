import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {LinkContainer} from 'react-router-bootstrap'

const Layout = () => {
	return (
    <>
		<Navbar bg="dark" variant="dark">
			<Container>
        <LinkContainer to="/">
          <Navbar.Brand>Distributa</Navbar.Brand>
        </LinkContainer>
				<Nav className="me-auto">
          <LinkContainer to="/">
					  <Nav.Link>Share</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/invoice">
					<Nav.Link>Invoice</Nav.Link>
          </LinkContainer>
				</Nav>
			</Container>
		</Navbar>
    <Container>
      <Outlet/>
    </Container>
    </>
	);
};

export default Layout;
