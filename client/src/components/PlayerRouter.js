import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PlayerRouter() {
	const [player, setPlayer] = useState({});
	const params = useParams();
	console.log(params);
	useEffect(() => {
		axios
			.get("http://localhost:5000/player/" + params.id)
			.then((res) => {
				const { data } = res;
				setPlayer(data);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}, []);

	const editPlayer = () => {
		console.log("editing....");
		// axios.put("http://localhost:5000/player/" + params.id).then((res)=>{

		// }).catch((err)=>console.log(err));
	};

	const deletePlayer = async() => {
		// console.log('deleting....');
		await axios
			.delete("http://localhost:5000/player/" + params.id)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	// console.log(id, name);
	return (
		<div>
			<p>Id: {player.id}</p>
			<p>Name : {player.name}</p>
			<p>Team: {player.Team ? player.Team.name : null}</p>
			{player.picture && (
				<img
					// src={`data:${player.picture.type};base64,${player.picture.data}`}
					// src={`data:image/jpeg;base64,${player.picture}`}
					src={player.picture}
					alt={player.name}
					style={{ maxWidth: "100px", maxHeight: "100px" }}
				/>
			)}
			<button type="button" onClick={editPlayer}>
				Edit Player
			</button>
			<button type="button" onClick={deletePlayer}>
				Delete Player
			</button>
		</div>
	);
}

export default PlayerRouter;
