import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function TeamRouter() {
	const [team, setTeam] = useState({});
	const [nameAllPlayer, setNameAllPlayer] = useState([]);
	const params = useParams();
	console.log(params);
	useEffect(() => {
		axios
			.get("http://localhost:5000/team/" + params.id)
			.then((res) => {
				const { data } = res;
				setTeam(data);
				setNameAllPlayer(data.Players);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}, []);

	// console.log(id, name);
	return (
		<div>
			<p>Id: {team.id}</p>
			<p>Name : {team.name}</p>
			<img
				src={team.logo}
				alt={team.name}
				// style={{ maxWidth: "100px", maxHeight: "100px" }}
			/>
			<ul>
				{nameAllPlayer.map((player) => (
					<li key={player.id}>
						<Link to={`/player/${player.id}`}>
							{player.id}: {player.name}
						</Link>
						{/* {image && (
							<img
								src={player.picture}
								alt={player.name}
								style={{ maxWidth: "100px", maxHeight: "100px" }}
							/>
						)} */}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TeamRouter;
