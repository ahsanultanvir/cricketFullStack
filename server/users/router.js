const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("./User");

router.get("/", (req, res) => {
    // res.send("User responsing");
	User.findAll()
		.then((users) => {
			res.status(200).send({ users: users, total_users: users.length });
		})
		.catch((err) => console.log(err));
});

router.post("/signup", async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const {userName} = req.body;
	await User.create({
		userName,
		password: hashedPassword
	})
		.then((user) => {
			res.status(200).send(user);
		})
		.catch((err) => console.log(err));
});

module.exports = router;
