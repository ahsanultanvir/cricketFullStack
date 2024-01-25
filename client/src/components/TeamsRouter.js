import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

// const api_point = "http://localhost:5000";

function TeamsRouter() {
	const [name, setName] = useState("");
	const [nameAllTeam, setNameAllTeam] = useState([]);
	const [image, setImage] = useState(null);

	const getOneTeamName = async () => {
		await axios
			.get("http://localhost:5000/team/1")
			.then((res) => {
				const { data } = res;
				setName(data.name);
				console.log(data);
			})
			.catch((err) => console.log(err));
		// console.log(connect.response);
	};

	const getAllTeamName = async () => {
		await axios
			.get("http://localhost:5000/team")
			.then((res) => {
				const { data } = res;
				setNameAllTeam(data.teams);
				console.log(data);
			})
			.catch((err) => console.log(err));
		// console.log(connect.response);
	};

	const addTeam = async () => {
		await axios
			.post("http://localhost:5000/team", {
				name,
				logo: image,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		// console.log('add team button...');
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				// After reading the file, set it in the state
				setImage(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<h1>Team Page</h1>
			<hr />
			{/* <p>{name}</p> */}
			{/* <button
				onClick={() => {
					getOneTeamName();
				}}
			>
				Get team name of Id 1
			</button> */}
			<ul>
				{nameAllTeam.map((team) => (
					<li key={team.id}>
						<Link to={`/team/${team.id}`}>
							{team.id}: {team.name}
						</Link>
						{image && (
							<img
								src={team.logo}
								alt={team.name}
								style={{ maxWidth: "100px", maxHeight: "100px" }}
							/>
						)}
					</li>
				))}
			</ul>
			<Button variant="outline-success"
				onClick={() => {
					getAllTeamName();
				}}
			>
				Get name of All teams
			</Button>
			<br /> <br />
			<label>Team Name</label>
			<input
				type="text"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<br />
			<label>Add logo</label>
			<input type="file" accept="image/*" onChange={handleImageChange} />
			<br />
			<Button variant="outline-success"
				onClick={() => {
					addTeam();
				}}
			>
				Add Team
			</Button>
		</div>
	);
}

export default TeamsRouter;
