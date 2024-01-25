const express = require("express");
const router = express.Router();
const Player = require("./Player");
const Team = require("../teams/Team");

router.get("/", async (req, res) => {
	// res.send('Responsing player');
	await Player.findAll({
		include: 'Team'
	})
		.then((players) => {
			res.status(200).send({players: players, total_player: players.length});
		})
		.catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
	// res.send('Responsing player');
	await Player.findOne({
		where:{
			id: req.params.id
		},
		include: 'Team'
	})
		.then((player) => {
			res.status(200).send(player);
		})
		.catch((err) => console.log(err));
});

router.post("/", async (req, res) => {
	const data = req.body;
	const {name, TeamId, isBatsman, isBowler, isWicketkeeper, picture} = data;
	await Player.create({
		name,
		TeamId,
		isBatsman,
		isBowler,
		isWicketkeeper,
		picture
	})
		.then((player) => {
			res.status(200).send(player);
		})
		.catch((err) => console.log(err));
    // res.send(req.body);
});

// router.put("/update/:id", async (req, res) => {
// 	const player = await Player.findByPk(req.params.id);
// 	if(player){
// 		const data = req.body;
// 		for(key in data){
// 			// console.log(`${key}: ${data[key]}`);
// 			player[key] = data[key];
// 		}
// 		await player.save();
// 		res.status(200).send(player);
// 	}else{
// 		res.send('Not found the player');
// 	}
//     // res.send(req.body);
// });


router.delete("/:id", async (req, res) => {
	// res.send("Responsing player");
	const player = await Player.findByPk(req.params.id);
	if(player){
		await player.destroy();
		res.status(200).send(player);
	}else{
		res.send('Not found the player');
	}
    // res.send(player);
});


module.exports = router;
