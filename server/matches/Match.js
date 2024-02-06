const { DataTypes } = require("sequelize");
const cricketDB = require("../config/database");
const Team = require("../teams/Team");

const Match = cricketDB.define(
	"Match",
	{
		team_1: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		team_2: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		vanue: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		// freezeTableName: true,
	}
);

(async () => {
	Match.belongsTo(Team, { as: "Team1", foreignKey: "team_1" });
	Match.belongsTo(Team, { as: "Team2", foreignKey: "team_2" });
	Team.hasMany(Match, { as: "Matches1", foreignKey: "team_1" });
	Team.hasMany(Match, { as: "Matches2", foreignKey: "team_2" });
	await Match.sync({ alter: true });
})();

module.exports = Match;
