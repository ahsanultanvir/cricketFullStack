"use client";

import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const api_point = "http://localhost:5000";

function TeamsRouter() {
	const [name, setName] = useState("");
	const [team, setTeam] = useState({});
	const [nameAllTeam, setNameAllTeam] = useState([]);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [showAddOrEditButton, setShowAddOrEditButton] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/team")
			.then((res) => {
				const { data } = res;
				setNameAllTeam(data.teams);
				console.log(data);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	}, [loading]);

	const addTeam = async () => {
		await axios
			.post("http://localhost:5000/team", {
				name,
				logo_path: image,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				console.log(reader.result);
				setImage(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const editTeam = async () => {
		await axios
			.put(api_point + "/team/" + team.id, {
				name,
				logo_path: image,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	const deleteTeam = async () => {
		await axios
			.delete(api_point + "/team/" + team.id)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
		setShowAlert(false);
	};

	if (loading) return <div>loading......</div>;
	else
		return (
			<div>
				<h1>Team Page</h1>
				<hr />

				<Button
					onClick={() => {
						setShowAddOrEditButton(true);
						handleShow();
					}}
					className="mb-3"
				>
					Add new team
				</Button>

				{showAlert ? (
					<Alert variant="danger" className="m-3">
						{team.name} will be deleted!
						<Button
							onClick={() => deleteTeam()}
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
							<th>Team Name</th>
							<th>Team Logo</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{nameAllTeam.map((team) => (
							<tr key={team.id}>
								<td>{team.id}</td>
								<td>
									<Link href={`/team/${team.id}`}>{team.name}</Link>
								</td>
								<td>
									<img
										src={api_point + `/uploaded-assets/${team.logo_path}`}
										alt="logo"
										width={"40px"}
										height={"30px"}
									/>
								</td>
								<td
									onClick={() => {
										setTeam(team);
										setShowAddOrEditButton(false);
										setName(team.name);
										handleShow();
									}}
								>
									<FaRegEdit />
								</td>
								<td
									onClick={() => {
										setTeam(team);
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
						<Modal.Title>
							{showAddOrEditButton ? "Add Team" : "Edit Team"}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicTeamName">
								<Form.Label>Team Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter team name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicAddLogo">
								<Form.Label>Add logo</Form.Label>
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
									addTeam();
									handleClose();
									setLoading(true);
									setShowAddOrEditButton(false);
								}}
							>
								Add Team
							</Button>
						) : (
							<Button
								variant="primary"
								type="submit"
								onClick={() => {
									console.log(team);
									editTeam();
									handleClose();
									setLoading(true);
									setShowAddOrEditButton(false);
								}}
							>
								Save Team
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

export default TeamsRouter;
