const express = require("express");
const router = express.Router();
const Match = require("./Match");
const Team = require("../teams/Team");

router.get("/", async (req, res) => {
	await Match.findAll({
		// include: [
		// 	{ model: Team, as: "Team1" },
		// 	{ model: Team, as: "Team2" },
		// ],
	})
		.then((matches) => {
			res.status(200).send({ matches: matches, total_matches: matches.length });
		})
		.catch((err) => console.log(err));
});

router.post("/", async (req, res) => {
	const data = req.body;
	const { team_1, team_2, date, vanue } = data;
	await Match.create({
		team_1,
		team_2,
		date,
		vanue,
	})
		.then((match) => {
			res.status(200).send(match);
		})
		.catch((err) => console.log(err));
});

router.put("/:id", async (req, res) => {
	const match = await Match.findByPk(req.params.id);
	if (match) {
		const data = req.body;
		for (key in data) {
			if (data[key]) match[key] = data[key];
		}
		await match.save();
		res.status(200).send(match);
	} else {
		res.send("Not found the match");
	}
});

router.delete("/:id", async (req, res) => {
	const match = await Match.findByPk(req.params.id);
	if (match) {
		await match.destroy();
		res.status(200).send(match);
	} else {
		res.send("Not found the match");
	}
});

module.exports = router;
