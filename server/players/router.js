const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const base64ToImage = require("base64-to-image");
const Player = require("./Player");
const Team = require("../teams/Team");

router.get("/", async (req, res) => {
	await Player.findAll({
		include: Team,
	})
		.then((players) => {
			res.status(200).send({ players: players, total_player: players.length });
		})
		.catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
	await Player.findOne({
		where: {
			id: req.params.id,
		},
		include: "Team",
	})
		.then((player) => {
			res.status(200).send(player);
		})
		.catch((err) => console.log(err));
});

router.post("/", async (req, res) => {
	const data = req.body;
	const { name, TeamId, isBatsman, isBowler, isWicketkeeper, picture } = data;
	const image = saveImageOnServer(picture);
	await Player.create({
		name,
		TeamId,
		isBatsman,
		isBowler,
		isWicketkeeper,
		image,
	})
		.then((player) => {
			res.status(200).send(player);
		})
		.catch((err) => console.log(err));
});

router.put("/:id", async (req, res) => {
	const player = await Player.findByPk(req.params.id);
	if (player) {
		const data = req.body;
		for (key in data) {
			if (data[key]) {
				if (key != "picture") player[key] = data[key];
				else {
					const image = saveImageOnServer(data[key]);
					player["image"] = image;
				}
			}
		}
		await player.save();
		res.status(200).send(player);
	} else {
		res.send("Not found the player");
	}
});

router.delete("/:id", async (req, res) => {
	const player = await Player.findByPk(req.params.id);
	if (player) {
		await player.destroy();
		res.status(200).send(player);
	} else {
		res.send("Not found the player");
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
