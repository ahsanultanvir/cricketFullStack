"use client";

import axios from "axios";
import { useEffect, useState } from "react";
const api_point = "http://localhost:5000";

function PlayerRouter({params}) {
	const [player, setPlayer] = useState({});
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

	return (
		<div>
			<p>Id: {player.id}</p>
			<p>
				Name : {player.name}{" "}
				<img
					src={api_point + `/uploaded-assets/${player.image}`}
					alt="logo"
					width={"40px"}
					height={"30px"}
				/>
			</p>
			<p>
				Team: {player.Team ? player.Team.name : null}{" "}
				{player.Team ? (
					<img
						src={api_point + `/uploaded-assets/${player.Team.logo_path}`}
						alt="logo"
						width={"40px"}
						height={"30px"}
					/>
				) : null}
			</p>
		</div>
	);
}

export default PlayerRouter;
