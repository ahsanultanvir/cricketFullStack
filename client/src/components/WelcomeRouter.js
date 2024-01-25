import { Card, Button } from "react-bootstrap";

function WelcomeRouter() {
	return (
		<div>
			<Card className="text-center">
				<Card.Body>
					<Card.Title>Welcome to Cricket Manager</Card.Title>
					<Card.Text>
						Manage your cricket teams and players with ease!
					</Card.Text>
					{/* <Button variant="primary" href="/get-started">
						Get Started
					</Button> */}
				</Card.Body>
			</Card>
			{/* <h1>Hi from Cricket</h1> */}
		</div>
	);
}

export default WelcomeRouter;
