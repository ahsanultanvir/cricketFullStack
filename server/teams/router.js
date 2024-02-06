const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const base64ToImage = require("base64-to-image");
const Team = require("./Team");
const Player = require("../players/Player");

router.get("/", (req, res) => {
	Team.findAll()
		.then((teams) => {
			res.status(200).send({ teams: teams, total_teams: teams.length });
		})
		.catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
	const team = await Team.findOne({
		where: {
			id: req.params.id,
		},
		include: Player,
	})
		.then((team) => {
			res.status(200).send(team);
		})
		.catch((err) => console.log(err));
});

router.post("/", async (req, res) => {
	const data = req.body;
	const { name, logo_path } = data;
	// console.log(logo_path);
	const logo_path_string = saveImageOnServer(logo_path);
	await Team.create({
		name,
		logo_path: logo_path_string,
	})
		.then((team) => {
			res.status(200).send(team);
		})
		.catch((err) => console.log(err));
});

router.put("/:id", async (req, res) => {
	const team = await Team.findByPk(req.params.id);
	if (team) {
		const data = req.body;
		if (data.name) team.name = data.name;
		if (data.logo_path) {
			const logo_path_string = saveImageOnServer(data.logo_path);
			team.logo_path = logo_path_string;
		}
		// for(key in data){
		// 	 console.log(`${key}: ${data[key]}`);
		//   if(key!="logo_path") team[key] = data[key];
		// 		else{
		// 			const logo_path_string = saveImageOnServer(data[key]);
		// 			player["logo_path"] = logo_path_string;
		// 		}
		// }
		await team.save();
		res.status(200).send(team);
	} else {
		res.send("Team not found");
	}
});

router.delete("/:id", async (req, res) => {
	const team = await Team.findByPk(req.params.id);
	if (team) {
		await Player.destroy({
			where: {
				TeamId: team.id,
			},
		});
		await team.destroy();
		res
			.status(200)
			.send({ team: team, message: "Deleted the team and its players!" });
	} else {
		res.status(200).send("Didn't find any team with the given ID!");
	}
});

module.exports = router;

const saveImageOnServer = (base64String) => {
	const imageFileName = uuidv4();
	const imageType = base64String.match(/[^:/]\w+(?=;|,)/)[0];
	const optionalObject = { fileName: imageFileName, type: imageType };
	base64ToImage(base64String, "./uploaded_assets/", optionalObject);
	const savedImage = imageFileName + "." + imageType;
	console.log(savedImage);
	return savedImage;
};
