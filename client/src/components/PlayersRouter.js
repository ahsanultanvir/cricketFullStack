import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const api_point = "http://localhost:5000";

function PlayersRouter() {
	const [name, setName] = useState("");
	const [teamId, setTeamId] = useState(1);
	const [nameAllPlayer, setNameAllPlayer] = useState([]);
	const [teamNames, setTeamNames] = useState([]);
	const [loading, setLoading] = useState(true);
	const [batsman, setBatsman] = useState(false);
	const [bowler, setBowler] = useState(false);
	const [wicketkeeper, setWicketkeeper] = useState(false);
	const [image, setImage] = useState(null);

	useEffect(() => {
		console.log(teamId);
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

	const getPlayerName = async () => {
		await axios
			.get("http://localhost:5000/player/1")
			.then((res) => {
				const { data } = res;
				setName(data.name);
				console.log(data);
			})
			.catch((err) => console.log(err));
		// console.log(connect.response);
	};

	const getAllPlayerName = async () => {
		await axios
			.get("http://localhost:5000/player")
			.then((res) => {
				const { data } = res;
				setNameAllPlayer(data.players);
				console.log(data);
			})
			.catch((err) => console.log(err));
		// console.log(connect.response);
	};

	const addPlayer = async () => {
		await axios
			.post("http://localhost:5000/Player", {
				name,
				TeamId: teamId,
				isBatsman: batsman,
				isBowler: bowler,
				isWicketkeeper: wicketkeeper,
				picture: image,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		// console.log('add Player button...');
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

	if (loading) return <p>Page is loading. Please Wait.....</p>;
	else
		return (
			<div>
				<h1>Player Page</h1>
				<hr />
				<p>{name}</p>
				{/* <p>{teamId}</p> */}
				{/* <button
					onClick={() => {
						getPlayerName();
					}}
				>
					Get player name of Id 1
				</button>
				<br /> <br /> */}
				<ul>
					{nameAllPlayer.map((player) => (
						<li key={player.id}>
							<Link to={`/player/${player.id}`}>
								{player.id}: {player.name} (
								{player.Team ? player.Team.name : null})
							</Link>
							{image && <img
								src={player.picture}
								alt={player.name}
								style={{ maxWidth: "100px", maxHeight: "100px" }}
							/>}
						</li>
					))}
				</ul>
				<button
					onClick={() => {
						getAllPlayerName();
					}}
				>
					Get name of All Players
				</button>
				<br /> <br />
				<label>Enter Player Name: </label>
				<input
					type="text"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<br /> <br />
				<label>Enter Player TeamID: </label>
				<select
					value={teamId}
					onChange={(event) => setTeamId(event.target.value)}
				>
					{/* <option value="" disabled>
					Select an option
				</option> */}
					{teamNames.map((team) => (
						<option key={team.id} value={team.id}>
							{team.name}
						</option>
					))}
				</select>
				<br />
				<br />
				<input
					type="checkbox"
					checked={batsman}
					onChange={() => {
						setBatsman(!batsman);
						console.log(batsman);
					}}
				/>
				<label> Batsman</label>
				<br />
				<input
					type="checkbox"
					checked={bowler}
					onChange={() => setBowler(!bowler)}
				/>
				<label> Bowler</label>
				<br />
				<input
					type="checkbox"
					checked={wicketkeeper}
					onChange={() => setWicketkeeper(!wicketkeeper)}
				/>
				<label> Wicketkeeper</label>
				<br />
				<br />
				{/* {image && (
					<div>
						<h2>Preview:</h2>
						<img src={image} alt="Preview" style={{ maxWidth: "100%" }} />
					</div>
				)} */}
				<label>Add image</label>
				<input type="file" accept="image/*" onChange={handleImageChange} />
				<br/>
				<Button variant="outline-success"
					onClick={() => {
						addPlayer();
					}}
				>
					Add Player
				</Button>
			</div>
		);
}

export default PlayersRouter;
