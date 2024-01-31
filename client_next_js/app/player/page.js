"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
	Button,
	Form,
	Table,
	Modal,
	Alert,
	Card,
	Row,
	Col,
} from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const api_point = "http://localhost:5000";

function PlayersRouter() {
	const [name, setName] = useState("");
	const [teamId, setTeamId] = useState(0);
	const [nameAllPlayer, setNameAllPlayer] = useState([]);
	const [player, setPlayer] = useState({});
	const [teamNames, setTeamNames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [batsman, setBatsman] = useState(false);
	const [bowler, setBowler] = useState(false);
	const [wicketkeeper, setWicketkeeper] = useState(false);
	const [image, setImage] = useState(null);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [showAddOrEditButton, setShowAddOrEditButton] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		axios
			.get(api_point + "/team")
			.then((res) => {
				const { data } = res;
				console.log(data.teams);
				setTeamNames(data.teams);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:5000/player")
			.then((res) => {
				const { data } = res;
				setNameAllPlayer(data.players);
				console.log(data);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	}, [loading]);

	const addPlayer = async () => {
		if (teamId === 0) {
			console.log("Team is not found!");
			return false;
		}
		await axios
			.post("http://localhost:5000/Player", {
				name,
				TeamId: teamId,
				isBatsman: batsman,
				isBowler: bowler,
				isWicketkeeper: wicketkeeper,
				picture: image,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const editPlayer = async () => {
		await axios
			.put(api_point + "/player/" + player.id, {
				name,
				TeamId: teamId,
				isBatsman: batsman,
				isBowler: bowler,
				isWicketkeeper: wicketkeeper,
				picture: image,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const deletePlayer = async () => {
		await axios
			.delete(api_point + "/player/" + player.id)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setShowAlert(false);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	if (loading) return <p>Page is loading. Please Wait.....</p>;
	else
		return (
			<div>
				<h1>Player Page</h1>
				<hr />
				<Button
					onClick={() => {
						setShowAddOrEditButton(true);
						handleShow();
					}}
					className="mb-3"
				>
					Add new player
				</Button>

				{showAlert ? (
					<Alert variant="danger" className="m-3">
						{player.name} will be deleted!
						<Button
							onClick={() => deletePlayer()}
							className="mr-3"
							variant="danger"
						>
							Delete
						</Button>
						<Button
							onClick={() => setShowAlert(false)}
							className="ml-3"
							variant="secondary"
						>
							Cancel
						</Button>
					</Alert>
				) : null}

				<Row xs={2} sm={3} md={4} lg={6} className="g-4">
					{nameAllPlayer.map((player, idx) => (
						<Col key={idx}>
							<Card bg="success">
								<Card.Header>
									<Row>
										<Col xs={8}>{player.name}</Col>
										<Col
											xs={2}
											className="text-right"
											onClick={() => {
												console.log(player);
												setPlayer(player);
												setShowAddOrEditButton(false);
												handleShow();
											}}
										>
											<FaRegEdit />
										</Col>
										<Col
											xs={2}
											className="text-right"
											onClick={() => {
												setPlayer(player);
												console.log(player);
												setShowAlert(true);
											}}
										>
											<MdDelete />
										</Col>
									</Row>
								</Card.Header>
								<Card.Img
									variant="top"
									src={api_point + `/uploaded-assets/${player.image}`}
									alt={`${player.name}`}
									width={"200px"}
									height={"200px"}
								/>
								<Card.Body>
									<Col>
										Batsman: {player.isBatsman ? <FaCheck /> : <RxCross2 />}
									</Col>
									<Col>
										Bowler: {player.isBowler ? <FaCheck /> : <RxCross2 />}
									</Col>
									<Col>
										Wicketkeeper:{" "}
										{player.isWicketkeeper ? <FaCheck /> : <RxCross2 />}
									</Col>
									<Card.Text>
										This is a longer card with supporting text below as a
										natural lead-in to additional content. This content is a
										little bit longer.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Image</th>
							<th>Team Name</th>
							<th>isBatsman</th>
							<th>isBowler</th>
							<th>isWicketkeeper</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{nameAllPlayer.map((player) => (
							<tr key={player.id}>
								<td>{player.id}</td>
								<td>
									<Link href={`/player/${player.id}`}>{player.name}</Link>
								</td>
								<td>
									<img
										src={api_point + `/uploaded-assets/${player.image}`}
										alt={`${player.name}`}
										width={"40px"}
										height={"30px"}
									/>
								</td>

								<td>
									<Link href={`/team/${player.TeamId}`}>
										{player.Team ? player.Team.name : null}
									</Link>
								</td>
								<td>{player.isBatsman ? <FaCheck /> : <RxCross2 />}</td>
								<td>{player.isBowler ? <FaCheck /> : <RxCross2 />}</td>
								<td>{player.isWicketkeeper ? <FaCheck /> : <RxCross2 />}</td>
								<td
									onClick={() => {
										console.log(player);
										setPlayer(player);
										setShowAddOrEditButton(false);
										// setName(player.name);
										// setTeamId(player.teamId);
										// setBatsman(player.batsman);
										// setBowler(player.bowler);
										// setWicketkeeper(player.wicketkeeper);
										handleShow();
									}}
								>
									<FaRegEdit />
								</td>
								<td
									onClick={() => {
										setPlayer(player);
										console.log(player);
										setShowAlert(true);
									}}
								>
									<MdDelete />
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Team</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicPlayerName">
								<Form.Label>Player Name:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Player name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPlayerTeamId">
								<Form.Label>Player TeamId:</Form.Label>
								<Form.Control
									as="select"
									value={teamId}
									onChange={(event) => setTeamId(event.target.value)}
								>
									<option value={0}>Select Team</option>
									{teamNames.map((team) => (
										<option key={team.id} value={team.id}>
											{team.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicBatsman">
								<Form.Check
									type="checkbox"
									checked={batsman}
									onChange={() => {
										setBatsman(!batsman);
									}}
									label="Batsman"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicBowler">
								<Form.Check
									type="checkbox"
									checked={bowler}
									onChange={() => {
										setBowler(!bowler);
									}}
									label="Bowler"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicWicketkeeper">
								<Form.Check
									type="checkbox"
									checked={wicketkeeper}
									onChange={() => {
										setWicketkeeper(!wicketkeeper);
									}}
									label="Wicketkeeper"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicAddImage">
								<Form.Label>Add Image</Form.Label>
								<Form.Control
									type="file"
									accept="image/*"
									onChange={handleImageChange}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						{showAddOrEditButton ? (
							<Button
								variant="primary"
								type="submit"
								onClick={() => {
									addPlayer();
									handleClose();
									setLoading(true);
									setShowAddOrEditButton(false);
								}}
							>
								Add Player
							</Button>
						) : (
							<Button
								variant="primary"
								type="submit"
								onClick={() => {
									console.log(player);
									editPlayer();
									handleClose();
									setLoading(true);
									setShowAddOrEditButton(false);
								}}
							>
								Save Player
							</Button>
						)}
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
}

export default PlayersRouter;
