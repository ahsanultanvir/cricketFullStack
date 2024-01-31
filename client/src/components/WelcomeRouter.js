import { Card } from "react-bootstrap";

function WelcomeRouter() {
	return (
		<div>
			<Card className="text-center">
				<Card.Body>
					<Card.Title>Welcome to Cricket Manager</Card.Title>
					<Card.Text>
						Manage your cricket teams and players with ease!
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
}

export default WelcomeRouter;
