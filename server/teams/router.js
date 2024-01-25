const express = require("express");
const router = express.Router();
const Team = require("./Team");
const Player = require("../players/Player");
// const Player = require("../players/Player");

router.get("/", (req, res) => {
	// res.send('Responsing team');
	 Team.findAll()
		.then((teams) => {
			res.status(200).send({ teams: teams, total_teams: teams.length });
		})
		.catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
	// res.send('Responsing team');
	const team = await Team.findOne({
		where: {
			id: req.params.id,
		},
		include: Player
	})
		.then((team) => {
			res.status(200).send(team);
		})
		.catch((err) => console.log(err));
	// if(team){
	// 	const players = await Player.findAll({
	// 		where:{
	// 			TeamId: req.params.id,
	// 		}
	// 	}).then().catch((err)=>console.log(err));
	// 	if(players){
	// 		const newTeam = {...team, ...players};
	// 		res.status(200).send(newTeam);
	// 	}
	// 	else{
	// 		res.status(400).send("")
	// 	}
	// }
	// res.status(200).send(team);
});

router.post("/", async (req, res) => {
	const data = req.body;
	const { name, logo } = data;
	await Team.create({
		name,
		logo,
	})
		.then((team) => {
			res.status(200).send(team);
		})
		.catch((err) => console.log(err));
	// res.send(req.body);
});

module.exports = router;
