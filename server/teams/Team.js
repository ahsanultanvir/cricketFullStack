const { DataTypes } = require("sequelize");
const cricketDB = require("../config/database");

const Team = cricketDB.define(
	"Team",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		logo_path: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		// freezeTableName: true
	}
);

(async () => {
	await Team.sync({ alter: true });
})();

module.exports = Team;
