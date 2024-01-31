import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const api_point = "http://localhost:5000";

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

	return (
		<div>
			<p className="text-center">TeamId: {team.id}</p>
			<p className="text-center">
				Name : {team.name}{" "}
				<img
					src={api_point + `/uploaded-assets/${team.logo_path}`}
					alt="logo"
					width={"40px"}
					height={"30px"}
				/>
			</p>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Player Name</th>
						<th>Player Image</th>
						<th>isBatsman</th>
						<th>isBowler</th>
						<th>isWicketkeeper</th>
					</tr>
				</thead>
				<tbody>
					{nameAllPlayer.map((player) => (
						<tr key={player.id}>
							<td>{player.id}</td>
							<td>
								<Link to={`/player/${player.id}`}>{player.name}</Link>
							</td>
							<td>
								<img
									src={api_point + `/uploaded-assets/${player.image}`}
									alt={`${player.name}`}
									width={"40px"}
									height={"30px"}
								/>
							</td>
							<td>{player.isBatsman ? <FaCheck /> : <RxCross2 />}</td>
							<td>{player.isBowler ? <FaCheck /> : <RxCross2 />}</td>
							<td>{player.isWicketkeeper ? <FaCheck /> : <RxCross2 />}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default TeamRouter;
