// import { NavLink } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import NavDropdown from "react-bootstrap/NavDropdown";

// function HomeRouter() {
// 	return (
// 		<div>
// 			{/* <ul>
// 				<li>
// 					<NavLink to="/">Home Page</NavLink>
// 				</li>
// 				<li>
// 					<NavLink to="/team">Team Page</NavLink>
// 				</li>
// 				<li>
// 					<NavLink to="/player">Player Page</NavLink>
// 				</li>
// 			</ul> */}
// 			<Navbar expand="lg" className="bg-success" data-bs-theme="dark">
// 				<Container>
// 					<Navbar.Brand href="/welcome">Cricket Manager</Navbar.Brand>
// 					<Navbar.Toggle aria-controls="basic-navbar-nav" />
// 					<Navbar.Collapse id="basic-navbar-nav">
// 						<Nav className="me-auto">
// 							<Nav.Link as={NavLink} to="/" >
// 								Home Page
// 							</Nav.Link>
// 							<Nav.Link as={NavLink} to="/team" >
// 								Team Page
// 							</Nav.Link>
// 							<Nav.Link as={NavLink} to="/player" >
// 								Player Page
// 							</Nav.Link>
// 						</Nav>
// 					</Navbar.Collapse>
// 				</Container>
// 			</Navbar>
// 		</div>
// 	);
// }

// export default HomeRouter;



import React from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';

const HomeRouter = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Cricket Manager</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/team">Teams</Nav.Link>
            <Nav.Link href="/player">Players</Nav.Link>
            {/* Add more navigation links as needed */}
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      {/* <Card className="text-center">
        <Card.Body>
          <Card.Title>Welcome to Cricket Manager</Card.Title>
          <Card.Text>
            Manage your cricket teams and players with ease!
          </Card.Text>
          <Button variant="primary" href="/get-started">
            Get Started
          </Button>
        </Card.Body>
      </Card> */}

      {/* Featured Content Section */}
      <Container>
        <h2>Featured Content</h2>
        {/* Add your featured content components here */}
      </Container>

      {/* Footer */}
      {/* <footer className="text-center mt-4">
        <p>&copy; 2024 Cricket Manager. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomeRouter;

