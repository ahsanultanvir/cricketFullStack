const express = require("express");
const cricketDB = require("./config/database");
const team = require("./teams/router");
const player = require("./players/router");
const match = require("./matches/router");
const welcome = require("./welcome/welcome");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/uploaded-assets", express.static("uploaded_assets"));
app.use("/team", team);
app.use("/player", player);
app.use("/welcome", welcome);
app.use("/match", match);

app.get("/", (req, res) => {
	res.send({ success: true, message: "Get Api is called" });
});

app.post("/", (req, res) => {
	res.send({ success: true, message: "Post Api is called" });
});

app.listen(port, async () => {
	console.log(`Server is running on port number ${port}`);
	try {
		await cricketDB.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
});
