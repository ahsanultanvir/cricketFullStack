const { DataTypes } = require("sequelize");
const cricketDB = require("../config/database");
const Team = require("../teams/Team");
const MatchTeam = require("../matchTeam/MatchTeam");

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
	// Match.belongsToMany(Team, { as: 'Team1', through: MatchTeam, foreignKey: 'team_1' });
	// Match.belongsToMany(Team, { as: 'Team2', through: MatchTeam, foreignKey: 'team_2' });
	await Match.sync({ alter: true });
})();

module.exports = Match;
