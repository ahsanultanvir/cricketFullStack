import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import { parseISO, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const api_point = "http://localhost:5000";

function MatchesRouter() {
	const [matches, setMatches] = useState([]);
	const [match, setMatch] = useState({});
	const [team_1, setTeam_1] = useState(0);
	const [team_2, setTeam_2] = useState(0);
	const [vanue, setVanue] = useState("");
	const [nameAllTeam, setNameAllTeam] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [showAddOrEditButton, setShowAddOrEditButton] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(api_point + "/team")
			.then((res) => {
				const { data } = res;
				setNameAllTeam(data.teams);
				console.log(data);
			})
			.catch((err) => console.log(err));

		axios
			.get(api_point + "/match")
			.then((res) => {
				const { data } = res;
				setMatches(data.matches);
				console.log(data);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	}, [loading]);

	useEffect(() => {
		console.log(team_1, team_2);
	}, [team_1, team_2]);

	const addMatch = async () => {
		if (team_1 === 0 || team_2 === 0) {
			// show error message
			console.log("Team is not find");
			return false;
		}
		if (team_1 === team_2) {
			console.log("same team is prohibited");
			return false;
		}
		await axios
			.post(api_point + "/match", {
				team_1,
				team_2,
				date: startDate,
				vanue,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const editMatch = async () => {
		await axios
			.put(api_point + "/match/" + match.id, {
				team_1,
				team_2,
				date: startDate,
				vanue,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const deleteMatch = async () => {
		await axios
			.delete(api_point + "/match/" + match.id)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setShowAlert(false);
	};

	if (loading) return <p>Loading.....</p>;
	else
		return (
			<div>
				<h1>Welcome to Match list</h1>

				<Button
					onClick={() => {
						setShowAddOrEditButton(true);
						handleShow();
					}}
					className="mb-3"
				>
					Add new match
				</Button>

				{showAlert ? (
					<Alert variant="danger" className="m-3">
						{match.id} will be deleted!
						<Button
							onClick={() => deleteMatch()}
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

				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>Team_1 Name</th>
							<th>Team_2 Name</th>
							<th>Date of Match</th>
							<th>Vanue</th>
							<th>Edit</th>
							<th>Delete</th>
							<th>Add Match Details</th>
							<th>Show Match Details</th>
						</tr>
					</thead>
					<tbody>
						{matches.map((match) => (
							<tr key={match.id}>
								<td>
									<Link to={`/match/${match.id}`}>{match.id}</Link>
								</td>
								<td>
									<Link to={`/team/${match.team_1}`}>{match.team_1}</Link>
								</td>
								<td>
									<Link to={`/team/${match.team_2}`}>{match.team_2}</Link>
								</td>
								<td>{match.date}</td>
								<td>{match.vanue}</td>
								<td
									onClick={() => {
										setMatch(match);
										setShowAddOrEditButton(false);
										setStartDate(parseISO(match.date));
										setTeam_1(match.team_1);
										setTeam_2(match.team_2);
										setVanue(match.vanue);
										handleShow();
									}}
								>
									<FaRegEdit />
								</td>
								<td
									onClick={() => {
										setMatch(match);
										setShowAlert(true);
									}}
								>
									<MdDelete />
								</td>

								<td>
									<Button onClick={() => console.log("Adding....")}>
										Add Details
									</Button>
								</td>
								<td>
									<Button onClick={() => console.log("Showing....")}>
										Show Details
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							{showAddOrEditButton ? "Add Match" : "Edit Match"}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicTeam_1">
								<Form.Label>Team_1 Name</Form.Label>
								<Form.Control
									as="select"
									value={team_1}
									onChange={(event) => setTeam_1(event.target.value)}
								>
									<option value={0}>select team_1</option>
									{nameAllTeam.map((team) => (
										<option key={team.id} value={team.id}>
											{team.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicTeam_2">
								<Form.Label>Team_2 Name</Form.Label>
								<Form.Control
									as="select"
									value={team_2}
									onChange={(event) => setTeam_2(event.target.value)}
								>
									<option value={0}>select team_2</option>
									{nameAllTeam.map((team) => (
										<option key={team.id} value={team.id}>
											{team.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicMatchDate">
								<Form.Label>Match Date: </Form.Label>
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									className="form-control mr-3"
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicVanue">
								<Form.Label>Vanue</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter vanue"
									value={vanue}
									onChange={(event) => setVanue(event.target.value)}
								></Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						{showAddOrEditButton ? (
							<Button
								variant="primary"
								type="submit"
								onClick={() => {
									addMatch();
									handleClose();
									setLoading(true);
									setShowAddOrEditButton(false);
								}}
							>
								Add Match
							</Button>
						) : (
							<Button
								variant="primary"
								type="submit"
								onClick={() => {
									console.log("editing match....");
									editMatch();
									handleClose();
									setLoading(true);
									setShowAddOrEditButton(false);
								}}
							>
								Save Match
							</Button>
						)}

						<Button
							variant="secondary"
							onClick={() => {
								handleClose();
								setShowAddOrEditButton(false);
							}}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
}

export default MatchesRouter;
