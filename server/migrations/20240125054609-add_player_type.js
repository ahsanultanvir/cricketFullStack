"use strict";

const { DataTypes } = require("sequelize");
const Player = require("../players/Player");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn(Player.tableName, "isBatsman", {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		});

		await queryInterface.addColumn(Player.tableName, "isBowler", {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		});

		await queryInterface.addColumn(Player.tableName, "isWicketkeeper", {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn(Player.tableName, "isBatsman");
		await queryInterface.removeColumn(Player.tableName, "isBowler");
		await queryInterface.removeColumn(Player.tableName, "isWicketkeeper");
	},
};
