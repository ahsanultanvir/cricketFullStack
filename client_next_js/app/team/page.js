"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"; //modal
import { InputText } from "primereact/inputtext"; //form
import { FileUpload } from "primereact/fileupload"; //file
import { DataTable } from "primereact/datatable"; //table
import { Column } from "primereact/column";
import { Message } from "primereact/message"; //alert
const Joi = require('joi');
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

const api_point = "http://localhost:5000";

const centerDivStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: "10px",
};

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
	image: Joi.string().dataUri().required()
})

function TeamsRouter() {
	const [name, setName] = useState("");
	const [team, setTeam] = useState({});
	const [nameAllTeam, setNameAllTeam] = useState([]);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [displayDialog, setDisplayDialog] = useState(false);
	const [showAddOrEditButton, setShowAddOrEditButton] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		axios
			.get(api_point+"/team")
			.then((res) => {
				const { data } = res;
				setNameAllTeam(data.teams);
				console.log(data);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	}, [loading]);

	const addTeam = async () => {
		try {
			await schema.validateAsync({ name, image });
			await axios
			.post(api_point+"/team", {
				name,
				logo_path: image,
			})
			.then(function (response) {
				console.log(response);
				setName("");
				setImage(null);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
		catch (err) { console.log(err) }
	};

	const handleImageChange = (event) => {
		const file = event.files[0];

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
				setName("");
				setImage(null);
			})
			.catch((err) => console.log(err));
	};

	const deleteTeam = async () => {
		await axios
			.delete(api_point + "/team/" + team.id)
			.then((res) => {
				console.log(res);
				setName("");
				setImage(null);
			})
			.catch((err) => console.log(err));
		setShowAlert(false);
	};

	const renderFooter = () => {
		return (
			<div>
				{showAddOrEditButton ? (
					<Button
						label="Add Team"
						onClick={() => {
							addTeam();
							setLoading(true);
							setShowAddOrEditButton(false);
							setDisplayDialog(false);
						}}
					/>
				) : (
					<Button
						label="Save Team"
						onClick={() => {
							editTeam();
							setLoading(true);
							setShowAddOrEditButton(false);
							setDisplayDialog(false);
						}}
					/>
				)}
				<Button
					label="Cancel"
					onClick={() => {
						setShowAddOrEditButton(false);
						setDisplayDialog(false);
					}}
				/>
			</div>
		);
	};

	if (loading) return <div>loading......</div>;
	else
		return (
			<div>
				<h1>Team Page</h1>
				<hr />

				<div style={centerDivStyle}>
					<Button
						label="Add new team"
						className="p-button-outlined mb-3"
						onClick={() => {
							setShowAddOrEditButton(true);
							setDisplayDialog(true);
						}}
					/>
				</div>

				{showAlert ? (
					<Message severity="error" className="p-m-3" text={`${team.name} will be deleted!`}>
						<Button
							label="Delete"
							className="p-button-danger mr-3"
							onClick={() => deleteTeam()}
						/>
						<Button
							label="Cancel"
							className="p-button-secondary ml-3"
							onClick={() => setShowAlert(false)}
						/>
					</Message>
				) : null}

				<DataTable
					value={nameAllTeam.sort((a, b) => a.id - b.id)}
					// selectionMode="single"
					// selection={team}
					// onSelectionChange={(e) => onRowSelect(e)}
				>
					<Column field="id" header="#" />
					<Column
						field="name"
						header="Team Name"
						body={(rowData) => (
							<Link href={`/team/${rowData.id}`}>{rowData.name}</Link>
						)}
					/>
					<Column
						field="logo_path"
						header="Team Logo"
						body={(rowData) => (
							<img
								src={api_point + `/uploaded-assets/${rowData.logo_path}`}
								alt="logo"
								width={"40px"}
								height={"30px"}
							/>
						)}
					/>
					<Column
						header="Update"
						body={(rowData) => (
							<Button
								icon="pi pi-pencil"
								className="p-button-rounded p-button-warning p-mr-2"
								onClick={() => {
									setTeam(rowData);
									setShowAddOrEditButton(false);
									setName(rowData.name);
									setDisplayDialog(true);
								}}
							/>
						)}
					/>
					<Column
						header="Delete"
						body={(rowData) => (
							<Button
								icon="pi pi-trash"
								className="p-button-rounded p-button-danger"
								onClick={() => {
									setTeam(rowData);
									setShowAlert(true);
								}}
							/>
						)}
					/>
				</DataTable>

				<Dialog
					visible={displayDialog}
					onHide={() => setDisplayDialog(false)}
					header={showAddOrEditButton ? "Add Team" : "Edit Team"}
					footer={renderFooter()}
				>
					<div className="p-fluid">
						<div className="p-field">
							<label htmlFor="name">Team Name</label>
							<InputText
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="p-field">
							<label htmlFor="logo">Add Logo</label>
							<FileUpload
								mode="basic"
								accept="image/*"
								onSelect={handleImageChange}
							/>
						</div>
					</div>
				</Dialog>
			</div>
		);
}

export default TeamsRouter;
