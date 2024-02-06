const { DataTypes } = require("sequelize");
const cricketDB = require("../config/database");

const User = cricketDB.define(
	"User",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
	}
);

(async () => {
	await User.sync({ alter: true });
})();

module.exports = User;
