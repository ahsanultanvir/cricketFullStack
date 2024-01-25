const express = require("express");
const router = express.Router();
// const Team = require("./Team");
// const Player = require("../players/Player");

router.get("/", (req, res) => {
	res.send('Responsing welcome');
	//  Team.findAll()
	// 	.then((teams) => {
	// 		res.status(200).send({ teams: teams, total_teams: teams.length });
	// 	})
	// 	.catch((err) => console.log(err));
});

module.exports = router;
