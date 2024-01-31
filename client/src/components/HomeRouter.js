import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const HomeRouter = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="/">Cricket Manager</Navbar.Brand>
					<Nav className="ml-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/team">Teams</Nav.Link>
						<Nav.Link href="/player">Players</Nav.Link>
						<Nav.Link href="/match">Matches</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Container>
				{/* <h2>Featured Content</h2> */}
				{/* Add your featured content components here */}
			</Container>
		</div>
	);
};

export default HomeRouter;
