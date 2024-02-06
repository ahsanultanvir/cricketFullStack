"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Image } from "primereact/image";
import { FaCheck, FaTimes } from "react-icons/fa";

const api_point = "http://localhost:5000";

function TeamRouter({ params }) {
	const [team, setTeam] = useState({});
	const [nameAllPlayer, setNameAllPlayer] = useState([]);
	console.log(params);

	useEffect(() => {
		axios
			.get(`${api_point}/team/${params.id}`)
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
				<Image
					src={`${api_point}/uploaded-assets/${team.logo_path}`}
					alt="logo"
					width={"40px"}
					height={"30px"}
				/>
			</p>

			<DataTable value={nameAllPlayer.sort((a,b)=>a.id-b.id)}>
				<Column field="id" header="#" />
				<Column
					field="name"
					header="Player Name"
					body={(player) => (
						<Link href={`/player/${player.id}`}>{player.name}</Link>
					)}
				/>
				<Column
					field="image"
					header="Player Image"
					body={(player) => (
						<Image
							src={`${api_point}/uploaded-assets/${player.image}`}
							alt={player.name}
							width={"40px"}
							height={"30px"}
						/>
					)}
				/>
				<Column
					field="isBatsman"
					header="isBatsman"
					body={(player) => (
						<Checkbox
							checked={player.isBatsman}
							icon={player.isBatsman ? <FaCheck /> : <FaTimes />}
						/>
					)}
				/>
				<Column
					field="isBowler"
					header="isBowler"
					body={(player) => (
						<Checkbox
							checked={player.isBowler}
							icon={player.isBowler ? <FaCheck /> : <FaTimes />}
						/>
					)}
				/>
				<Column
					field="isWicketkeeper"
					header="isWicketkeeper"
					body={(player) => (
						<Checkbox
							checked={player.isWicketkeeper}
							icon={player.isWicketkeeper ? <FaCheck /> : <FaTimes />}
						/>
					)}
				/>
			</DataTable>
		</div>
	);
}

export default TeamRouter;
